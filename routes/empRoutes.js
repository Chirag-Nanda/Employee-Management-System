
/**
 * @swagger
 * tags: API ROUTES
 * description: Routes for API
 * /api/emp/{id}:
 *   put:
 *     summary: Update employee's data whose ID is given
 *     tags: [Employee]
 *     requestBody:
 *           required: true
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The employee's ID
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
 *     responses:
 *        200:
 *          description: The details of the employee are updated whose ID is given.
 *        500:
 *          description: Some server error.  
 *   delete:
 *     summary: Delete employee's data whose ID is given
 *     tags: [Employee]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The employee's ID
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: The CEO's JWT Token 
 *     responses:
 *        200:
 *          description: The employee whose ID is given is deleted.
 *        500:
 *          description: Some server error.   
 */


const express = require("express");
const empController = require("../controller/empController");
const router = express.Router();
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");

router.put('/emp/:id', jwtValidator,empController.update);
router.delete('/emp/:id', adminJWTValidator, empController.delete);

module.exports =router;
