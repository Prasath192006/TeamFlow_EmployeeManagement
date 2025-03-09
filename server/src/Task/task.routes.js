const express = require("express")

const router = express.Router();

const {createEmplTask} = require("./taskController.js")

router.get("/createEmplTask",createEmplTask)


module.exports = router;