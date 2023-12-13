const express = require("express");
const router = express.Router();
const empTaskController = require("../controller/empTaskController");
const {bodyValidator} = require("../middleware/bodyValidator");
const {spJWTValidator} = require("../middleware/spJWTValidator");
router.post("/task", bodyValidator(["name","department","task"]), spJWTValidator, empTaskController.assign);
router.put("/task/:id", bodyValidator(["name", "department", "task"]), spJWTValidator, empTaskController.update);
router.delete("/task/:id",  spJWTValidator, empTaskController.delete);


module.exports = router;