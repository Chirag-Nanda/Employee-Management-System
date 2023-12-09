const mongoose = require("mongoose");

const ceoSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    address: {
        type: String,
        require: true,
    },
    adhar: {
        type: Number,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        default: 'O',
    },
    age: {
        type: Number,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },


}); 

const ceo = new mongoose.model("ceo", ceoSchema);

module.exports = ceo;