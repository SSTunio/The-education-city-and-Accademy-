-- Migration SQL for Education City & AI Academy (v2)

-- Update Courses Table with new fields
ALTER TABLE IF EXISTS courses ADD COLUMN IF NOT EXISTS program_type TEXT DEFAULT 'Weekday';
ALTER TABLE IF EXISTS courses ADD COLUMN IF NOT EXISTS topics TEXT;

-- Initial Data for the new structure
-- Weekend Programs
INSERT INTO courses (name, track, program_type, duration, topics) VALUES 
('Basic Computer Skills', 'Beginner', 'Weekend', 'Morning Session', 'Operating Systems, Internet Safety, MS Office'),
('Basic Electronics', 'Beginner', 'Weekend', 'Morning Session', 'Circuits, Components, Soldering Basics'),
('Intro to Arduino', 'Beginner', 'Weekend', 'Morning Session', 'Microcontrollers, C++ Basics, Sensor Interfacing'),
('English Language', 'Beginner', 'Weekend', 'Morning Session', 'Communication Skills, Grammar, Speaking Practice');

-- Weekday Programs
INSERT INTO courses (name, track, program_type, duration, topics) VALUES 
('Web Development', 'Intermediate', 'Weekday', '5-Day Session', 'HTML5/CSS3, JavaScript, React Basics'),
('WordPress Design', 'Intermediate', 'Weekday', '5-Day Session', 'Elementor, Theme Customization, SEO Basics'),
('Python Coding', 'Intermediate', 'Weekday', '5-Day Session', 'Data Types, Loops, Functions, File Handling'),
('AI & Machine Learning', 'Advanced', 'Weekday', '5-Day Session', 'NumPy/Pandas, Scikit-Learn, Neural Networks'),
('Ethical Hacking', 'Advanced', 'Weekday', '5-Day Session', 'Network Security, Pen Testing, Linux Mastery');
