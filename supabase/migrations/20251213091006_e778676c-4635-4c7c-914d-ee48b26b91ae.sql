
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.is_admin(auth.uid()));

-- Update alumni_records policies to require admin role
DROP POLICY IF EXISTS "Authenticated users can view alumni records" ON public.alumni_records;
DROP POLICY IF EXISTS "Authenticated users can insert alumni records" ON public.alumni_records;
DROP POLICY IF EXISTS "Authenticated users can update alumni records" ON public.alumni_records;
DROP POLICY IF EXISTS "Authenticated users can delete alumni records" ON public.alumni_records;

CREATE POLICY "Admins can view alumni records"
ON public.alumni_records
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert alumni records"
ON public.alumni_records
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update alumni records"
ON public.alumni_records
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete alumni records"
ON public.alumni_records
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Update scan_history policies
DROP POLICY IF EXISTS "Authenticated users can view scan history" ON public.scan_history;
DROP POLICY IF EXISTS "Authenticated users can insert scan history" ON public.scan_history;
DROP POLICY IF EXISTS "Authenticated users can update scan history" ON public.scan_history;

CREATE POLICY "Admins can view scan history"
ON public.scan_history
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert scan history"
ON public.scan_history
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update scan history"
ON public.scan_history
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));
