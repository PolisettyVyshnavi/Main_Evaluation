import { createVehicleService, assignDriverService, getVehicleService } from '../services/vehicleService.js';

export async function addVehicle(req, res) {
  try {
    const vehicle = await createVehicleService(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function assignDriver(req, res) {
  try {
    const vehicle = await assignDriverService(req.params.vehicleId, req.body.driverId);
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getVehicle(req, res) {
  try {
    const vehicle = await getVehicleService(req.params.vehicleId);
    res.json(vehicle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}