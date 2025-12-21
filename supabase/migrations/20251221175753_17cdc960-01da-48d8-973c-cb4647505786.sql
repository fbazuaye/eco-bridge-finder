-- Create notification type enum
CREATE TYPE public.notification_type AS ENUM ('new_record', 'scan_complete', 'needs_review', 'system');

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL DEFAULT 'system',
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_record_id UUID REFERENCES public.alumni_records(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);

-- System can insert notifications (via triggers/functions)
CREATE POLICY "System can insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- Create function to generate notification for new alumni records
CREATE OR REPLACE FUNCTION public.notify_new_alumni_record()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user RECORD;
BEGIN
  -- Notify all admin users about new records
  FOR admin_user IN 
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, type, related_record_id)
    VALUES (
      admin_user.user_id,
      'New Alumni Discovered',
      'New record found: ' || NEW.full_name || ' on ' || NEW.platform,
      'new_record',
      NEW.id
    );
  END LOOP;
  RETURN NEW;
END;
$$;

-- Create trigger for new alumni records
CREATE TRIGGER on_new_alumni_record
AFTER INSERT ON public.alumni_records
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_alumni_record();

-- Create function to notify when scan completes
CREATE OR REPLACE FUNCTION public.notify_scan_complete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user RECORD;
BEGIN
  -- Only trigger when status changes to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    FOR admin_user IN 
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    LOOP
      INSERT INTO public.notifications (user_id, title, message, type)
      VALUES (
        admin_user.user_id,
        'Scan Completed',
        'Alumni scan completed. Found ' || COALESCE(NEW.records_found, 0) || ' records.',
        'scan_complete'
      );
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for scan completion
CREATE TRIGGER on_scan_complete
AFTER UPDATE ON public.scan_history
FOR EACH ROW
EXECUTE FUNCTION public.notify_scan_complete();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;