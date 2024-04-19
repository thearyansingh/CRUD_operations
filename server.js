const express = require('express');
const mongoose = require('mongoose');
const Product=require('./models/productModules')
const app = express();

// app.use(express.json)

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({encoded:false}))

// Routes
app.get('/', (req, res) => {
    res.send("Hello Node API");
});
// Blog routes
app.get('/blog', (req, res) => {
    res.send("Hello Aryan, welcome to the blog");
});
// to get the data 
app.get('/products',async(req,res)=>{
try {
    const product=await Product.find({});
    res.status(200).json(product)
} catch (error) {
    res.status(500).json({message:error.message})
}

})
// to find the product
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// to create the product
app.post("/products",async(req,res)=>{
   
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// update a product
app.put('/products/:id',async(req,res)=>{
    try {
        const{id}= req.params;
        const product =await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id} `})
        }
        const updateProduct=await Product.findById(id);
        res.status(200).json(updateProduct);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


// to delete the product
app.delete('/products/:id',async(req,res)=>{
try {
   const{id}=req.params;
   const product=await Product.findByIdAndDelete(id);
   if(!product){
     return res.status(404).json({message:`cannot find any product with ID ${id} `})
   }
   res.status(200).json(product);

} catch (error) {
    res.status(500).json({message:error.message}) 
}
})



// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://Aryan9998:800aryan@aryan.vbmhooe.mongodb.net/Node-API?retryWrites=true&w=majority&appName=aryan')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Node is running on port ");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });