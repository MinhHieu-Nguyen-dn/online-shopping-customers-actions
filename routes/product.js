import express from 'express';
import { getAllProducts } from '../controllers/user.js';
const router = express.Router();

router.get('/', getAllProducts);

export default router;