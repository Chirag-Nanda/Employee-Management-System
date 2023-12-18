
/**
 * @swagger
 * tags : AUTHROUTES
 * description: It contains the authentication routes
 * /auth/login:   
 *   get:
 *     summary: Gets the response to the login attempt
 *     tags: [Login]
 *     parameters:
 *         - in: body
 *           schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                   email:
 *                      type: string
 *                   password:
 *                      type: string
 *                   
 *     responses:
 *        200:
 *          description: Login successful.
 *        500:
 *          description: Some server error.
 * /auth/register:
 *   post:
 *     summary: Registering a new user
 *     tags: [Register]
 *     parameters:
 *         - in: body
 *           schema:
 *              type: object
 *              required:
 *                 - name
 *                 - email
 *                 - password
 *                 - address
 *                 - adhar
 *                 - phone
 *                 - gender
 *                 - age
 *                 - dob
 *              properties:
 *                   name:
 *                      type: string
 *                   email:
 *                      type: string
 *                   password:
 *                      type: string
 *                   address:
 *                      type: string
 *                   adhar:
 *                      type: integer
 *                   phone:
 *                      type: integer
 *                   gender:
 *                      type: string
 *                   age:
 *                      type: string
 *                   dob:
 *                      type: string
 *                
 *                   
 *     responses:
 *        200:
 *          description: The registration is successful.
 *        500:
 *          description: Some server error.
 *     
 */


const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {bodyValidator} = require("../middleware/bodyValidator"); // the import function works slower

router.get('/login', bodyValidator(["email","password"]), authController.login); //bodyvalidator works as a middleware here

router.post('/register', bodyValidator(["name","email","password","address","adhar","phone","gender","age","dob"]), authController.create);



 


module.exports = router