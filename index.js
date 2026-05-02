const express = require('express');
require('dotenv').config();

const server = express();
const connectDB = require('./database/db');
const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute")
const createPostRoutes = require("./routes/createPostRoute")

server.use(express.json()); 

server.use("/api/auth", authRoutes);
server.use("/api/profile",profileRoutes);
server.use("/api/post",createPostRoutes);


server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});