const  Product=require('../models/productModules')
const asyncHandler = require('express-async-handler')
const createProduct=asyncHandler(async(req,res)=>{
   
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
const getProduct=asyncHandler(async(req,res)=>{
    try {
        const product=await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
    
    })
    const findproduct=asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    })
const updateProduct=asyncHandler(async(req,res)=>{
    try {
        const{id}= req.params;
        const product =await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id} `})
        }
        res.status(500)
        throw new Error(error.message)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    } 
})
const deleteProduct=asyncHandler(async(req,res)=>{
    try {
       const{id}=req.params;
       const product=await Product.findByIdAndDelete(id);
       if(!product){
        res.status(404)
            throw new Error(`cnanot find produdct with this id ${id}`)
       }
       res.status(200).json(product);
    
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
    })
    module.exports={
        getProduct,
        createProduct,
        findproduct,
        updateProduct,
        deleteProduct
    }