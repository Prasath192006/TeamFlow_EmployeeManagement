const express = require("express");

const multer = require("multer");
const router = express.Router();
const { addUser,isemailexist,isuseridexist,validateLogIn } = require("./UserController");


//multer
const Storage = multer.memoryStorage();
const upload = multer({storage:Storage})


router.post("/AddUser",upload.single("image"),addUser)
router.get("/isemailexist",isemailexist)
router.get("/isuseridexist",isuseridexist)
router.get("/",validateLogIn)

module.exports =router;