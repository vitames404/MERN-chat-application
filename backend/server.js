// Import Express.js
const express = require("express"); 
// Import the dotenv
const dotenv = require("dotenv");
// Import the data to populate to test the API
const { chats } = require("./data/data");

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send("API is running");
});

// Display every entry in the data.js file
app.get('/api/chat', (req,res) => {
    res.send(chats);
});

// Create the single chat variable that store the one entry that 
// have the same id as the request.
// After that display it to the user.
app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000;

// Initialize our first server
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));