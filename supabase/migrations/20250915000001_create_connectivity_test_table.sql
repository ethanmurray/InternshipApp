-- Create a simple test table for connectivity testing
CREATE TABLE IF NOT EXISTS public._test_table_that_does_not_exist (
    id BIGSERIAL PRIMARY KEY,
    test_message TEXT DEFAULT 'Connectivity test successful!',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a test record
INSERT INTO public._test_table_that_does_not_exist (test_message)
VALUES ('Supabase connection is working!');

-- Enable Row Level Security (RLS) for security
ALTER TABLE public._test_table_that_does_not_exist ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous read access for testing
DROP POLICY IF EXISTS "Allow anonymous read access for testing" ON public._test_table_that_does_not_exist;
CREATE POLICY "Allow anonymous read access for testing"
ON public._test_table_that_does_not_exist
FOR SELECT
TO anon
USING (true);