import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import logger from './middlewares/logger.js';
import notFound from './middlewares/notFound.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/analytics', analyticsRoutes);

// Handle undefined routes
app.use(notFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Fleet Management API running on port ${PORT}`));