const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");
const { adminJWTValidator } = require("../middleware/adminJWTValidator");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      
      cb(null, 'CSVFOLDER')
    },
    filename: function (req, file, cb) {
      
      if(file.mimetype.slice(5) == 'csv'){
        cb(null,'CSVFILE.'+file.mimetype.slice(6))}
      
        else{
          return resizeBy.status(400).json({
            success : false,
            message : "Invalid file format",
          });
        }
       
           
    }
  })


const upload = multer({ storage: storage });
router.post('/csv_upload',upload.single('CSV'), adminJWTValidator,uploadController.uploads);



module.exports = router;