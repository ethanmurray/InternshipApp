# Supabase Setup

This directory contains the database migrations and setup for the InternshipApp Supabase integration.

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned

### 2. Run Migrations
Execute the migration file to create the test table:

```sql
-- Run this in your Supabase SQL Editor
-- File: migrations/20250915000001_create_connectivity_test_table.sql
```

Or use the Supabase CLI:
```bash
supabase db push
```

### 3. Configure Environment Variables
Add these to your Vercel project:

- `EXPO_PUBLIC_SUPABASE_URL`: Your project URL from Supabase Settings > API
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your anon key from Supabase Settings > API

### 4. Test Connection
Visit your deployed app and click "Test Supabase Connection" to verify everything is working.

## Tables Created

### `_test_table_that_does_not_exist`
- **Purpose**: Connectivity testing
- **Access**: Anonymous read access via RLS policy
- **Columns**:
  - `id` (BIGSERIAL PRIMARY KEY)
  - `test_message` (TEXT)
  - `created_at` (TIMESTAMP WITH TIME ZONE)

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Anonymous users can only read from the test table
- All other operations require authentication