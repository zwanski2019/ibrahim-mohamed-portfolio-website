-- Add 'pending' and 'rejected' to the existing job_status enum
ALTER TYPE job_status ADD VALUE IF NOT EXISTS 'pending';
ALTER TYPE job_status ADD VALUE IF NOT EXISTS 'rejected';