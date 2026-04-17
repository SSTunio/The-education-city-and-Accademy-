-- Migration SQL for Education City & AI Academy (v6 - Duplicate Fix)
-- This script cleans up duplicate course names so the constraints and website can work correctly.

-- 1. Remove duplicate courses (Keeping the most recent one)
DELETE FROM courses a
USING courses b
WHERE a.id < b.id
  AND a.name = b.name;

-- 2. Now it is safe to add the UNIQUE constraint
ALTER TABLE IF EXISTS courses DROP CONSTRAINT IF EXISTS courses_name_key;
ALTER TABLE IF EXISTS courses ADD CONSTRAINT courses_name_key UNIQUE (name);

-- 3. Unlock all permissions (RLS) for the website
ALTER TABLE IF EXISTS courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all access" ON courses;
CREATE POLICY "Allow all access" ON courses FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE IF EXISTS announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all access" ON announcements;
CREATE POLICY "Allow all access" ON announcements FOR ALL USING (true) WITH CHECK (true);

-- 4. Grant direct access permissions
GRANT ALL ON TABLE courses TO anon;
GRANT ALL ON TABLE courses TO authenticated;
GRANT ALL ON TABLE courses TO service_role;

GRANT ALL ON TABLE announcements TO anon;
GRANT ALL ON TABLE announcements TO authenticated;
GRANT ALL ON TABLE announcements TO service_role;

-- 5. Update any courses that might have missing program types
UPDATE courses SET program_type = 'Weekday' WHERE program_type IS NULL OR program_type = '';
UPDATE courses SET topics = 'Learning, Technology, Future' WHERE topics IS NULL OR topics = '';

-- 6. Final Seed (Ensuring the 10 core courses exist with correct data)
INSERT INTO courses (name, track, program_type, duration, trainer, topics) VALUES 
('Web Development', 'Intermediate', 'Weekday', '5-Day Session', 'Industry Expert', 'HTML5, CSS3, JavaScript, React'),
('WordPress Design', 'Intermediate', 'Weekday', '5-Day Session', 'Industry Expert', 'Elementor, SEO, E-commerce'),
('Python Coding', 'Intermediate', 'Weekday', '5-Day Session', 'Industry Expert', 'Basics, Logic, File Handling'),
('AI & Machine Learning', 'Advanced', 'Weekday', '5-Day Session', 'Industry Expert', 'NumPy, Pandas, Neural Networks'),
('Ethical Hacking', 'Advanced', 'Weekday', '5-Day Session', 'Industry Expert', 'Networking, Pen Testing, Linux'),
('Basic Computer Skills', 'Beginner', 'Weekend', 'Morning Session', 'Junior Trainer', 'MS Office, Internet, Windows'),
('Basic Electronics', 'Beginner', 'Weekend', 'Morning Session', 'Junior Trainer', 'Circuits, Components, Soldering'),
('Intro to Arduino', 'Beginner', 'Weekend', 'Morning Session', 'Junior Trainer', 'C++, Sensors, Automation'),
('English Language', 'Beginner', 'Weekend', 'Morning Session', 'ESL Trainer', 'Speaking, Grammar, IELTS Prep')
ON CONFLICT (name) DO UPDATE SET 
  program_type = EXCLUDED.program_type,
  duration = EXCLUDED.duration,
  topics = EXCLUDED.topics;
