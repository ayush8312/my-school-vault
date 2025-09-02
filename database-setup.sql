-- Create the schools table
CREATE TABLE IF NOT EXISTS public.schools (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact TEXT NOT NULL,
    email_id TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON public.schools
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.schools
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.schools
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON public.schools
    FOR DELETE USING (true);

-- Create storage bucket for school images
INSERT INTO storage.buckets (id, name, public)
VALUES ('schools', 'schools', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for school images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'schools');

CREATE POLICY "Public Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'schools');

CREATE POLICY "Public Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'schools');

CREATE POLICY "Public Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'schools');