const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
   
    name : {
        type : String,
        require : true,
    },

    supervisor : {
        type : String,
        require : true,
    },

    employees : {
        type: [{type: String}],
        require : true,
    }



})

const department = new mongoose.model("department", departmentSchema);

module.exports = department;