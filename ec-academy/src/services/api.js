import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfdemqvbdzlshavbdlna.supabase.co';
const supabaseKey = 'sb_publishable_bCiLGQ3zUp8TeMF-muZvCw_qUh2jLLj';

export const supabase = createClient(supabaseUrl, supabaseKey);

const handleSupabaseError = (res, context) => {
  if (res.error) {
    console.error(`Supabase Error [${context}]:`, res.error);
    return { error: true, message: res.error.message || 'Error' };
  }
  return { error: false, data: res.data };
};

export const authService = {
  login: async ({ email, password }) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  studentLogin: async ({ username, password }) => {
    const res = await supabase.from('registrations').select('*').eq('username', username).eq('password', password).maybeSingle();
    return handleSupabaseError(res, 'StudentLogin');
  },

  register: async (studentData) => {
    const res = await supabase.from('registrations').insert({
      student_name: studentData.name,
      father_name: studentData.father_name, // New Field
      gender: studentData.gender,           // New Field
      caste: studentData.caste,             // New Field
      course: studentData.course,
      program_type: studentData.program,
      username: studentData.username,
      password: studentData.password,
      status: 'pending',
      created_at: new Date().toISOString()
    });
    return handleSupabaseError(res, 'Register');
  },
  
  logout: async () => {
    return supabase.auth.signOut();
  }
};

export const academyService = {
  getAnnouncements: async () => {
    const res = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(5);
    return handleSupabaseError(res, 'GetAnnouncements');
  },
  getCourses: async () => {
    const res = await supabase.from('courses').select('*').order('program_type', { ascending: false }).order('created_at', { ascending: false });
    return handleSupabaseError(res, 'GetCourses');
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
    let res;
    if (courseData.id) {
      res = await supabase.from('courses').update(payload).eq('id', courseData.id);
    } else {
      res = await supabase.from('courses').insert(payload);
    }
    return handleSupabaseError(res, 'AddCourse');
  },
  deleteCourse: async (id) => {
    const res = await supabase.from('courses').delete().eq('id', id);
    return handleSupabaseError(res, 'DeleteCourse');
  },
};

export default supabase;
