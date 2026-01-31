import supabase from '../config/supabase.js';

export async function createVehicleService({ name, registration_number, allowed_passengers, rate_per_km, ownerId }) {
  if (!name || !registration_number || !allowed_passengers || !rate_per_km || !ownerId) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from('vehicles')
    .insert([{ name, registration_number, allowed_passengers, rate_per_km, owner_id: ownerId }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function assignDriverService(vehicleId, driverId) {
  if (!vehicleId || !driverId) throw new Error("Vehicle ID and Driver ID are required");

  const { data, error } = await supabase
    .from('vehicles')
    .update({ driver_id: driverId })
    .eq('id', vehicleId)
    .select();

  if (error) throw error;
  if (!data.length) throw new Error("Vehicle not found");

  return data[0];
}

export async function getVehicleService(vehicleId) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicleId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Vehicle not found");

  return data;
}