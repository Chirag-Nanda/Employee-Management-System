/**
 * @swagger
 * tags: API ROUTES
 * description: Routes for API
 * /api/dept:
 *   post:
 *     summary: Create a new department.
 *     tags: [Department]
 *     parameters:
 *           - in: headers
 *             name: Authorization
 *             schema:
 *                type: string
 *             description: The CEO's JWT Token
 *           - in: body
 *             schema:
 *               type: object
 *               required:
 *                   - name
 *                   - supervisor
 *                   - employees
 *               properties:
 *                   name:
 *                     type: string
 *                   supervisor:
 *                     type: string
 *                   employees:
 *                     type: array
 *                     items:
 *                       properties:
 *                        employee:
 *                            type: string
 *                  
 *     responses:
 *       200:
 *         description: The department is created.
 *       500:
 *         description: Some server error.
 *    
 *   get:
 *     summary: List of Departments
 *     tags: [Department]
 *     parameters:
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The limit of items to be displayed
 *         - in: query
 *           name: pagenumber
 *           schema:
 *             type: integer
 *           description: The pagenumber
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: the json web token of the CEO  
 *     responses:
 *        200:
 *          description: The list of departments.
 *        500:
 *          description: Some server error.
 * /api/dept/{id}:
 *   put:
 *     summary: Update department's data whose ID is given
 *     tags: [Department]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The department's ID
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: the json web token of the CEO
 *         - in: body
 *           schema:
 *             type: object
 *             required:
 *                 - name
 *                 - supervisor
 *                 - employees
 *             properties:
 *                 name:
 *                   type: string
 *                 supervisor:
 *                   type: string
 *                 employees:
 *                    type: array
 *                    items:
 *                      properties:
 *                       employee:
 *                           type: string 
 *     responses:
 *        200:
 *          description: The details of the department are updated whose ID is given.
 *        500:
 *          description: Some server error.  
 *   delete:
 *     summary: Delete department's data whose ID is given
 *     tags: [Department]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The department's ID
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: The Json web token of the ceo
 *     responses:
 *        200:
 *          description: The department whose ID is given is deleted.
 *        500:
 *          description: Some server error.   
 */
const express = require("express");
const router = express.Router();
const {adminJWTValidator} = require("../middleware/adminJWTValidator");
const deptController = require("../controller/deptController");
const { bodyValidator } = require("../middleware/bodyValidator");
router.post('/dept', bodyValidator(["name", "supervisor","employees"]),adminJWTValidator , deptController.create);
router.get('/dept',adminJWTValidator,deptController.read);
router.put('/dept/:id',adminJWTValidator, deptController.update );
router.delete('/dept/:id', adminJWTValidator, deptController.delete);
module.exports = router;