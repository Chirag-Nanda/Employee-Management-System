const userModel = require("../model/userModel");
const employeeModel = require("../model/employeeModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

module.exports = {
    create: async (req, res) => {

      
        const newUser = new userModel();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = bcrypt.hashSync(req.body.password, 12);
        
        const alreadyUser = await userModel.findOne({email: req.body.email});

        if(alreadyUser){
            return res.status(400).json({
                success : false,
                message : "User already exists",
            });
        }

        try {
            await newUser.save();


            const newEmployee = new employeeModel({
                userId: newUser._id.toString().toUpperCase(),
                name: newUser.name,
                email: newUser.email,
                address: req.body.address,
                adhar: req.body.adhar,
                phone: req.body.phone,
                gender: req.body.gender,
                age: req.body.age,
                dob: req.body.dob,
                deptID: req.body.deptID,
            });
            
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'quinten.morissette58@ethereal.email',
                    pass: 'EQGuX2wZvECevKXPx1'
                }
            });
              


            try {
                await newEmployee.save();
                const info = await transporter.sendMail({
                    from: 'test1@23.com', // sender address
                    to: req.body.email,
                    subject: "Registration successful", // Subject line
                    text: "Registration successful", // plain text body
                    
                  });
                
                  console.log("Message sent: %s", info.messageId);
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



            /*   return res.status(201).json({ 
                success : true,
                message : "User registered successfully",
                
               });*/ //important if we must stop the execution of the function defined  here
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err,
            });
        }
       
       



    },

    login : async (req, res) => {
        
            const userEmail = req.body.email;
        const userPass = req.body.password;

        
        try {
            const employee = await userModel.findOne({ email: userEmail });
            if (!employee) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                });
            }
            const hash = employee.password;
            const compareResult = bcrypt.compareSync(userPass, hash);
            if (compareResult === true) {
                let secret_key= process.env.SECRET_KEY;
                let tempEmployee = await employeeModel.findOne({email : userEmail});
                let tempUser = await userModel.findOne({name : employee.name});
                let data ={
                    name : employee.name,
                    email : employee.email,
                    role : tempUser.role
                }
                const jwtToken = jwt.sign(data, secret_key, {expiresIn : '1hr'});
                const newData = {
                    name: tempEmployee.name,
                    email: tempEmployee.email,
                    address: tempEmployee.address,
                    adhar: tempEmployee.adhar,
                    phone: tempEmployee.phone,
                    gender: tempEmployee.gender,
                    age: tempEmployee.age,
                    dob: tempEmployee.dob,
                    role: tempUser.role,
                };
               
                return res.status(202).json({
                    success: true,
                    message: "Login Successful",
                    token : jwtToken,
                    data : newData,
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Wrong password",
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err,
            });
        }
        
    },

   
}

