const mongoose = require("mongoose");
const employeeModel = require("./employeeModel");
const departmentSchema = new mongoose.Schema({
   
    name : {
        type : String,
        require : true,
    },


    employees : {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: employeeModel}],
        require : true,
    }



})

const department = new mongoose.model("department", departmentSchema);

module.exports = department;