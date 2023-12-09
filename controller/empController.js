const employeeModel = require("../model/employeeModel");
const mongoose = require("mongoose");
module.exports = {
    update: async (req,res)=>{
        try {
            console.log(req.params);
            await employeeModel.findByIdAndUpdate(req.params, req.body);
            return res.status(200).json({
                success : true,
                message : "Employee data updated",
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    
    },

    delete: async (req, res) => {
       
        try {
            
            await employeeModel.findByIdAndDelete(req.params);

            return res.status(200).json({
                success : true,
                message : "Employee data deleted",
            })

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err,
                
            });
        }

    },



};