


/**
 * @swagger
 * tags: API ROUTES
 * description: Routes for API
 * /api/sp:
 *   post:
 *     summary: Create a new supervisor
 *     tags: [Supervisor]
 *     requestBody:
 *       required: true
 *     parameters:
 *           - in: headers
 *             name: Authorization
 *             schema:
 *                type: string
 *             description: The CEO's JWT Token  
 *           - in: body
 *             schema:
 *                type: object
 *                properties:
 *                     name:
 *                        type: string
 *                     email:
 *                        type: string
 *                     address:
 *                        type: string
 *                     adhar:
 *                        type: integer
 *                     phone:
 *                        type: integer
 *                     gender:
 *                        type: string
 *                     age:
 *                        type: string
 *                     dob:
 *                        type: string          
 *     responses:
 *       200:
 *         description: The supervisor is created.
 *       500:
 *         description: Some server error.
 *    
 *   get:
 *     summary: List supervisors
 *     tags: [Supervisor]
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
 *          description: The list of supervisors.
 *        500:
 *          description: Some server error.
 * /api/sp/{id}:
 *   get:
 *     summary: Get supervisor's data whose ID is given
 *     tags: [Supervisor]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The supervisor's ID
 *     responses:
 *        200:
 *          description: The details of the supervisor whose ID is given.
 *        500:
 *          description: Some server error.
 *   put:
 *     summary: Update supervisor's data whose ID is given
 *     tags: [Supervisor]
 *     requestBody:
 *           required: true
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The supervisor's ID
 *         - in: body
 *           schema:
 *              type: object
 *              properties:
 *                   name:
 *                      type: string
 *                   email:
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
 *     responses:
 *        200:
 *          description: The details of the supervisor are updated whose ID is given.
 *        500:
 *          description: Some server error.  
 *   delete:
 *     summary: Delete supervisor's data whose ID is given
 *     tags: [Supervisor]
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The supervisor's ID
 *         - in: headers
 *           name: Authorization
 *           schema:
 *             type: string
 *           description: The CEO's JWT Token 
 *     responses:
 *        200:
 *          description: The supervisor whose ID is given is deleted.
 *        500:
 *          description: Some server error.   
 */




const express = require("express");
const router = express.Router();
const spController = require("../controller/spController");
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");
const {bodyValidator} = require("../middleware/bodyValidator");
const multer = require("multer");
const { spJWTValidator } = require("../middleware/spJWTValidator");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets')
    },
    filename: function (req, file, cb) {
      if(file.mimetype.slice(6) == 'jpeg'||file.mimetype.slice(6) == 'jpg'||file.mimetype.slice(6) == 'png'){
        cb(null, file.fieldname + '-' + 'sp'+'-'+req.params.id+ '.'+file.mimetype.slice(6))}
      
        else{
          return resizeBy.status(400).json({
            success : false,
            message : "Invalid file format",
          });
        }
         
      
    }
  })
  
const upload = multer({ storage: storage });

router.post('/sp', bodyValidator(["name","email","address","adhar","phone","gender","age","dob"]), adminJWTValidator, spController.create);
router.get('/sp', adminJWTValidator, spController.fetchData);
router.get('/sp/:id',jwtValidator, spController.fetchById);
router.put('/sp/:id', jwtValidator, spController.update);
router.post('/sp/uploads/:id',spJWTValidator, upload.single('Profile_photo'),  spController.updatePhoto);
router.delete('/sp/:id',adminJWTValidator, spController.delete);

module.exports =router;
