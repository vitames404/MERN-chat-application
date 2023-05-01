const mongoose =  require("mongoose");

// Import bcrypt
const bcrypt = require('bcryptjs');

// Define the user model
const userSchema = mongoose.Schema(
    {
        name:{type: String, required:true},
        email:{type: String, required:true},
        password:{type: String, required: true},
        pic: {type:String, required: true, default:"https://avatars.githubusercontent.com/u/82846956?v=4"},
    },
    {
        timestamps: true,
    }
);

// Compare encrypted password from the database with the one entered in Login
userSchema.methods.matchPassword = async function (enteredPassword)
{
    // Use compare bcrypt function to compare the password entered with the 
    // encrypted one
    return await bcrypt.compare(enteredPassword, this.password);
}

// Before saving the user this is executed
userSchema.pre('save', async function (next) {
    
    if(!this.isModified)
    {
        next();
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

// Create the new User
const User = mongoose.model("User", userSchema);

module.exports = User;
