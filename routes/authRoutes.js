const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {bodyValidator} = require("../middleware/bodyValidator"); // the import function works slower

router.get('/login', bodyValidator(["email","password"]), authController.login); //bodyvalidator works as a middleware here

router.post('/register', bodyValidator(["name","email","password","address","adhar","phone","gender","age","dob"]), authController.create);



 


module.exports = router