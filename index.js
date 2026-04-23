const express =require('express');

const server=express();
const connectDB = require('./database/db');



server.get('/',(req,res)=>{
    res.send('Hello World');
}); 

server.listen(3000,()=>{
    connectDB();
    console.log('Server is running on port 3000');
});

