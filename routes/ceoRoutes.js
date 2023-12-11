const express = require("express");
const router = express.Router();
const ceoController = require("../controller/ceoController");
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");
const {bodyValidator} = require("../middleware/bodyValidator");

router.post('/ceo', bodyValidator(["name","email","address","adhar","phone","gender","age","dob"]), adminJWTValidator, ceoController.create);
router.put('/ceo/:id', jwtValidator, ceoController.update);
router.delete('/ceo/:id', adminJWTValidator, ceoController.delete);

module.exports =router;
