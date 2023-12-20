
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
 * /api/emp/uploads: 
 *   post:
 *     summary: Upload employee's photo graph into the local server and updates the data in mongodb
 *        
 */


const express = require("express");
const empController = require("../controller/empController");
const router = express.Router();
const multer = require("multer");

const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      
      cb(null, 'assets')
    },
    filename: function (req, file, cb) {
      
      if(file.mimetype.slice(6) == 'jpeg'||file.mimetype.slice(6) == 'jpg'||file.mimetype.slice(6) == 'png'){
        cb(null, file.fieldname + '-' + 'emp'+'-'+req.params.id+ '.'+file.mimetype.slice(6))}
      
        else{
          return resizeBy.status(400).json({
            success : false,
            message : "Invalid file format",
          });
        }
       
           
    }
  })


const upload = multer({ storage: storage });

router.put('/emp/:id',jwtValidator,empController.update);
router.post('/emp/uploads/:id', jwtValidator,upload.single('Profile_photo'),empController.updatePhoto);

router.delete('/emp/:id', adminJWTValidator, empController.delete);

module.exports =router;
