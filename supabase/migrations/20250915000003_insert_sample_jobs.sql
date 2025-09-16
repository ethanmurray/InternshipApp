-- Insert sample job data for testing
-- This migration is rerunnable - it will only insert if the data doesn't already exist

-- Insert sample jobs only if they don't already exist
INSERT INTO jobs (id, title, description, contact_email, contact_phone, employer_id, created_at)
SELECT
  id::uuid, title, description, contact_email, contact_phone, NULL, created_at
FROM (VALUES
  ('11111111-1111-1111-1111-111111111111', 'Software Engineering Intern', 'Join our team to work on cutting-edge web applications using React and Node.js. You''ll collaborate with senior developers and gain hands-on experience in full-stack development.', 'internships@techstartup.com', '(555) 123-4567', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Data Science Intern', 'Analyze large datasets and build machine learning models to drive business insights. Perfect opportunity to work with Python, SQL, and modern ML frameworks.', 'careers@datacompany.com', '(555) 987-6543', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'UX/UI Design Intern', 'Design user-friendly interfaces for mobile and web applications. Work closely with product managers and developers to create intuitive user experiences.', 'design@creativestudio.com', '(555) 456-7890', NOW())
) AS new_jobs(id, title, description, contact_email, contact_phone, created_at)
WHERE NOT EXISTS (
  SELECT 1 FROM jobs WHERE jobs.id = new_jobs.id::uuid
);