const express = require("express");

const multer = require("multer");
const router = express.Router();
const { addUser } = require("./AddUserController");


//multer
const Storage = multer.memoryStorage();
const upload = multer({storage:Storage})


router.post("/AddUser",upload.single("image"),addUser)

module.exports =router;