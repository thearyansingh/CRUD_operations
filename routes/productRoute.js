
const express= require('express');
const router=express.Router();
const Product=require('../models/productModules')
const {
    getProduct,
    createProduct,
    findproduct,
    updateProduct,
    deleteProduct
}=require('../controller/productController')


// Routes

// to create the product
router.post("/" ,createProduct)
// to get the data 
router.get('/',getProduct)
    // to find the product
router.get('/:id',findproduct );

// update a product
router.put('/:id',updateProduct)

// to delete the product
router.delete('/:id',deleteProduct)

module.exports= router;