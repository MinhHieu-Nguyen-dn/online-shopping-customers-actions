import express from 'express';
import { postUserInvoice } from '../controllers/user.js';
const router = express.Router();

router.post('/', postUserInvoice);

export default router;