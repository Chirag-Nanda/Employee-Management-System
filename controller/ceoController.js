const userModel= require("../model/userModel");
const ceoModel = require("../model/ceoModel");
const generator = require("generate-password");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Datauri = require("datauri");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_AUTHORIZATION
  })
module.exports ={

    create : async (req,res)=>{
         
         let Name= req.body.name;
         let Email = req.body.email;
         let Pass = generator.generate({
            length: 10,
            numbers: true
        });
        console.log(Pass);

        let oldCEOJWT = req.headers.authorization.slice(7);
        let jwtDecoded=jwt.verify(oldCEOJWT,  process.env.SECRET_KEY);
        console.log(jwtDecoded); 
         let newUser =new userModel();
         newUser.name = Name;
         newUser.email = Email;
         newUser.password =bcrypt.hashSync(Pass, 12); 
         newUser.role ="ceo";
         try {
           await newUser.save();
           const newCeo = new ceoModel({
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
            await newCeo.save();
             let oldCEO =await ceoModel.findOne({name : jwtDecoded.name});
             let oldUser = await userModel.findOne({name : jwtDecoded.name});
             //console.log(oldUser);
            await ceoModel.findByIdAndDelete(oldCEO._id);
            await userModel.findByIdAndDelete(oldUser._id);
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

    
    fetchById : async(req, res)=>{
       

        try {
            let allData = await ceoModel.findById(req.params.id);
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
            await ceoModel.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({
                success : true,
                message : "CEO data updated",
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    
    },

    updatePhoto : async(req,res)=>{
        const image = req.file;
        if(!image){
            return res.status(400).json({
                success: false,
                message: "No image",
            });
        }


            try {

                const newData = req.body;
                let dataURI = await Datauri(req.file.path);

                const cldRes = await cloudinary.uploader.upload(dataURI, {
                    resource_type: "auto",
                });
                console.log(cldRes);
                newData.image = cldRes.url;
                await ceoModel.findByIdAndUpdate(req.params.id, newData);
                
                
                return res.status(200).json({
                    success: true,
                    message: "CEO data updated",
                })

            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server error",
                })
            }
        
      

    
    },

    delete: async (req, res) => {
       
        try {
            
            await ceoModel.findByIdAndDelete(req.params.id);

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