import supabase from '../config/supabase.js';

export async function createUserService({ name, email, password, role }) {
  if (!['customer','owner','driver'].includes(role)) throw new Error("Invalid role");

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password, role }])
    .select();

  if (error) {
    if (error.code === '23505') throw new Error("Email already exists");
    throw error;
  }
  return data[0];
}