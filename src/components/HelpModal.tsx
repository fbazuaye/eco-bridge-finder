import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  HelpCircle,
  Search,
  Filter,
  Download,
  Radar,
  CheckCircle2,
  XCircle,
  Eye,
  BarChart3,
  MapPin,
  Shield,
} from 'lucide-react';

interface HelpSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function HelpSection({ icon, title, children }: HelpSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ecoba-gold/10 text-ecoba-gold">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="ml-10 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" title="Help & Instructions">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-ecoba-gold" />
            How to Use ECOBA Intelligence
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Overview */}
            <div className="rounded-lg bg-ecoba-gold/5 border border-ecoba-gold/20 p-4">
              <p className="text-sm text-foreground">
                <strong>ECOBA Intelligence</strong> is an AI-powered alumni discovery system designed to help you find, verify, and manage alumni profiles from across the web. This tool aggregates data from multiple platforms while ensuring GDPR compliance.
              </p>
            </div>

            <Separator />

            {/* Search */}
            <HelpSection icon={<Search className="h-4 w-4" />} title="Search Alumni">
              <p>
                Use the search bar at the top to quickly find alumni by <strong>name</strong>, <strong>company</strong>, <strong>location</strong>, or <strong>occupation</strong>. The search works across all visible columns in the table.
              </p>
            </HelpSection>

            <Separator />

            {/* Filters */}
            <HelpSection icon={<Filter className="h-4 w-4" />} title="Filter Results">
              <p className="mb-2">
                Click the <strong>"Filters"</strong> button to access advanced filtering options:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Graduation Year:</strong> Filter by year range (e.g., 2010-2020)</li>
                <li><strong>Location:</strong> Select specific cities or regions</li>
                <li><strong>Platform:</strong> Filter by source (LinkedIn, Facebook, Twitter, etc.)</li>
                <li><strong>Confidence Score:</strong> Set minimum confidence threshold</li>
                <li><strong>Status:</strong> Filter by Confirmed, Probable, or Uncertain</li>
                <li><strong>Approval:</strong> Show approved, pending, or all records</li>
              </ul>
            </HelpSection>

            <Separator />

            {/* AI Scan */}
            <HelpSection icon={<Radar className="h-4 w-4" />} title="Run AI Scan">
              <p className="mb-2">
                The <strong>"Run AI Scan"</strong> button initiates an automated search across multiple platforms to discover new alumni profiles. The AI analyzes web content to identify potential alumni based on:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Educational background and institution mentions</li>
                <li>Professional affiliations and keywords</li>
                <li>Social media profiles and public information</li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground/80">
                Note: Scans may take a few moments to complete. New profiles will appear in the table automatically.
              </p>
            </HelpSection>

            <Separator />

            {/* Approval Workflow */}
            <HelpSection icon={<CheckCircle2 className="h-4 w-4" />} title="Approve or Reject Records">
              <p className="mb-2">
                Each alumni record can be approved or rejected using the action buttons in the table:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <CheckCircle2 className="inline h-3 w-3 text-green-500 mr-1" />
                  <strong>Approve:</strong> Mark as verified alumni for inclusion in reports
                </li>
                <li>
                  <XCircle className="inline h-3 w-3 text-red-500 mr-1" />
                  <strong>Reject:</strong> Mark as non-alumni or incorrect match
                </li>
              </ul>
              <p className="mt-2">
                Use the approval filter to quickly view only pending records that need review.
              </p>
            </HelpSection>

            <Separator />

            {/* View Details */}
            <HelpSection icon={<Eye className="h-4 w-4" />} title="View Alumni Details">
              <p>
                Click the <strong>eye icon</strong> on any row to open a detailed view of the alumni profile. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Full bio and professional summary</li>
                <li>Contact information (if publicly available)</li>
                <li>Matched keywords that identified them</li>
                <li>Source attribution and profile URL</li>
                <li>Confidence score breakdown</li>
              </ul>
            </HelpSection>

            <Separator />

            {/* Export */}
            <HelpSection icon={<Download className="h-4 w-4" />} title="Export Data">
              <p>
                Click <strong>"Export Excel"</strong> to download the currently filtered alumni data as an Excel spreadsheet. The export includes all visible columns and respects your active filters.
              </p>
            </HelpSection>

            <Separator />

            {/* Analytics */}
            <HelpSection icon={<BarChart3 className="h-4 w-4" />} title="Dashboard Analytics">
              <p>
                The dashboard displays key metrics and visualizations:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li><strong>Total Records:</strong> Number of alumni profiles discovered</li>
                <li><strong>Confirmed:</strong> Verified alumni with high confidence</li>
                <li><strong>Avg. Confidence:</strong> Overall accuracy of matches</li>
                <li><strong>Platform Distribution:</strong> Chart showing sources by platform</li>
                <li><strong>Top Locations:</strong> Geographic distribution of alumni</li>
              </ul>
            </HelpSection>

            <Separator />

            {/* Locations */}
            <HelpSection icon={<MapPin className="h-4 w-4" />} title="Location Insights">
              <p>
                The location panel shows where alumni are concentrated globally. Click on a location to filter the table by that specific area.
              </p>
            </HelpSection>

            <Separator />

            {/* Compliance */}
            <HelpSection icon={<Shield className="h-4 w-4" />} title="Data Privacy & Compliance">
              <p className="mb-2">
                ECOBA Intelligence adheres to strict data privacy standards:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Only publicly available information is collected</li>
                <li>Data is used solely for alumni network management</li>
                <li>GDPR-compliant data handling practices</li>
                <li>Source attribution is provided for transparency</li>
              </ul>
            </HelpSection>

            {/* Tips */}
            <div className="rounded-lg bg-secondary/50 p-4 mt-4">
              <h4 className="font-semibold text-foreground mb-2">💡 Pro Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Use multiple filters together for precise results</li>
                <li>• Review low-confidence records manually for accuracy</li>
                <li>• Export regularly to maintain offline backups</li>
                <li>• Run scans periodically to discover new alumni</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
