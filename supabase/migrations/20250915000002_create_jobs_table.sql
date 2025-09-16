-- Create jobs table for internship matching platform
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read jobs
DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs;
CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT USING (true);

-- Policy: Authenticated users can create jobs (only with their own user_id)
DROP POLICY IF EXISTS "Users can create jobs" ON jobs;
CREATE POLICY "Users can create jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = employer_id);

-- Policy: Users can update their own jobs
DROP POLICY IF EXISTS "Users can update own jobs" ON jobs;
CREATE POLICY "Users can update own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = employer_id);

-- Policy: Users can delete their own jobs
DROP POLICY IF EXISTS "Users can delete own jobs" ON jobs;
CREATE POLICY "Users can delete own jobs" ON jobs
  FOR DELETE USING (auth.uid() = employer_id);