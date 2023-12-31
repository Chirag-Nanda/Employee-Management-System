const deptModel = require("../model/departmentModel");
const supervisorModel = require("../model/supervisorModel");
const mongoose= require("mongoose");
module.exports = {
    
    create : async (req,res)=>{
       const name = req.body.name;
       const employees = req.body.employees;
       

       
       

       const department = new deptModel();
       department.name =name;
      
       department.employees = employees;
       
       

       try{
         await department.save();
        
          await supervisorModel.findByIdAndUpdate(req.body.supervisor, {deptID: department._id});
        
           
         return res.status(200).json({
            success : true,
            message : "department created",
         });
       }catch(err){
         return  res.status(500).json({
            success : false,
            message : err,
          });
       }

    },

    read : async (req,res) =>{
        try {
            
            const pageNumber = parseInt(req.query.pageNumber)||1;
            let limit = parseInt(req.query.limit)||5;
            let startIndex = (pageNumber-1)*limit;
            let data ={};
            let allData =[];
            
           
                allData = await deptModel.find().limit(limit).skip(startIndex);
            
                data.contents=allData;
                data.noOfResults = allData.length;
                data.pageNumber= pageNumber;

            
            return res.status(200).json({
               success : true,
               results : data,
            });
          }catch(err){
            console.log(err);
            return res.status(500).json({
             success : false,
             message : "Internal server error"
            })
          }
    },

    readById : async(req,res)=>{
      
        let tempId=req.params.id; 

        try {
            let allData = await deptModel.findById(tempId);
            return res.status(201).json({
               success : true,
               data : allData
            });
          }catch(err){
            return res.status(500).json({
             success : false,
             message : "Internal server error"
            })
          }



    },


    update : async (req,res) =>{
        
        let id = req.params.id;

        try{
          await deptModel.findByIdAndUpdate( id , req.body);
          return res.status(200).json({
            success : true,
            message : "department data updated",
          })
        }catch(err){
            return  res.status(500).json({
                success : false,
                message : "Internal server error",
              });
        }

    },

    delete : async (req,res) =>{
      

        let id = req.params.id;

        try{
          await deptModel.findByIdAndDelete(id);
          return res.status(200).json({
            success : true,
            message : "department data updated",
          })
        }catch(err){
            return  res.status(500).json({
                success : false,
                message : "Internal server error",
              });
        }

    },

    transfer : async(req,res) =>{
       
       let department1 = await deptModel.findById(req.body.fromdepartmentID);
       let department2 = await deptModel.findById(req.body.todepartmentID);

       var flag1=1;
       var flag2=0; 
       let newEm1=[];
       let newEm2=[];
       department1.employees.forEach((item)=>{
         if(item == req.body.employeeID){
           flag1=0;
           
         }
         if(item !=req.body.employeeID){
           newEm1.push(item);
         }
       })
       
       department2.employees.forEach((item)=>{
        if(item == req.body.employeeID){
          flag2=1;
          
        }
      
          newEm2.push(item);
        
      })




       if(flag1){
         return res.status(400).json({
          success : false,
          message : "employee not in department",
         })
       }

       if(flag2){
        return res.status(400).json({
          success : false,
          message : "employee is already in department",
         })
       }
       var  objID=  new  mongoose.Types.ObjectId(req.body.employeeID);
       newEm2.push(objID);

       console.log(newEm1);
       console.log(newEm2);

       try{
         await deptModel.findByIdAndUpdate(req.body.fromdepartmentID, {employees : newEm1});
         await deptModel.findByIdAndUpdate(req.body.todepartmentID, {employees : newEm2});
        return res.status(200).json({
          success : true,
          message : "employee transfer successful",
        })
       }catch(err){
         return res.status(500).json({
          success : false,
          message : err,
         })
       }



    },

    sptransfer: async(req,res)=>{
     
      const supervisor = await supervisorModel.findById(req.body.supervisorID);

      if(supervisor.deptID != req.body.fromdepartmentID){
        return res.status(400).json({
          success : false,
          message : "supervisor not in the department",
        })
      }

      supervisor.deptID = req.body.todepartmentID;

      try{
         await supervisor.save();
         return res.status(200).json({
          success : true,
          message : "transfer_complete",
        })
      }catch(err){
        return res.status(500).json({
          success : false,
          message : "Internal server error",
        })
      }


    },


    fetchAdmin : async(req,res) =>{
       
      try{
        const department = await deptModel.findById(req.params.id);
        
        
          var newData = {};
          newData.nameOfDepartment = department.name;
          newData.employees= department.employees;
          newData.supervisor = department.supervisor;
          newData.noOfEmployees = department.employees.length;
          
          
          console.log(newData);
          return res.status(200).json({
            success: true,
            message: newData,
          })

        
        
        


      }catch(err){
        return res.status(500).json({
          success : false,
          message : "Internal server error",
         })
      }
    },


    fetchDetails: async(req,res) =>{
       
      try{
        
        const supervisor = await supervisorModel.findById(req.body.supervisor_ID);
        if(req.params.id != supervisor.deptID){
          return res.status(400).json({
            success : false,
            message : "Unauthorized access",
          })
        }

        else{
          const department = await deptModel.findById(req.params.id);
          var newData = {};
          newData.nameOfDepartment = department.name;
          newData.employees= department.employees;
          newData.noOfEmployees = department.employees.length;

          return res.status(200).json({
            success: true,
            message: newData,
          })

        }
        
        


      }catch(err){
        return res.status(500).json({
          success : false,
          message : "Internal server error",
         })
      }
    },

}