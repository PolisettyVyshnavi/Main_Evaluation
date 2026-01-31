import { Router } from 'express';
const router=Router();
import { getAnalytics } from "../controllers/analyticsController.js";

router.get('/',getAnalytics);
