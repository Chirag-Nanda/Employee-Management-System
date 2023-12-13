const deptModel = require("../model/departmentModel");
const employeeModel = require("../model/employeeModel");
module.exports = {
    
    create : async (req,res)=>{
       const name = req.body.name;
       const supervisor = req.body.supervisor;
       const employees = req.body.employees;
       

       const alrDepartMent = await deptModel.findOne({name : name});
       
       if(alrDepartMent){
        return res.status(400).json({
          success : false,
          message : "department already exists",
        })
       }

       const department = new deptModel();
       department.name =name;
       department.supervisor =supervisor;
       department.employees =employees;

       console.log(employId);

       try{
         await department.save();

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
      
        let tempId=req.params; 

        try {
            let allData = await deptModel.findOne({_id : tempId});
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
        
        let id = req.params;

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
      

        let id = req.params;

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

}