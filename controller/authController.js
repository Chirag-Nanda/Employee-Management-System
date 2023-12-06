const userModel = require("../model/userModel");
const employeeModel = require("../model/employeeModel");

const bcrypt = require('bcryptjs');
module.exports = {
    create: async (req, res) => {

        const newUser = new userModel();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = bcrypt.hashSync(req.body.password, 12);

        //newUser.role = req.body.role;



        try {
            await newUser.save();


            const newEmployee = new employeeModel({
                userId: newUser._id.toString(),
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
                await newEmployee.save();

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

    login: async (req, res) => {
        const userEmail = req.body.email;
        const userPass = req.body.password;

        if (!userEmail || !userPass) {
            if(!userEmail&&!userPass){
                return res.status(400).json({
                    success: false,
                    message: "Email and Password Missing"
                });
            }

            else if(!userEmail){
                return res.status(400).json({
                    success: false,
                    message: "Email Missing"
                });
            }

            else{
                return res.status(400).json({
                    success: false,
                    message: "Password Missing"
                });
            }

        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!userEmail.match(validRegex)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user email"
            });
        } 


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
                return res.status(202).json({
                    success: true,
                    message: "Login Successful",
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

