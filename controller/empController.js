const employeeModel = require("../model/employeeModel");
const Datauri = require("datauri");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_AUTHORIZATION
  })

module.exports = {
    update: async (req,res)=>{
        try {
           
            await employeeModel.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({
                success : true,
                message : "Employee data updated",
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err,
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
                await employeeModel.findByIdAndUpdate(req.params.id, newData);
                
                
                return res.status(200).json({
                    success: true,
                    message: "Employee data updated",
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
            
            await employeeModel.findByIdAndDelete(req.params.id);

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