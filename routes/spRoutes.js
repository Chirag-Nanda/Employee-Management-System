const express = require("express");
const router = express.Router();
const spController = require("../controller/spController");
const {jwtValidator} = require("../middleware/jwtValidator");
const {adminJWTValidator} = require("../middleware/adminJWTValidator");
const {bodyValidator} = require("../middleware/bodyValidator");

router.post('/sp', bodyValidator(["name","email","address","adhar","phone","gender","age","dob"]), adminJWTValidator, spController.create);
router.get('/sp', adminJWTValidator, spController.fetchData);
router.get('/sp/:id', jwtValidator, spController.fetchById);
router.put('/sp/:id', jwtValidator, spController.update);
router.delete('/sp/:id', adminJWTValidator, spController.delete);

module.exports =router;
