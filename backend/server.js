// Import Express.js
const express = require("express"); 
// Import the dotenv
const dotenv = require("dotenv");
// Import the data to populate to test the API
const { chats } = require("./data/data");
const connectDB = require("./config/db");

const colors = require("colors");

const userRoutes = require("./routes/userRoutes")

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // To accept json data

app.get('/', (req, res) => {
    res.send("API is running");
});

//
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000;

// Initialize our first server
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));