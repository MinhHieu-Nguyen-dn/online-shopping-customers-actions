import express from 'express';
import { getUserCart, postUserCart, postAddProductCart, postDeleteProductCart, postUpdateProductCart } from '../controllers/user.js';
const router = express.Router();

router.get('/', getUserCart);
router.post('/', postUserCart);

router.post('/add', postAddProductCart);
router.post('/delete', postDeleteProductCart);
router.post('/update', postUpdateProductCart);

export default router;