const employeeTaskModel = require("../model/employeeTaskModel");
const employeeModel = require("../model/employeeModel");

module.exports = {

    assign : async (req,res) => {
        
        const employee = await employeeModel.findById(req.body.employeeID);
        
        if(employee.deptID != req.body.departmentID){
            return res.status(400).json({
                success : false,
                message : "Unauthorised access",
            });
        }
        
        const newTask = new employeeTaskModel();
        newTask.name = req.body.name;
        newTask.empId = req.body.employeeID;
        newTask.deptID = req.body.departmentID;
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
       
        const taskId = req.params.id;



        try {
            await employeeTaskModel.findByIdAndUpdate(taskId, req.body);
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
         
        const taskId = req.params.id;

        try {
            await employeeTaskModel.findByIdAndDelete(taskId);
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

    fetch : async(req, res)=>{
         const empID = req.params.empID;

         try{
            const data = await employeeTaskModel.find({empId : empID});
            return res.status(200).json({
                success : true,
                message : data,
            })
         }catch(err){
            return res.status(500).json({
                success : false,
                message : "Internal server error",
            })
         }
    },

}