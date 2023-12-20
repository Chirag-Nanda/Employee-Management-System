
/**
 * @swagger
 * tags: API ROUTES
 * description: Routes for API
 * /api/task:
 *   post:
 *     summary: Assign a new tak
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *     parameters:
 *           - in: headers
 *             name: Authorization
 *             schema:
 *                type: string
 *             description: The Supervisor's JWT Token 
 *           - in: body
 *             schema:
 *                type: object
 *                required: 
 *                   - name
 *                   - email
 *                   - password 
 *                properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string  
 *     responses:
 *       200:
 *         description: The task is assigned to the employee.
 *       500:
 *         description: Some server error.
 *    
 *   
 * /api/task/{id}:
 *   put:
 *     summary: Update task's data whose ID is given
 *     tags: [Task]
 *     requestBody:
 *           required: true
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The task's ID
 *         - in: body
 *           schema:
 *             type: object 
 *             properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string  
 *     responses:
 *        200:
 *          description: The details of the task are updated whose ID is given.
 *        500:
 *          description: Some server error.  
 *   delete:
 *     summary: Delete task's data whose ID is given
 *     tags: [Task]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The task's ID
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: The supervisor's JWT Token 
 *     responses:
 *        200:
 *          description: The task whose ID is given is deleted.
 *        500:
 *          description: Some server error.   
 */


const express = require("express");
const router = express.Router();
const empTaskController = require("../controller/empTaskController");
const {bodyValidator} = require("../middleware/bodyValidator");
const {spJWTValidator} = require("../middleware/spJWTValidator");
const { jwtValidator } = require("../middleware/jwtValidator");

router.post("/task", bodyValidator(["name", "employeeID","departmentID","task"]), spJWTValidator, empTaskController.assign);
router.put("/task/:id",  spJWTValidator, empTaskController.update);
router.get("/task/:empID", jwtValidator, empTaskController.fetch);
router.delete("/task/:id",  spJWTValidator, empTaskController.delete);


module.exports = router;