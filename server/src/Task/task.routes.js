const express = require("express")

const router = express.Router();

const {assignTask,getTask,employeeStatus,verifyTask,getVerificationStatus,getTaskDetails} = require("./taskController.js")

router.post("/assignTask",assignTask)
router.get("/getTask",getTask)
router.get("/employeeStatus",employeeStatus)
router.post("/verifyTask",verifyTask)
router.get("/VerificationStatus",getVerificationStatus)
router.get("/TaskDetails",getTaskDetails)

module.exports = router;