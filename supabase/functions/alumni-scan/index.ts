import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

interface SearchResult {
  url: string;
  title?: string;
  description?: string;
  markdown?: string;
}

interface AlumniProfile {
  full_name: string;
  status: 'Confirmed' | 'Probable' | 'Uncertain';
  graduation_year: string | null;
  occupation: string | null;
  company: string | null;
  public_email: string | null;
  public_phone: string | null;
  platform: 'LinkedIn' | 'Facebook' | 'Twitter' | 'Instagram' | 'Web' | 'News';
  profile_url: string;
  location: string | null;
  confidence_score: number;
  source_attribution: string;
  matched_keywords: string[];
  bio: string | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, platforms } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!FIRECRAWL_API_KEY) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting alumni scan for:', query);
    console.log('Platforms:', platforms);

    // Build search query for Edo College alumni
    const searchQuery = `"Edo College" OR "ECOBA" OR "Edo College Old Boys" ${query} alumni`;

    // Use Firecrawl to search the web
    console.log('Searching with Firecrawl:', searchQuery);
    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 10,
        scrapeOptions: {
          formats: ['markdown'],
        },
      }),
    });

    const searchData = await searchResponse.json();
    console.log('Firecrawl response status:', searchResponse.status);

    if (!searchResponse.ok) {
      console.error('Firecrawl API error:', searchData);
      return new Response(
        JSON.stringify({ success: false, error: searchData.error || 'Search failed' }),
        { status: searchResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: SearchResult[] = searchData.data || [];
    console.log('Found results:', results.length);

    if (results.length === 0) {
      return new Response(
        JSON.stringify({ success: true, profiles: [], message: 'No results found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use AI to analyze each result and extract alumni profiles
    const profiles: AlumniProfile[] = [];

    for (const result of results) {
      try {
        console.log('Analyzing result:', result.url);
        
        const content = result.markdown || result.description || '';
        if (!content || content.length < 50) {
          console.log('Skipping - insufficient content');
          continue;
        }

        // Use Lovable AI to analyze the profile
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'system',
                content: `You are an AI that extracts alumni information from web content. 
                You are looking for alumni of Edo College (also known as ECOBA - Edo College Old Boys Association).
                
                Analyze the content and determine if this person attended Edo College, Benin City, Nigeria.
                
                Keywords to match: Edo College, ECOBA, Edo College Old Boys, Benin City, Class of [year], Set [year], alumni.
                
                Return a JSON object with these fields:
                - is_alumni: boolean (true if likely an Edo College alumni)
                - full_name: string
                - graduation_year: string or null (e.g., "1995")
                - occupation: string or null
                - company: string or null
                - location: string or null
                - bio: string or null (brief description)
                - confidence_score: number (0-100, how confident the match is)
                - matched_keywords: array of strings (which keywords matched)
                - status: "Confirmed" | "Probable" | "Uncertain"
                
                Only return the JSON object, no other text.`
              },
              {
                role: 'user',
                content: `Analyze this content from ${result.url}:\n\n${content.substring(0, 4000)}`
              }
            ],
          }),
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error('AI analysis error:', aiResponse.status, errorText);
          
          if (aiResponse.status === 429) {
            console.log('Rate limited, stopping analysis');
            break;
          }
          continue;
        }

        const aiData = await aiResponse.json();
        const aiContent = aiData.choices?.[0]?.message?.content;
        
        if (!aiContent) {
          console.log('No AI response content');
          continue;
        }

        // Parse the AI response
        try {
          // Extract JSON from the response (handle markdown code blocks)
          let jsonStr = aiContent;
          const jsonMatch = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
          }
          
          const analysis = JSON.parse(jsonStr);
          
          if (analysis.is_alumni && analysis.confidence_score >= 30) {
            // Determine platform from URL
            let platform: AlumniProfile['platform'] = 'Web';
            const url = result.url.toLowerCase();
            if (url.includes('linkedin')) platform = 'LinkedIn';
            else if (url.includes('facebook')) platform = 'Facebook';
            else if (url.includes('twitter') || url.includes('x.com')) platform = 'Twitter';
            else if (url.includes('instagram')) platform = 'Instagram';
            else if (url.includes('news') || url.includes('guardian') || url.includes('punch')) platform = 'News';

            profiles.push({
              full_name: analysis.full_name || 'Unknown',
              status: analysis.status || 'Uncertain',
              graduation_year: analysis.graduation_year,
              occupation: analysis.occupation,
              company: analysis.company,
              public_email: null,
              public_phone: null,
              platform,
              profile_url: result.url,
              location: analysis.location,
              confidence_score: Math.min(100, Math.max(0, analysis.confidence_score)),
              source_attribution: `Found via web search on ${new Date().toLocaleDateString()}`,
              matched_keywords: analysis.matched_keywords || [],
              bio: analysis.bio,
            });
            
            console.log('Added profile:', analysis.full_name, 'with confidence:', analysis.confidence_score);
          }
        } catch (parseErr) {
          console.error('Failed to parse AI response:', parseErr);
        }
      } catch (resultErr) {
        console.error('Error processing result:', resultErr);
      }
    }

    // Save profiles to database
    if (profiles.length > 0 && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      for (const profile of profiles) {
        // Check if profile already exists (by URL)
        const { data: existing } = await supabase
          .from('alumni_records')
          .select('id')
          .eq('profile_url', profile.profile_url)
          .maybeSingle();
        
        if (!existing) {
          const { error: insertError } = await supabase
            .from('alumni_records')
            .insert(profile);
          
          if (insertError) {
            console.error('Failed to insert profile:', insertError);
          } else {
            console.log('Inserted new profile:', profile.full_name);
          }
        } else {
          console.log('Profile already exists:', profile.profile_url);
        }
      }
    }

    console.log('Scan complete. Found profiles:', profiles.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        profiles,
        message: `Found ${profiles.length} potential alumni` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in alumni-scan function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
