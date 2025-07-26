-- Add status field to ideas table
CREATE TYPE public.idea_status as enum ('pending', 'in_progress', 'completed', 'rejected');

ALTER TABLE public.ideas 
ADD COLUMN status public.idea_status NOT NULL DEFAULT 'pending';