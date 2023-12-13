const employeeTaskModel = require("../model/employeeTaskModel");
const departmentModel= require("../model/departmentModel");
const employeeModel = require("../model/employeeModel");
const jwt = require("jsonwebtoken");
module.exports = {

    assign : async (req,res) => {
        const department = await departmentModel.findOne({name: req.body.department});  
        console.log("checkpoint touched")
        const empArr = department.employees;
        let flag=1;
        empArr.forEach((item)=>{
            if(item === req.body.name){
                flag=0;
            }
        })

        if(flag){
            return res.status(400).json({
                success : false,
                message : "Unauthorised access",
            });
        }
        

        const newTask = new employeeTaskModel();
        newTask.name = req.body.name;
        newTask.id = await employeeModel.findOne({name: req.body.name});
        newTask.department = req.body.department;
        newTask.task = req.body.task;

        try{
           await newTask.save();
           return res.status(201).json({
            success : true,
            message : "Task assigned successfully",
           });
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "Internal server error",
            })
        }


    },

    update : async (req,res) => {
       
        const id = req.params;

        try {
            await employeeTaskModel.findByIdAndUpdate(id, req.body);
            return res.status(201).json({
                success : true,
                message : "Task updated successfully",
               });
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "Internal server error",
            })
        }

    },

    delete : async(req,res) =>{
         
        const id = req.params;

        try {
            await employeeTaskModel.findByIdAndDelete(id);
            return res.status(201).json({
                success : true,
                message : "Task deleted successfully",
               });
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "Internal server error",
            })
        }

    },

}