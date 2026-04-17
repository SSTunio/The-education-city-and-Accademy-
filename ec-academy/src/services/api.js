import { createClient } from '@supabase/supabase-js';

// Hardcoded for production reliability (as per report strategy)
const supabaseUrl = 'https://xfdemqvbdzlshavbdlna.supabase.co';
const supabaseKey = 'sb_publishable_bCiLGQ3zUp8TeMF-muZvCw_qUh2jLLj';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth Service (Aligned with Portfolio Report - using Supabase Auth)
export const authService = {
  login: async ({ email, password }) => {
    // Uses real Supabase JWT Authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },
  register: async (studentData) => {
    return supabase.table('registrations').insert({
      student_name: studentData.name,
      course: studentData.course,
      program_type: studentData.program,
      status: 'pending',
      created_at: new Date().toISOString()
    });
  },
  logout: async () => {
    return supabase.auth.signOut();
  },
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};

// Academy Service (Direct BaaS Communication)
export const academyService = {
  getStats: async () => {
    return { data: { students: 320, programs: 2, courses: 9, pass_rate: '95%', trainers: 6 } };
  },
  getAnnouncements: async () => {
    return supabase.table('announcements').select('*').order('created_at', { ascending: false }).limit(5);
  },
  getCourses: async () => {
    return supabase.table('courses').select('*').order('program_type', { ascending: false }).order('created_at', { ascending: false });
  },
  addCourse: async (courseData) => {
    const payload = {
      name: courseData.name,
      track: courseData.track,
      program_type: courseData.program_type,
      trainer: courseData.trainer,
      duration: courseData.duration,
      topics: courseData.topics,
      status: courseData.status
    };
    
    if (courseData.id) {
      return supabase.table('courses').update(payload).eq('id', courseData.id);
    } else {
      return supabase.table('courses').insert(payload);
    }
  },
  deleteCourse: async (id) => {
    return supabase.table('courses').delete().eq('id', id);
  },
};

export default supabase;
