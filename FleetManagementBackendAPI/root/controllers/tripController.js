import {
  createTripService,
  getTripService,
  updateTripService,
  deleteTripService,
  endTripService
} from '../services/tripService.js';

export async function createTrip(req, res) {
  try {
    const trip = await createTripService(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getTrip(req, res) {
  try {
    const trip = await getTripService(req.params.tripId);
    res.json(trip);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function updateTrip(req, res) {
  try {
    const trip = await updateTripService(req.params.tripId, req.body);
    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteTrip(req, res) {
  try {
    const result = await deleteTripService(req.params.tripId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function endTrip(req, res) {
  try {
    const trip = await endTripService(req.params.tripId);
    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}