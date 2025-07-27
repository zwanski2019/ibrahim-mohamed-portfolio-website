-- Allow guest job posts
ALTER TABLE job_posts ALTER COLUMN employer_id DROP NOT NULL;

ALTER TABLE job_posts
  ADD COLUMN contact_name TEXT,
  ADD COLUMN contact_email TEXT;
