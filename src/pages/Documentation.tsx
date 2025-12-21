import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  BarChart3,
  MapPin,
  Filter,
  RefreshCw,
  Download,
  Eye,
  ExternalLink,
  ToggleLeft,
  Shield,
  BookOpen,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import ecobaLogo from '@/assets/ecoba-logo.png';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors rounded-t-xl">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-3">
                <span className="text-ecoba-gold">{icon}</span>
                <span>{title}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src={ecobaLogo} alt="ECOBA Logo" className="h-10 w-auto" />
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">
                ECOBA <span className="text-ecoba-gold">Intelligence</span>
              </h1>
              <p className="text-xs text-muted-foreground">User Manual</p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ecoba-gold/10 px-4 py-2 mb-4">
            <BookOpen className="h-5 w-5 text-ecoba-gold" />
            <span className="text-ecoba-gold font-medium">Documentation</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            User Manual
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete guide to using the ECOBA Intelligence Alumni Discovery System. 
            Learn how to navigate the dashboard, understand data, and manage alumni records.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#introduction" className="text-muted-foreground hover:text-ecoba-gold transition-colors">1. Introduction & Overview</a>
              <a href="#statistics" className="text-muted-foreground hover:text-ecoba-gold transition-colors">2. Dashboard Statistics Cards</a>
              <a href="#analytics" className="text-muted-foreground hover:text-ecoba-gold transition-colors">3. Analytics Panels</a>
              <a href="#table" className="text-muted-foreground hover:text-ecoba-gold transition-colors">4. Alumni Records Table</a>
              <a href="#confidence" className="text-muted-foreground hover:text-ecoba-gold transition-colors">5. Confidence Score Guide</a>
              <a href="#status" className="text-muted-foreground hover:text-ecoba-gold transition-colors">6. Status Classifications</a>
              <a href="#filters" className="text-muted-foreground hover:text-ecoba-gold transition-colors">7. Filter Panel Guide</a>
              <a href="#actions" className="text-muted-foreground hover:text-ecoba-gold transition-colors">8. Action Buttons</a>
              <a href="#privacy" className="text-muted-foreground hover:text-ecoba-gold transition-colors">9. Data Privacy & Compliance</a>
            </nav>
          </CardContent>
        </Card>

        {/* Sections */}
        <div id="introduction">
          <Section title="1. Introduction & Overview" icon={<BookOpen className="h-5 w-5" />} defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">What is ECOBA Intelligence?</h4>
                <p className="text-muted-foreground">
                  ECOBA Intelligence is an AI-powered alumni discovery system designed to help Edo College Old Boys Association (ECOBA) 
                  identify and connect with alumni across various social media platforms and web sources. The system automatically 
                  scans public profiles to find potential alumni members.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Target Users</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>ECOBA Administrators</li>
                  <li>Alumni Coordinators</li>
                  <li>Membership Committee Members</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Benefits</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Automated Discovery:</strong> AI-powered scanning of multiple platforms</li>
                  <li><strong>Verification System:</strong> Confidence scoring to prioritize review</li>
                  <li><strong>Compliance:</strong> Only collects publicly available information</li>
                  <li><strong>Efficient Review:</strong> Streamlined approval workflow</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        <div id="statistics">
          <Section title="2. Dashboard Statistics Cards" icon={<BarChart3 className="h-5 w-5" />}>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                The dashboard displays four key statistics at the top of the screen:
              </p>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-ecoba-gold/20">
                    <Users className="h-5 w-5 text-ecoba-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Total Records</h4>
                    <p className="text-sm text-muted-foreground">
                      The total number of alumni profiles discovered across all platforms. This includes confirmed, 
                      probable, and uncertain matches regardless of approval status.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Confirmed</h4>
                    <p className="text-sm text-muted-foreground">
                      Records that have been verified as genuine alumni with 85% or higher confidence scores. 
                      These profiles have strong indicators such as explicit mentions of Edo College.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Pending Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Records that have not yet been approved by an administrator. These require manual review 
                      to determine if they should be added to the official alumni database.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">This Week</h4>
                    <p className="text-sm text-muted-foreground">
                      New discoveries made in the last 7 days. This helps track the system's ongoing 
                      discovery activity and identify trending sources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div id="analytics">
          <Section title="3. Analytics Panels" icon={<BarChart3 className="h-5 w-5" />}>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-ecoba-gold" />
                  Platform Distribution Chart
                </h4>
                <p className="text-muted-foreground mb-3">
                  A horizontal bar chart showing where alumni profiles were discovered. Each bar represents 
                  a different platform with its percentage of total records.
                </p>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Platforms tracked:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="platform-linkedin">LinkedIn</Badge>
                    <Badge className="platform-facebook">Facebook</Badge>
                    <Badge className="platform-twitter">Twitter</Badge>
                    <Badge className="platform-instagram">Instagram</Badge>
                    <Badge className="platform-web">Web</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400">News</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-ecoba-gold" />
                  Top Locations Panel
                </h4>
                <p className="text-muted-foreground">
                  Shows the geographic distribution of discovered alumni. Locations are ranked by the number 
                  of alumni found in each area, with gold progress bars indicating relative proportions.
                </p>
              </div>
            </div>
          </Section>
        </div>

        <div id="table">
          <Section title="4. Alumni Records Table" icon={<Users className="h-5 w-5" />}>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                The main data table displays all discovered alumni records with the following columns:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-foreground font-semibold">Column</th>
                      <th className="text-left py-3 px-2 text-foreground font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 flex items-center gap-2">
                        <ToggleLeft className="h-4 w-4 text-ecoba-gold" />
                        Approval Toggle
                      </td>
                      <td className="py-3 px-2">
                        Green toggle switch to approve or reject records. <strong>On = Approved</strong>, Off = Pending review.
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Name</td>
                      <td className="py-3 px-2">Full name of the alumni with their current company shown in gray text below.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Status</td>
                      <td className="py-3 px-2">
                        Classification badge: 
                        <span className="inline-flex gap-1 ml-2">
                          <Badge className="badge-confirmed text-xs">Confirmed</Badge>
                          <Badge className="badge-probable text-xs">Probable</Badge>
                          <Badge className="badge-uncertain text-xs">Uncertain</Badge>
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Year</td>
                      <td className="py-3 px-2">Graduation year from Edo College (4-digit year format).</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Occupation</td>
                      <td className="py-3 px-2">Current job title or profession. Shows "—" if unknown.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Platform</td>
                      <td className="py-3 px-2">Source platform badge showing where the profile was found.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Location</td>
                      <td className="py-3 px-2">Geographic location in City, State, Country format.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Confidence</td>
                      <td className="py-3 px-2">
                        Progress bar with percentage indicating AI certainty. 
                        <span className="text-green-400"> Green (85%+)</span>, 
                        <span className="text-amber-400"> Amber (60-84%)</span>, 
                        <span className="text-orange-400"> Orange (&lt;60%)</span>.
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">Searched Date</td>
                      <td className="py-3 px-2">Date when the record was discovered (format: "18 Dec").</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <ExternalLink className="h-4 w-4" />
                        Actions
                      </td>
                      <td className="py-3 px-2">
                        <strong>Eye icon:</strong> View detailed profile modal. <br />
                        <strong>External link icon:</strong> Open source profile URL.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </div>

        <div id="confidence">
          <Section title="5. Confidence Score Guide" icon={<BarChart3 className="h-5 w-5" />}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">What It Measures</h4>
                <p className="text-muted-foreground">
                  The confidence score represents the AI system's certainty that a discovered profile 
                  belongs to an actual Edo College alumnus. Higher scores indicate stronger evidence.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">How It's Calculated</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Profile keywords matching Edo College terminology</li>
                  <li>Direct mentions of institution name</li>
                  <li>Graduation year consistency</li>
                  <li>Location relevance (Benin City, Edo State connections)</li>
                  <li>Connection patterns with known alumni</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Score Ranges</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-semibold text-green-400">95-100% - Strong Match</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Profile explicitly mentions "Edo College" with clear graduation year. Example: 
                      "Edo College Class of 1996" in bio.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="font-semibold text-green-400">85-94% - High Confidence</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Multiple related keywords found. Example: Mentions Benin City education + 
                      connected to known alumni.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <span className="font-semibold text-amber-400">60-84% - Moderate</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Some evidence but needs verification. Example: Location matches but no 
                      direct school mention.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                      <span className="font-semibold text-orange-400">Below 60% - Low Confidence</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Weak signals, manual review required. Example: Name similarity only, 
                      no other indicators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div id="status">
          <Section title="6. Status Classifications" icon={<CheckCircle2 className="h-5 w-5" />}>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Each alumni record is assigned one of three status classifications:
              </p>
              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="badge-confirmed">Confirmed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Direct mention of Edo College</strong> in the profile with a clear graduation year. 
                    These records have the highest certainty and typically require minimal review.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="badge-probable">Probable</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Indirect references or related keywords</strong> found. The person is likely an alumnus 
                    but the profile doesn't explicitly state so. May include connections to known alumni.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="badge-uncertain">Uncertain</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Weak signals only.</strong> The person may be an alumnus but evidence is limited. 
                    Requires careful manual verification before approval.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div id="filters">
          <Section title="7. Filter Panel Guide" icon={<Filter className="h-5 w-5" />}>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Click the "Filters" button to open the filter panel. Available filters include:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-foreground font-semibold">Filter</th>
                      <th className="text-left py-3 px-2 text-foreground font-semibold">Function</th>
                      <th className="text-left py-3 px-2 text-foreground font-semibold">How to Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Minimum Confidence Score</td>
                      <td className="py-3 px-2">Set threshold (0-100%)</td>
                      <td className="py-3 px-2">Drag the slider; only shows records above the threshold.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Graduation Year</td>
                      <td className="py-3 px-2">Filter by year range</td>
                      <td className="py-3 px-2">Use dual sliders to set start and end year (1970-2024).</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Status</td>
                      <td className="py-3 px-2">Filter by classification</td>
                      <td className="py-3 px-2">Click radio buttons for Confirmed, Probable, or Uncertain.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Location</td>
                      <td className="py-3 px-2">Filter by geography</td>
                      <td className="py-3 px-2">Type a location name and click "Add" button to filter.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Platforms</td>
                      <td className="py-3 px-2">Filter by source</td>
                      <td className="py-3 px-2">Click platform badges to toggle them on/off.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">Review Status</td>
                      <td className="py-3 px-2">Filter by approval</td>
                      <td className="py-3 px-2">Select All, Approved, or Pending badges.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 rounded-lg bg-ecoba-gold/10 border border-ecoba-gold/20 mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-ecoba-gold">Tip:</strong> Use the "Reset All" button at the bottom of the filter 
                  panel to clear all filters and return to the default view.
                </p>
              </div>
            </div>
          </Section>
        </div>

        <div id="actions">
          <Section title="8. Action Buttons" icon={<RefreshCw className="h-5 w-5" />}>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                The dashboard toolbar contains three main action buttons:
              </p>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Filter className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Opens the slide-out filter panel. Use this to narrow down the displayed records 
                      based on various criteria.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-ecoba-gold/20">
                    <RefreshCw className="h-5 w-5 text-ecoba-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Run Scan</h4>
                    <p className="text-sm text-muted-foreground">
                      Initiates a new AI-powered web search to discover additional alumni profiles. 
                      The scan runs across all configured platforms and may take several minutes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Download className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Export Excel</h4>
                    <p className="text-sm text-muted-foreground">
                      Downloads the currently filtered records as an Excel spreadsheet (.xlsx). 
                      The export includes all visible columns and respects your current filter settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div id="privacy">
          <Section title="9. Data Privacy & Compliance" icon={<Shield className="h-5 w-5" />}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Data Collection Practices</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Only publicly available information is collected</li>
                  <li>Source attribution is displayed for transparency</li>
                  <li>No private messages or protected content is accessed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Compliance</h4>
                <p className="text-muted-foreground">
                  The system follows GDPR-compliant practices for data handling and provides 
                  clear source attribution for all discovered records.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Handling Opt-Out Requests</h4>
                <p className="text-muted-foreground">
                  If an individual requests removal from the database, administrators should:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 mt-2">
                  <li>Locate the record using the search function</li>
                  <li>Toggle the approval switch to "Off" to disapprove the record</li>
                  <li>Document the opt-out request for compliance purposes</li>
                </ol>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-blue-400">Note:</strong> All data handling should comply with your 
                  organization's data protection policies and applicable local regulations.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            ECOBA Intelligence User Manual v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            For additional support, contact the ECOBA IT Administrator.
          </p>
        </div>
      </main>
    </div>
  );
}
