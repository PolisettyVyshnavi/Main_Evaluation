import express from 'express';
import { createTrip, updateTrip, getTrip, deleteTrip, endTrip } from '../controllers/tripController.js';

const router = express.Router();

router.post('/create', createTrip);
router.patch('/update/:tripId', updateTrip);
router.get('/:tripId', getTrip);
router.delete('/delete/:tripId', deleteTrip);
router.patch('/end/:tripId', endTrip);

export default router;