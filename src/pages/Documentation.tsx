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
  ChevronRight,
  Image,
  Monitor,
  Table,
  SlidersHorizontal,
  MousePointer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import ecobaLogo from '@/assets/ecoba-logo.png';

// Visual example component for reusable illustration cards
interface VisualExampleProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function VisualExample({ title, description, children }: VisualExampleProps) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-secondary/40 border border-border/50">
      <div className="flex items-center gap-2 mb-2">
        <Image className="h-4 w-4 text-ecoba-gold" />
        <h5 className="font-medium text-foreground text-sm">{title}</h5>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
      <div className="rounded-lg overflow-hidden border border-border/50 bg-background">
        {children}
      </div>
    </div>
  );
}

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
              <a href="#visual-guide" className="text-muted-foreground hover:text-ecoba-gold transition-colors">2. Visual Reference Guide</a>
              <a href="#statistics" className="text-muted-foreground hover:text-ecoba-gold transition-colors">3. Dashboard Statistics Cards</a>
              <a href="#analytics" className="text-muted-foreground hover:text-ecoba-gold transition-colors">4. Analytics Panels</a>
              <a href="#table" className="text-muted-foreground hover:text-ecoba-gold transition-colors">5. Alumni Records Table</a>
              <a href="#confidence" className="text-muted-foreground hover:text-ecoba-gold transition-colors">6. Confidence Score Guide</a>
              <a href="#status" className="text-muted-foreground hover:text-ecoba-gold transition-colors">7. Status Classifications</a>
              <a href="#filters" className="text-muted-foreground hover:text-ecoba-gold transition-colors">8. Filter Panel Guide</a>
              <a href="#actions" className="text-muted-foreground hover:text-ecoba-gold transition-colors">9. Action Buttons</a>
              <a href="#privacy" className="text-muted-foreground hover:text-ecoba-gold transition-colors">10. Data Privacy & Compliance</a>
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

        {/* Visual Reference Guide - NEW SECTION */}
        <div id="visual-guide">
          <Section title="2. Visual Reference Guide" icon={<Image className="h-5 w-5" />}>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                This section provides visual examples of the key interface elements to help you quickly 
                identify and understand each part of the dashboard.
              </p>

              {/* Dashboard Overview Example */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="h-5 w-5 text-ecoba-gold" />
                  <h4 className="font-semibold text-foreground">Dashboard Overview</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The main dashboard displays statistics cards at the top, followed by analytics panels 
                  and the alumni records table.
                </p>
                {/* Visual mockup of dashboard layout */}
                <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Total Records', icon: Users, color: 'bg-ecoba-gold/20 text-ecoba-gold' },
                      { label: 'Confirmed', icon: CheckCircle2, color: 'bg-green-500/20 text-green-400' },
                      { label: 'Pending', icon: Clock, color: 'bg-amber-500/20 text-amber-400' },
                      { label: 'This Week', icon: TrendingUp, color: 'bg-blue-500/20 text-blue-400' },
                    ].map((card, i) => (
                      <div key={i} className="p-2 rounded bg-card border border-border/50 text-center">
                        <div className={`inline-flex p-1.5 rounded ${card.color} mb-1`}>
                          <card.icon className="h-3 w-3" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{card.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-card border border-border/50 h-16 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Platform Chart</span>
                    </div>
                    <div className="p-2 rounded bg-card border border-border/50 h-16 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Location List</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-card border border-border/50 h-20 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Alumni Records Table</span>
                  </div>
                </div>
              </div>

              {/* Statistics Cards Example */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-ecoba-gold" />
                  <h4 className="font-semibold text-foreground">Statistics Cards</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Four cards showing key metrics. Each card displays an icon, value, and trend indicator.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-ecoba-gold/20">
                        <Users className="h-4 w-4 text-ecoba-gold" />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Total Records</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-green-500/20">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">89</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-amber-500/20">
                        <Clock className="h-4 w-4 text-amber-400" />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">42</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-blue-500/20">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                </div>
              </div>

              {/* Table Example */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Table className="h-5 w-5 text-ecoba-gold" />
                  <h4 className="font-semibold text-foreground">Alumni Records Table</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The table displays all alumni records with sortable columns and action buttons.
                </p>
                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-2 text-muted-foreground font-medium">Toggle</th>
                        <th className="text-left p-2 text-muted-foreground font-medium">Name</th>
                        <th className="text-left p-2 text-muted-foreground font-medium">Status</th>
                        <th className="text-left p-2 text-muted-foreground font-medium">Confidence</th>
                        <th className="text-left p-2 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border/50">
                        <td className="p-2">
                          <div className="w-8 h-4 bg-green-500 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                          </div>
                        </td>
                        <td className="p-2 text-foreground">John Doe</td>
                        <td className="p-2"><Badge className="badge-confirmed text-[10px] py-0">Confirmed</Badge></td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full w-[92%] bg-green-500 rounded-full" />
                            </div>
                            <span className="text-green-400">92%</span>
                          </div>
                        </td>
                        <td className="p-2 flex gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </td>
                      </tr>
                      <tr className="border-t border-border/50">
                        <td className="p-2">
                          <div className="w-8 h-4 bg-secondary rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-muted-foreground rounded-full" />
                          </div>
                        </td>
                        <td className="p-2 text-foreground">Jane Smith</td>
                        <td className="p-2"><Badge className="badge-probable text-[10px] py-0">Probable</Badge></td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full w-[75%] bg-amber-500 rounded-full" />
                            </div>
                            <span className="text-amber-400">75%</span>
                          </div>
                        </td>
                        <td className="p-2 flex gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Filter Panel Example */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="h-5 w-5 text-ecoba-gold" />
                  <h4 className="font-semibold text-foreground">Filter Panel</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The slide-out filter panel allows you to narrow down records by various criteria.
                </p>
                <div className="rounded-lg border border-border bg-background p-4 max-w-xs">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Confidence Score</p>
                      <div className="h-2 bg-secondary rounded-full relative">
                        <div className="h-2 w-1/2 bg-ecoba-gold rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-ecoba-gold rounded-full border-2 border-background" />
                      </div>
                      <p className="text-xs text-ecoba-gold mt-1">50%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Status</p>
                      <div className="flex gap-2">
                        <Badge className="badge-confirmed text-[10px]">Confirmed</Badge>
                        <Badge variant="outline" className="text-[10px]">Probable</Badge>
                        <Badge variant="outline" className="text-[10px]">Uncertain</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Platform</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="platform-linkedin text-[10px]">LinkedIn</Badge>
                        <Badge className="platform-facebook text-[10px]">Facebook</Badge>
                        <Badge variant="outline" className="text-[10px]">Twitter</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Example */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <MousePointer className="h-5 w-5 text-ecoba-gold" />
                  <h4 className="font-semibold text-foreground">Action Buttons</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The toolbar contains action buttons for filtering, scanning, and exporting data.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <Filter className="h-3 w-3" />
                    Filters
                  </Button>
                  <Button size="sm" className="gap-2 text-xs bg-ecoba-gold text-ecoba-green-dark hover:bg-ecoba-gold/90">
                    <RefreshCw className="h-3 w-3" />
                    Run Scan
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-xs text-green-400 border-green-400/30">
                    <Download className="h-3 w-3" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div id="statistics">
          <Section title="3. Dashboard Statistics Cards" icon={<BarChart3 className="h-5 w-5" />}>
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
          <Section title="4. Analytics Panels" icon={<BarChart3 className="h-5 w-5" />}>
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
          <Section title="5. Alumni Records Table" icon={<Users className="h-5 w-5" />}>
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
                        View Search Details
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
          <Section title="6. Confidence Score Guide" icon={<BarChart3 className="h-5 w-5" />}>
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
          <Section title="7. Status Classifications" icon={<CheckCircle2 className="h-5 w-5" />}>
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
          <Section title="8. Filter Panel Guide" icon={<Filter className="h-5 w-5" />}>
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
          <Section title="9. Action Buttons" icon={<RefreshCw className="h-5 w-5" />}>
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
          <Section title="10. Data Privacy & Compliance" icon={<Shield className="h-5 w-5" />}>
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
