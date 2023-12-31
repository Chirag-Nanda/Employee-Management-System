const mongoose = require("mongoose");
const departmentModel = require("./departmentModel");
const supervisorSchema = new mongoose.Schema({
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
    image: {
        type: String,
    },
    deptID: {
        type: mongoose.Schema.Types.ObjectId,
        ref : departmentModel,
      }


}); 

const supervisorModel = new mongoose.model("supervisor", supervisorSchema);

module.exports = supervisorModel;