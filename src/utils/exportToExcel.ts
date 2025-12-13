// Legacy type for export function compatibility
interface ExportAlumniRecord {
  id: string;
  fullName: string;
  status: string;
  graduationYear: string | null;
  occupation: string | null;
  company: string | null;
  publicEmail: string | null;
  publicPhone: string | null;
  platform: string;
  profileUrl: string;
  location: string | null;
  confidenceScore: number;
  dateFound: Date;
  isApproved: boolean;
  sourceAttribution: string;
  matchedKeywords: string[];
  bio: string | null;
}

export function exportToExcel(data: ExportAlumniRecord[], filename: string = 'ecoba-alumni-export') {
  // Create CSV content (can be opened in Excel)
  const headers = [
    'Full Name',
    'Status',
    'Graduation Year',
    'Occupation',
    'Company',
    'Public Email',
    'Public Phone',
    'Platform',
    'Profile URL',
    'Location',
    'Confidence Score',
    'Date Found',
    'Approved',
    'Source Attribution',
    'Matched Keywords',
    'Bio'
  ];

  const rows = data.map(record => [
    record.fullName,
    record.status,
    record.graduationYear || '',
    record.occupation || '',
    record.company || '',
    record.publicEmail || '',
    record.publicPhone || '',
    record.platform,
    record.profileUrl,
    record.location || '',
    record.confidenceScore.toString(),
    new Date(record.dateFound).toISOString().split('T')[0],
    record.isApproved ? 'Yes' : 'No',
    record.sourceAttribution,
    record.matchedKeywords.join('; '),
    record.bio || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => {
        // Escape cells that contain commas or quotes
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Add BOM for Excel to recognize UTF-8
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
