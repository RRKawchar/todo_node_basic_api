const express = require('express');
const dotenv=require('dotenv');
const myCreatePool = require('./config/db');
const { bgBlue } = require('colors');
const morgan= require('morgan');


// istance of express
const app = express();

//config dotenv
dotenv.config();


// Midleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/todo',require('./routes/todoRoutes'));

// PORT
const PORT = process.env.PORT|| 8000;

//conditionaly listen
myCreatePool.query('SELECT 1').then(()=>{

    console.log("DB Connected successfully!");
// listen
app.listen(PORT,()=>{
    console.log("Server is running...".bgRed.white);
    });
});




