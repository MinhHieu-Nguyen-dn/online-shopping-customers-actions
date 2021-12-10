import express from 'express';
import mongoose from 'mongoose';

import productsRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import invoiceRoutes from './routes/invoice.js';

import { config } from 'dotenv';

config();


const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/invoice', invoiceRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'This is the landing page!',
    })
})

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT);
    })
    .catch((err) => console.log(err));