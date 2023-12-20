const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const supervisorModel =require("../model/supervisorModel");
const csv = require("csvtojson");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
module.exports = {
 
    uploads: async(req,res)=>{
      const csvFilePath = "CSVFOLDER\CSVFILE.sv";
      
      const JsonArray= await csv().fromFile(csvFilePath);
      
      try{

      JsonArray.forEach(async (jsonObject)=>{
        
        console.log(jsonObject);
       

       if(jsonObject.DepartmentID != ""){
    
        const department = await departmentModel.findById(jsonObject.DepartmentID);
        console.log(department);
        if(department&&department.name == jsonObject.DepartmentName){
        
            if(jsonObject.Role == "sp"){
            
            const newSuper = new supervisorModel();
            newSuper.name= jsonObject.Name;
            newSuper.userId= jsonObject.userId;
            newSuper.email= jsonObject.Email;
            newSuper.address= jsonObject.Address;
            newSuper.adhar= jsonObject.Adhar;
            newSuper.phone= jsonObject.Phone;
            newSuper.gender= jsonObject.Gender;
            newSuper.age= jsonObject.Age;
            newSuper.dob= jsonObject.DOB;
            console.log("newsupervisor being created");
            
            await newSuper.save();
           
          

            //await departmentModel.findByIdAndUpdate(department._id, {supervisor : jsonObject.Name});
            
        }
        else if(jsonObject.Role == "emp"){
    
            const newEmp = new employeeModel();
            newEmp.name= jsonObject.Name;
            newEmp.userId= jsonObject.userId;
            newEmp.email= jsonObject.Email;
            newEmp.address= jsonObject.Address;
            newEmp.adhar= jsonObject.Adhar;
            newEmp.phone= jsonObject.Phone;
            newEmp.gender= jsonObject.Gender;
            newEmp.age= jsonObject.Age;
            newEmp.dob= jsonObject.DOB;
            newEmp.deptID= jsonObject.DepartmentID;
            console.log("new employee being created");
            

            await newEmp.save();
            console.log(newEmp);
             let deptemp = department.employees;
    
             deptemp.push(newEmp._id);

             await departmentModel.findByIdAndUpdate(department._id, {employees : deptemp});
             
            

        }
        }
    }

    else{

    if(jsonObject.DepartmentName !=""){
    if(Role == 'sp'){
          newEmp=[];
          const newDept = new departmentModel();
          newDept.name =jsonObject.DepartmentName;
          newDept.supervisor=jsonObject.Name;
          newDept.employees=newEmp;
          

          await newDept.save();
       
        
    }
    
    }
    }
    

    })
   
   res.status(200).json({
    success : true,
    message: "data is being inserted",
   })

}catch(err){
    return res.status(500).json({
        success : true,
        message: "Internal server error",
       })
    
}
      
    
    },

}
