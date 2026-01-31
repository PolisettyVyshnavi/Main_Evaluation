import supabase from '../config/supabase.js';

export async function createTripService({ customerId, vehicleId, start_date, location, distance_km, passengers }) {
  // Validate vehicle availability
  const { data: vehicle } = await supabase.from('vehicles').select('*').eq('id', vehicleId).single();
  if (!vehicle) throw new Error("Vehicle not found");
  if (!vehicle.isAvailable) throw new Error("Vehicle not available");
  if (passengers > vehicle.allowed_passengers) throw new Error("Passenger count exceeds allowed limit");

  const { data, error } = await supabase
    .from('trips')
    .insert([{ customer_id: customerId, vehicle_id: vehicleId, start_date, location, distance_km, passengers }])
    .select();

  if (error) throw error;

  // Mark vehicle unavailable
  await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicleId);

  return data[0];
}

export async function getTripService(tripId) {
  const { data, error } = await supabase.from('trips').select('*').eq('id', tripId).single();
  if (error) throw error;
  if (!data) throw new Error("Trip not found");
  return data;
}

export async function updateTripService(tripId, updates) {
  const { data, error } = await supabase.from('trips').update(updates).eq('id', tripId).select();
  if (error) throw error;
  if (!data.length) throw new Error("Trip not found");
  return data[0];
}

export async function deleteTripService(tripId) {
  const { error } = await supabase.from('trips').delete().eq('id', tripId);
  if (error) throw error;
  return { message: "Trip deleted successfully" };
}

export async function endTripService(tripId) {
  const { data: trip } = await supabase.from('trips').select('*').eq('id', tripId).single();
  if (!trip) throw new Error("Trip not found");

  // Calculate cost
  const { data: vehicle } = await supabase.from('vehicles').select('*').eq('id', trip.vehicle_id).single();
  const tripCost = trip.distance_km * vehicle.rate_per_km;

  const { data, error } = await supabase
    .from('trips')
    .update({ isCompleted: true, tripCost })
    .eq('id', tripId)
    .select();

  if (error) throw error;

  // Mark vehicle available again
  await supabase.from('vehicles').update({ isAvailable: true }).eq('id', trip.vehicle_id);

  return data[0];
}