import { AlumniRecord, SocialPlatform, AlumniStatus } from '@/types/alumni';

const generateId = () => Math.random().toString(36).substring(2, 15);

const platforms: SocialPlatform[] = ['LinkedIn', 'Facebook', 'Twitter', 'Instagram', 'Web', 'News'];
const statuses: AlumniStatus[] = ['Confirmed', 'Probable', 'Uncertain'];
const occupations = [
  'Software Engineer', 'Medical Doctor', 'Lawyer', 'Banker', 'Engineer', 
  'Entrepreneur', 'Professor', 'Architect', 'Consultant', 'CEO',
  'Financial Analyst', 'Journalist', 'Diplomat', 'Pilot', 'Pharmacist'
];
const companies = [
  'Shell Nigeria', 'GTBank', 'Access Bank', 'Chevron', 'Total Energies',
  'NLNG', 'Microsoft Nigeria', 'Google', 'MTN Nigeria', 'Dangote Group',
  'Central Bank of Nigeria', 'Federal Ministry of Health', 'NNPC', 'Zenith Bank'
];
const locations = [
  'Lagos, Nigeria', 'Benin City, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria',
  'London, UK', 'Houston, USA', 'New York, USA', 'Dubai, UAE', 'Johannesburg, South Africa',
  'Toronto, Canada', 'Atlanta, USA', 'Manchester, UK', 'Amsterdam, Netherlands'
];

const nigerianFirstNames = [
  'Osaze', 'Ehigiator', 'Osayuki', 'Osahon', 'Eghosa', 'Osamudiamen', 
  'Osagie', 'Osaro', 'Nosakhare', 'Ehis', 'Iyare', 'Osayande',
  'Abubakar', 'Chukwuemeka', 'Olumide', 'Adeyemi', 'Ifeanyi', 'Tunde'
];

const nigerianLastNames = [
  'Okonkwo', 'Igbinedion', 'Ogbeifun', 'Obaseki', 'Osagie', 'Aikhionbare',
  'Okpara', 'Iyahen', 'Ogiemwonyi', 'Osayande', 'Erhirhie', 'Eghosa',
  'Adebayo', 'Nwosu', 'Adeleke', 'Bankole', 'Ogunyemi', 'Afolabi'
];

const matchedKeywords = [
  'Edo College Old Boy', 'ECOBA member', 'Class of', 'Edo College Benin',
  'Edo College Alumni', 'Former Edo College student', 'ECOBA worldwide',
  'Edo Boys', 'EC Benin City'
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateBio(name: string, gradYear: string | null, occupation: string): string {
  const bios = [
    `Proud Edo College Old Boy ${gradYear ? `(Class of ${gradYear})` : ''}. Currently working as ${occupation}. ECOBA member.`,
    `${occupation} | Edo College Benin Alumni | Building futures since graduation`,
    `Edo College Class of ${gradYear || '90s'} alumnus. ${occupation} passionate about giving back.`,
    `Former student of Edo College, Benin City. Now ${occupation}. #ECOBA #EdoCollege`,
    `${occupation} | Edo Boys | Bridging memories, building futures`
  ];
  return randomElement(bios);
}

function generateMockAlumni(count: number): AlumniRecord[] {
  const records: AlumniRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(nigerianFirstNames);
    const lastName = randomElement(nigerianLastNames);
    const fullName = `${firstName} ${lastName}`;
    const occupation = randomElement(occupations);
    const gradYear = (1970 + Math.floor(Math.random() * 50)).toString();
    const platform = randomElement(platforms);
    const status = randomElement(statuses);
    const confidenceScore = status === 'Confirmed' 
      ? 85 + Math.floor(Math.random() * 16) 
      : status === 'Probable'
        ? 60 + Math.floor(Math.random() * 25)
        : 30 + Math.floor(Math.random() * 30);
    
    const daysAgo = Math.floor(Math.random() * 90);
    const dateFound = new Date();
    dateFound.setDate(dateFound.getDate() - daysAgo);

    records.push({
      id: generateId(),
      fullName,
      status,
      graduationYear: Math.random() > 0.2 ? gradYear : null,
      occupation: Math.random() > 0.15 ? occupation : null,
      company: Math.random() > 0.3 ? randomElement(companies) : null,
      publicEmail: Math.random() > 0.6 ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com` : null,
      publicPhone: Math.random() > 0.8 ? `+234${Math.floor(Math.random() * 9000000000 + 1000000000)}` : null,
      platform,
      profileUrl: platform === 'LinkedIn' 
        ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`
        : platform === 'Twitter'
          ? `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`
          : platform === 'Facebook'
            ? `https://facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`
            : platform === 'Instagram'
              ? `https://instagram.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}`
              : `https://example.com/profile/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      location: Math.random() > 0.1 ? randomElement(locations) : null,
      confidenceScore,
      dateFound,
      isApproved: status === 'Confirmed' ? Math.random() > 0.3 : Math.random() > 0.7,
      sourceAttribution: `Discovered via ${platform} public profile search`,
      matchedKeywords: [randomElement(matchedKeywords), randomElement(matchedKeywords)].filter((v, i, a) => a.indexOf(v) === i),
      bio: generateBio(fullName, gradYear, occupation),
    });
  }

  return records;
}

export const mockAlumniData: AlumniRecord[] = generateMockAlumni(150);

export function getAlumniStats() {
  const data = mockAlumniData;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    totalRecords: data.length,
    confirmedCount: data.filter(a => a.status === 'Confirmed').length,
    probableCount: data.filter(a => a.status === 'Probable').length,
    pendingReview: data.filter(a => !a.isApproved).length,
    platformBreakdown: platforms.reduce((acc, p) => {
      acc[p] = data.filter(a => a.platform === p).length;
      return acc;
    }, {} as Record<SocialPlatform, number>),
    topLocations: Object.entries(
      data.reduce((acc, a) => {
        if (a.location) {
          acc[a.location] = (acc[a.location] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    )
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    recentFindings: data.filter(a => a.dateFound >= weekAgo).length,
  };
}
