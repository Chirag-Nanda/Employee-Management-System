const express = require("express");
const empController = require("../controller/empController");
const router = express.Router();
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");

router.put('/emp/:id', jwtValidator,empController.update);
router.delete('/emp/:id', adminJWTValidator, empController.delete);

module.exports =router;
