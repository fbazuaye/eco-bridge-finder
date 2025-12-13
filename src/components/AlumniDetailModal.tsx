import { 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  GraduationCap,
  Calendar,
  Shield,
  Link2,
  FileText
} from 'lucide-react';
import { DbAlumniRecord, SocialPlatform } from '@/types/alumni';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface AlumniDetailModalProps {
  record: DbAlumniRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onApprovalChange: (id: string, approved: boolean) => void;
}

const platformVariants: Record<SocialPlatform, "linkedin" | "twitter" | "facebook" | "instagram" | "web" | "news"> = {
  LinkedIn: 'linkedin',
  Twitter: 'twitter',
  Facebook: 'facebook',
  Instagram: 'instagram',
  Web: 'web',
  News: 'news',
};

export function AlumniDetailModal({ 
  record, 
  isOpen, 
  onClose, 
  onApprovalChange 
}: AlumniDetailModalProps) {
  if (!record) return null;

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-orange-400';
  };

  const getConfidenceBg = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground flex items-center gap-3">
            {record.full_name}
            <Badge 
              variant={record.status === 'Confirmed' ? 'confirmed' : record.status === 'Probable' ? 'probable' : 'uncertain'}
            >
              {record.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Confidence Score */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3">
              <Shield className={cn("h-5 w-5", getConfidenceColor(record.confidence_score))} />
              <div>
                <p className="text-sm font-medium text-foreground">AI Confidence Score</p>
                <p className="text-xs text-muted-foreground">Based on semantic matching analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", getConfidenceBg(record.confidence_score))}
                  style={{ width: `${record.confidence_score}%` }}
                />
              </div>
              <span className={cn("text-xl font-bold", getConfidenceColor(record.confidence_score))}>
                {record.confidence_score}%
              </span>
            </div>
          </div>

          {/* Bio */}
          {record.bio && (
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground italic">"{record.bio}"</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {record.graduation_year && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <GraduationCap className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Graduation Year</p>
                  <p className="text-sm font-medium text-foreground">Class of {record.graduation_year}</p>
                </div>
              </div>
            )}

            {record.occupation && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <Building2 className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Occupation</p>
                  <p className="text-sm font-medium text-foreground">{record.occupation}</p>
                </div>
              </div>
            )}

            {record.company && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <Building2 className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium text-foreground">{record.company}</p>
                </div>
              </div>
            )}

            {record.location && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <MapPin className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{record.location}</p>
                </div>
              </div>
            )}

            {record.public_email && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <Mail className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${record.public_email}`}
                    className="text-sm font-medium text-foreground hover:text-ecoba-gold transition-colors"
                  >
                    {record.public_email}
                  </a>
                </div>
              </div>
            )}

            {record.public_phone && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                <Phone className="h-5 w-5 text-ecoba-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{record.public_phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Source Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Source Platform:</span>
              <Badge variant={platformVariants[record.platform]}>{record.platform}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Found on {new Date(record.date_found).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{record.source_attribution}</span>
            </div>
          </div>

          {/* Matched Keywords */}
          {record.matched_keywords && record.matched_keywords.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Matched Keywords</p>
              <div className="flex flex-wrap gap-2">
                {record.matched_keywords.map((keyword, i) => (
                  <Badge key={i} variant="gold" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Switch
                id="approval"
                checked={record.is_approved}
                onCheckedChange={(checked) => onApprovalChange(record.id, checked)}
                className="data-[state=checked]:bg-green-500"
              />
              <Label htmlFor="approval" className="text-sm text-foreground">
                {record.is_approved ? 'Approved' : 'Pending Review'}
              </Label>
            </div>

            <div className="flex gap-2">
              <a href={record.profile_url} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
