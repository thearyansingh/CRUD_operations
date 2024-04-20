require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const productRoute=require('./routes/productRoute');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');

var cors = require('cors')

//ENV file exports 
const PORT=process.env.PORT || 3000
const MONGO_URL=process.env.MONGO_URL
// const Frontend=process.env.Frontend
 
//  we will these function when the backend part connect 
// with the frontend part

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({encoded:false}))
app.use('/api/products',productRoute)
// app.use(cors(corsOptions));

app.get('/',(req,res)=>{
   res.send("hello node api")
})
app.use(errorMiddleware)
// Connect to MongoDB and start the server
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Node is running on port  ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });