import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOOGLE_CSE_API_KEY = Deno.env.get('GOOGLE_CSE_API_KEY');
const GOOGLE_CSE_CX = Deno.env.get('GOOGLE_CSE_CX');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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

interface PlatformConfig {
  name: AlumniProfile['platform'];
  siteSearch?: string;
  queryTemplate: string;
}

// Platform-specific search configurations
const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  linkedin: {
    name: 'LinkedIn',
    siteSearch: 'linkedin.com/in',
    queryTemplate: '("Edo College" OR "ECOBA") {query}',
  },
  facebook: {
    name: 'Facebook',
    siteSearch: 'facebook.com',
    queryTemplate: '("Edo College" OR "ECOBA" OR "Edo College Old Boys") {query}',
  },
  twitter: {
    name: 'Twitter',
    siteSearch: 'twitter.com',
    queryTemplate: '("Edo College" OR "ECOBA") {query} alumni',
  },
  instagram: {
    name: 'Instagram',
    siteSearch: 'instagram.com',
    queryTemplate: '("Edo College" OR "ECOBA") {query}',
  },
  news: {
    name: 'News',
    siteSearch: 'guardian.ng',
    queryTemplate: '("Edo College" OR "ECOBA" OR "Edo College Old Boys") {query} alumni',
  },
  web: {
    name: 'Web',
    // No site restriction - general web search
    queryTemplate: '("Edo College" OR "ECOBA" OR "Edo College Old Boys" OR "attended Edo College") {query} alumni Benin Nigeria',
  },
};

// Additional news sites to search
const NEWS_SITES = ['guardian.ng', 'punchng.com', 'vanguardngr.com', 'thisdaylive.com', 'businessday.ng'];
const BLOG_SITES = ['medium.com', 'blogspot.com', 'wordpress.com'];

async function searchPlatform(
  platform: string, 
  userQuery: string, 
  apiKey: string, 
  cx: string
): Promise<any[]> {
  const config = PLATFORM_CONFIGS[platform];
  if (!config) {
    console.error(`Unknown platform: ${platform}`);
    return [];
  }

  const query = config.queryTemplate.replace('{query}', userQuery);
  
  const params = new URLSearchParams({
    key: apiKey,
    cx: cx,
    q: query,
    num: '10',
  });

  // Add site restriction if specified
  if (config.siteSearch) {
    params.append('siteSearch', config.siteSearch);
    params.append('siteSearchFilter', 'i'); // 'i' = include only results from this site
  }

  const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;
  
  console.log(`Searching ${platform} with query:`, query);
  console.log(`Site restriction:`, config.siteSearch || 'none');

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`Google CSE error for ${platform}:`, data.error?.message || data);
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error(`Error searching ${platform}:`, error);
    return [];
  }
}

async function searchMultipleSites(
  sites: string[],
  platformName: AlumniProfile['platform'],
  userQuery: string,
  queryTemplate: string,
  apiKey: string,
  cx: string
): Promise<{ results: any[], platform: AlumniProfile['platform'] }[]> {
  const allResults: { results: any[], platform: AlumniProfile['platform'] }[] = [];
  
  for (const site of sites) {
    const query = queryTemplate.replace('{query}', userQuery);
    
    const params = new URLSearchParams({
      key: apiKey,
      cx: cx,
      q: query,
      num: '5', // Fewer results per site for multi-site searches
      siteSearch: site,
      siteSearchFilter: 'i',
    });

    const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;
    
    console.log(`Searching ${site} for ${platformName}`);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.items) {
        allResults.push({ results: data.items, platform: platformName });
      }
    } catch (error) {
      console.error(`Error searching ${site}:`, error);
    }
  }

  return allResults;
}

function determinePlatformFromUrl(url: string): AlumniProfile['platform'] {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('linkedin')) return 'LinkedIn';
  if (lowerUrl.includes('facebook')) return 'Facebook';
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return 'Twitter';
  if (lowerUrl.includes('instagram')) return 'Instagram';
  if (NEWS_SITES.some(site => lowerUrl.includes(site)) || lowerUrl.includes('news')) return 'News';
  return 'Web';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, platforms } = await req.json();
    const normalizedQuery = typeof query === 'string' ? query.trim() : '';

    // Validate API keys
    if (!GOOGLE_CSE_API_KEY || !GOOGLE_CSE_CX) {
      console.error('Google CSE credentials not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Google Custom Search not configured' }),
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

    console.log('Starting alumni scan with Google CSE');
    console.log('Query:', normalizedQuery);
    console.log('Platforms:', platforms);

    // Determine which platforms to search
    const platformsToSearch = platforms && platforms.length > 0 
      ? platforms.map((p: string) => p.toLowerCase())
      : Object.keys(PLATFORM_CONFIGS);

    // Collect all search results
    const allResults: { result: any, platform: AlumniProfile['platform'] }[] = [];

    for (const platform of platformsToSearch) {
      if (platform === 'news') {
        // Search multiple news sites
        const newsResults = await searchMultipleSites(
          NEWS_SITES,
          'News',
          normalizedQuery,
          PLATFORM_CONFIGS.news.queryTemplate,
          GOOGLE_CSE_API_KEY,
          GOOGLE_CSE_CX
        );
        for (const { results, platform: p } of newsResults) {
          for (const result of results) {
            allResults.push({ result, platform: p });
          }
        }
      } else if (platform === 'blogs') {
        // Search multiple blog sites
        const blogResults = await searchMultipleSites(
          BLOG_SITES,
          'Web',
          normalizedQuery,
          '("Edo College" OR "ECOBA") {query} alumni',
          GOOGLE_CSE_API_KEY,
          GOOGLE_CSE_CX
        );
        for (const { results, platform: p } of blogResults) {
          for (const result of results) {
            allResults.push({ result, platform: p });
          }
        }
      } else if (PLATFORM_CONFIGS[platform]) {
        const results = await searchPlatform(platform, normalizedQuery, GOOGLE_CSE_API_KEY, GOOGLE_CSE_CX);
        const platformName = PLATFORM_CONFIGS[platform].name;
        for (const result of results) {
          allResults.push({ result, platform: platformName });
        }
      }
    }

    console.log('Total search results:', allResults.length);

    if (allResults.length === 0) {
      return new Response(
        JSON.stringify({ success: true, profiles: [], message: 'No results found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Deduplicate by URL
    const seenUrls = new Set<string>();
    const uniqueResults = allResults.filter(({ result }) => {
      const url = result.link;
      if (seenUrls.has(url)) return false;
      seenUrls.add(url);
      return true;
    });

    console.log('Unique results after deduplication:', uniqueResults.length);

    // Analyze each result with AI
    const profiles: AlumniProfile[] = [];

    for (const { result, platform } of uniqueResults) {
      try {
        console.log('Analyzing result:', result.link);
        
        const content = `Title: ${result.title || ''}\nSnippet: ${result.snippet || ''}\nURL: ${result.link || ''}`;
        
        if (!content || content.length < 30) {
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
                content: `Analyze this content from ${result.link}:\n\n${content}`
              }
            ],
          }),
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error('AI analysis error:', aiResponse.status, errorText);
          
          if (aiResponse.status === 429) {
            console.log('Rate limited, waiting before continuing...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          if (aiResponse.status === 402) {
            console.log('Payment required - stopping analysis');
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
            // Use platform from search or determine from URL
            const detectedPlatform = platform || determinePlatformFromUrl(result.link);

            profiles.push({
              full_name: analysis.full_name || 'Unknown',
              status: analysis.status || 'Uncertain',
              graduation_year: analysis.graduation_year,
              occupation: analysis.occupation,
              company: analysis.company,
              public_email: null,
              public_phone: null,
              platform: detectedPlatform,
              profile_url: result.link,
              location: analysis.location,
              confidence_score: Math.min(100, Math.max(0, analysis.confidence_score)),
              source_attribution: `Found via Google Custom Search on ${new Date().toLocaleDateString()}`,
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
