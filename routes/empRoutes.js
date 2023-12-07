const express = require("express");
const empController = require("../controller/empController");
const router = express.Router();

router.put('/emp/:id', empController.update);
router.delete('/emp/:id', empController.delete);


module.exports =router;
