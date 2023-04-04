const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const dotenv=require ('dotenv').config();
const port=process.env.PORT||5000; 
const connectDB=require('./config/db');

connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:false}))

app.use('/api/todos', require('./routes/todosRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))

app.listen(port,()=>console.log(`server running on ${port}`))