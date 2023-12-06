const mongoose = require("mongoose")
function dbConnect(){
    try{
        mongoose.connect("mongodb+srv://Chirag:Chirag@cluster0.mfqmivu.mongodb.net/employeeManagement");// always use the compass connection string and add the name of database after the last slash 
        
        console.log("mongodb connected")
    }catch(err){
        
        console.error("mongodb connection failed------",err)
    }
    
}

module.exports= dbConnect