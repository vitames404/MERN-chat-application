const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

// Main function that manage the registerUser endPoint
const registerUser = asyncHandler(async (req, res) => 
{
    // Content of the body request 
    const {name, email, password, pic } = req.body;

    // Check if the all the fields are filled
    if(!name || !email || !password)
    {
        // Return an error if the any of the fields empty
        res.status(400);
        throw new Error("Please enter all the Fields");
    }
    
    // Read about in the documentation but bascially it will 
    // search for the email in the database because it need to be unique
    const userExists = await User.findOne({email});

    // Check if there is already a user with that email in the database
    if(userExists)
    {
        // Return an error if it finds another user with the same e-mail
        res.status(400);
        throw new Error("User already exists");
    }

    // Create a new User Model passing the parameters
    const user = await User.create(
        {
            name,
            email,
            password,
            pic,
        });
    
    // If user can be created successfully it will return the response
    // with all passed data
    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    // If there's any problem with the creation of the User it will return a Error
    else
    {
        // Return the error
        res.status(400);
        throw new Error("Failed to create the user");
    }

});

// Function that will authenticate the user Login
const authUser = asyncHandler(async (req, res) => {
    
    // It will be a post that will post email and password
    const {email, password} = req.body;

    // Search if the email already exists in the database
    const user = await User.findOne({email});

    // If user and password match return the successfull response
    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id: user._id,
            password: user.password,
            email: user.email,
            pic: user.pic,
            token:  generateToken(user._id), 
        });
    }
    // If not return an error
    else
    {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

});

// /api/user?search=variable
const allUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name : { $regex : req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i"} },
        ]
    }
    : {};
    
    const users = await User.find(keyword).find({ _id: { $ne:req.user._id } });
    res.send(users);
})

// Export Everything
module.exports={registerUser, authUser, allUsers};