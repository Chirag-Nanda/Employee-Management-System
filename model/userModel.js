const mongoose = require("mongoose");
const userSchema = new  mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    email: {
        type : String,
        require : true,
    },
    password: {
        type : String,
        require : true,
    },
    role: {
        type: String,
        enum : ['emp','sp','ceo'],
        default : 'emp',
    },


})

const User= new mongoose.model("User", userSchema)

module.exports= User


