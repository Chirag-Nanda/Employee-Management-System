const userModel= require("../model/userModel");
const supervisorModel = require("../model/supervisorModel");
const generator = require("generate-password");
const bcrypt = require('bcryptjs');
module.exports ={

    create : async (req,res)=>{
         
         let Name= req.body.name;
         let Email = req.body.email;
         let Pass = generator.generate({
            length: 10,
            numbers: true
        });
         
         let newUser =new userModel();
         newUser.name = Name;
         newUser.email = Email;
         newUser.password =bcrypt.hashSync(Pass, 12); 
         newUser.role ="sp";
         try {
           await newUser.save();
           const newSuperVisor = new supervisorModel({
            userId: newUser._id.toString().toUpperCase(),
            name: newUser.name,
            email: newUser.email,
            address: req.body.address,
            adhar: req.body.adhar,
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            dob: req.body.dob,
        });


        try {
            await newSuperVisor.save();

            return res.status(201).json({
                success: true,
                message: "User registered successfully",

            }); //important if we must stop the execution of the function defined  here
        } catch (err) {
            console.error(err);
            userModel.findByIdAndDelete(newUser._id);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err,
            });

        }

           
         }catch(err){
           return res.status(500).json({
            success : false,
            message : "Internal server error"
           })
         }
    },

    fetchData : async (req,res)=>{
        try {
            
            const pageNumber = parseInt(req.query.pageNumber)||1;
            let limit = parseInt(req.query.limit)||5;
            let startIndex = (pageNumber-1)*limit;
            let data ={};
            let allData =[];
            
            const emailUser = req.query.email||"";
            const nameUser = req.query.name||"";
            if(emailUser !=="" && nameUser !==""){
                allData = await supervisorModel.find({name: nameUser, email : emailUser}).limit(limit).skip(startIndex);}
            else if(emailUser !==""){
                allData = await supervisorModel.find({ email : emailUser}).limit(limit).skip(startIndex);
            } 
            else if(nameUser !== ""){
                allData = await supervisorModel.find({name : nameUser}).limit(limit).skip(startIndex);
            } 
            else{
                allData = await supervisorModel.find({name : nameUser}).limit(limit).skip(startIndex);
            }  
                data.contents=allData;
                data.noOfResults = limit;
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

    fetchById : async(req, res)=>{
        let tempId=req.params; 

        try {
            let allData = await supervisorModel.findOne({_id : tempId});
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

    update: async (req,res)=>{
        try {
            await supervisorModel.findByIdAndUpdate(req.params, req.body);
            return res.status(200).json({
                success : true,
                message : "Supervisor data updated",
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
            
            await supervisorModel.findByIdAndDelete(req.params);

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



}
