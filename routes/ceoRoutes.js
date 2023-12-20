
/**
 * @swagger
 * tags: API ROUTES
 * description: Routes for API
 * /api/ceo:
 *    post:
 *      summary: Create a new ceo
 *      tags: [CEO]
 *      requestBody:
 *        required: true
 *      parameters:
 *          - in: headers
 *            name: Authorization
 *            schema:
 *               type: string
 *            description: CEO's json web token        
 *          - in: body
 *            schema:
 *               type: object
 *               required:
 *                  - name
 *                  - email
 *                  - address
 *                  - adhar
 *                  - phone
 *                  - gender
 *                  - age
 *                  - dob
 *               properties:
 *                    name:
 *                       type: string
 *                    email:
 *                       type: string
 *                    address:
 *                       type: string
 *                    adhar:
 *                       type: integer
 *                    phone:
 *                       type: integer
 *                    gender:
 *                       type: string
 *                    age:
 *                       type: string
 *                    dob:
 *                       type: string         
 *      responses:
 *        200:
 *          description: The CEO is created.
 *        500:
 *          description: Some server error.
 *     
 * /api/ceo/{id}:
 *    put:
 *      summary: Update ceo's data whose ID is given
 *      tags: [CEO]
 *      requestBody:
 *            required: true
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: CEO's ID
 *          - in: headers
 *            name: Authorization
 *            schema:
 *               type: string
 *            description: CEO's json web token
 *          - in: body
 *            schema:
 *               type: object
 *               properties:
 *                    name:
 *                       type: string
 *                    email:
 *                       type: string
 *                    address:
 *                       type: string
 *                    adhar:
 *                       type: integer
 *                    phone:
 *                       type: integer
 *                    gender:
 *                       type: string
 *                    age:
 *                       type: string
 *                    dob:
 *                       type: string    
 *      responses:
 *         200:
 *           description: The CEO's data updated
 *         500:
 *           description: Some server error.  
 *    delete:
 *      summary: Delete ceo's data whose ID is given
 *      tags: [CEO]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            description: The CEO's ID
 *          - in: headers
 *            name: Authorization
 *            schema:
 *               type: string
 *            description: CEO's json web token
 *      responses:
 *         200:
 *           description: The CEO's data deleted.
 *         500:
 *           description: Some server error.   
 */


const express = require("express");
const router = express.Router();
const ceoController = require("../controller/ceoController");
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");
const {bodyValidator} = require("../middleware/bodyValidator");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets')
    },
    filename: function (req, file, cb) {
        if(file.mimetype.slice(6) == 'jpeg'||file.mimetype.slice(6) == 'jpg'||file.mimetype.slice(6) == 'png'){
            cb(null, file.fieldname + '-' + 'ceo'+'-'+req.params.id+ '.'+file.mimetype.slice(6))}
          
            else{
              return resizeBy.status(400).json({
                success : false,
                message : "Invalid file format",
              });
            }
               
    }
  })
  
const upload = multer({ storage: storage });


router.post('/ceo', bodyValidator(["name","email","address","adhar","phone","gender","age","dob"]), adminJWTValidator, ceoController.create);
router.put('/ceo/:id', adminJWTValidator, ceoController.update);
router.post('/ceo/uploads/:id',adminJWTValidator,upload.single('Profile_photo'), ceoController.updatePhoto);
router.delete('/ceo/:id', adminJWTValidator, ceoController.delete);

module.exports =router;
