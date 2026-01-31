import express, { json } from 'express';
import { logger, rateLimiter, handle404 } from './middlewares/appMiddleware.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app=express();
app.use(json())
app.use(logger);
app.use('/analytics',analyticsRoutes)
app.post('/create-vehicle',rateLimiter,(req,res)=>{
    res.status(201).json({message:"Vehicle added"})
})
app.use(handle404)
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))