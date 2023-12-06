const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    require : true,
  },

  name: {
    type : String,
    require : true,
  },
  email: {
    type : String,
    require : true,
  },
  address: {
    type : String,
    require : true,
  },
  adhar : {
    type : Number,
    require : true,
  },
  phone : {
    type : Number,
    require : true,
  },
  gender: {
    type : String,
    require : true,
  },
  age : {
    type : Number,
    require : true,
  },
  dob: {
    type : String,
    require : true,
  },

});

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee