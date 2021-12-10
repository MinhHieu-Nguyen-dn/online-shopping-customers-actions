import { User } from '../models/user.js';
import { Product } from '../models/product.js';
import { Invoice } from '../models/invoice.js';
import { Cart } from '../models/cart.js';

const getAllProducts = async (req, res, next) => {
    const allProducts = await Product.find();
    return res.json({
        message: 'All products here.',
        allProducts
    });
}

const getUserCart = (req, res, next) => {

}

const postUserCart = async (req, res, next) => {
    const bodyData = req.body;
    const userId = bodyData.userId;
    const userCart = await Cart.findOne({ user: userId });

    if (userCart == null) {
        const newCart = new Cart({ user: userId });
        newCart.save();
        return res.json({
            userId,
            message: 'This user\'s cart is empty.'
        })
    }

    return res.json({
        message: 'This is the cart of',
        userCart
    })
}

const postUserInvoice = async (req, res, next) => {
    const bodyData = req.body;
    const userId = bodyData.userId;
    const all = bodyData.all;
    const payListId = bodyData.payListId;

    const userCart = await Cart.findOne({ user: userId });

    if (all == true) {
        var productsToPay = userCart.products;
    } else {
        var productsToPay = new Array();
        payListId.forEach((inCartId) => {
            let inCartIndex = userCart.products.findIndex((inCart) => inCart._id == inCartId);
            productsToPay.push(userCart.products[inCartIndex]);
        })
    }

    var bill = 0;

    const productToPayDetails = await Promise.all(
        productsToPay.map((product) => {
            const productId = product.product;
            return Product.findOne({ _id: productId });
        })
    )

    var index = 0;

    productsToPay.forEach((product) => {
        const productQuantity = product.quantity;
        const productPrice = productToPayDetails[index].price;
        bill = bill + productQuantity * productPrice;
        index = index + 1;
    })

    const newInvoice = new Invoice( { user: userId, bill: bill, details: productsToPay} );
    newInvoice.save();

    return res.json({
        message: "calculating invoice",
        all,
        billDetaits: newInvoice
    })

}

const postAddProductCart = async (req, res, next) => {
    const bodyData = req.body;
    const userId = bodyData.userId;
    const addToCart = bodyData.products;

    const updateCart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { products: addToCart } }
    );

    const newCart = await Cart.findOne({ user: userId });

    return res.json({
        message: 'New cart of',
        userId,
        newCart
    })
}

const postDeleteProductCart = async (req, res, next) => {
    const bodyData = req.body;
    const userId = bodyData.userId;
    const all = bodyData.all;
    const listIdInCartToDelete = bodyData.listIdInCartToDelete;

    if (all == true) {
        const deleteCart = await Cart.findOneAndDelete({ user: userId });

        return res.json({
            message: "Remove all items from the cart of",
            userId
        })
    }

    const userCart = await Cart.findOne({ user: userId });

    listIdInCartToDelete.forEach((deleteId) => {
        let deleteIndex = userCart.products.findIndex((inCart) => inCart._id == deleteId);
        userCart.products.splice(deleteIndex, 1);
    })

    userCart.save();

    return res.json({
        message: 'New cart of',
        userId,
        userCart
    })
}

const postUpdateProductCart = async (req, res, next) => {
    const bodyData = req.body;
    const userId = bodyData.userId;
    const inCartId = bodyData.inCartId;
    const newQuantity = bodyData.newQuantity;

    const updateCart = await Cart.updateOne(
        { user: userId, "products._id": inCartId },
        { $set: { "products.$.quantity": newQuantity } }
    )

    const newCart = await Cart.findOne({ user: userId });

    return res.json({
        message: 'New cart of',
        userId,
        newCart,
    })
}

export { getAllProducts, getUserCart, postUserCart, postUserInvoice, postAddProductCart, postDeleteProductCart, postUpdateProductCart };