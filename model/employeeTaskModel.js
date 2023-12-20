const mongoose = require("mongoose");


const employeeTaskSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    
    empId : {
        type: String,
        require : true,
    },

    deptID : {
        type: String,
        require : true,
    },

    task :{
        type: String,
        require :true,
    },
})

const employeeTask= new mongoose.model("employeeTask", employeeTaskSchema );
module.exports = employeeTask;
