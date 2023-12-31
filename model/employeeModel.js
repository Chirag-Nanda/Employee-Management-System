const mongoose = require("mongoose");
const userModel = require("./userModel");

const employeeSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    //ref : userModel,
    require : true,
  },
  
  image : {
    type : String,
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
    enum : ['M','F','O'],
    default : 'O',
  },
  age : {
    type : Number,
    require : true,
  },
  dob: {
    type : String,
    require : true,
  },

  deptID: {
    type: mongoose.Schema.Types.ObjectId,
    require : true, 
  }

});

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee