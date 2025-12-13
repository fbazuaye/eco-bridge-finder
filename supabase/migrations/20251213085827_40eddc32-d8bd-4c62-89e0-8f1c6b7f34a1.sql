-- Create enum for alumni status
CREATE TYPE public.alumni_status AS ENUM ('Confirmed', 'Probable', 'Uncertain');

-- Create enum for social platforms
CREATE TYPE public.social_platform AS ENUM ('LinkedIn', 'Facebook', 'Twitter', 'Instagram', 'Web', 'News');

-- Create alumni_records table
CREATE TABLE public.alumni_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  status public.alumni_status NOT NULL DEFAULT 'Uncertain',
  graduation_year TEXT,
  occupation TEXT,
  company TEXT,
  public_email TEXT,
  public_phone TEXT,
  platform public.social_platform NOT NULL,
  profile_url TEXT NOT NULL,
  location TEXT,
  confidence_score INTEGER NOT NULL DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  date_found TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_approved BOOLEAN NOT NULL DEFAULT false,
  source_attribution TEXT NOT NULL,
  matched_keywords TEXT[] DEFAULT '{}',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scan_history table to track scans
CREATE TABLE public.scan_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'running',
  records_found INTEGER DEFAULT 0,
  platforms_scanned TEXT[] DEFAULT '{}',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.alumni_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

-- Create policies for alumni_records (authenticated users can manage)
CREATE POLICY "Authenticated users can view alumni records" 
ON public.alumni_records 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert alumni records" 
ON public.alumni_records 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update alumni records" 
ON public.alumni_records 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete alumni records" 
ON public.alumni_records 
FOR DELETE 
TO authenticated
USING (true);

-- Create policies for scan_history
CREATE POLICY "Authenticated users can view scan history" 
ON public.scan_history 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert scan history" 
ON public.scan_history 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update scan history" 
ON public.scan_history 
FOR UPDATE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_alumni_records_updated_at
BEFORE UPDATE ON public.alumni_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster searches
CREATE INDEX idx_alumni_records_full_name ON public.alumni_records USING gin(to_tsvector('english', full_name));
CREATE INDEX idx_alumni_records_status ON public.alumni_records(status);
CREATE INDEX idx_alumni_records_platform ON public.alumni_records(platform);
CREATE INDEX idx_alumni_records_graduation_year ON public.alumni_records(graduation_year);
CREATE INDEX idx_alumni_records_confidence ON public.alumni_records(confidence_score);
CREATE INDEX idx_alumni_records_approved ON public.alumni_records(is_approved);
CREATE INDEX idx_alumni_records_date_found ON public.alumni_records(date_found DESC);