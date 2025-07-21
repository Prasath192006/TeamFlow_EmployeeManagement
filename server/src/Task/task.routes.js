const express = require("express")

const router = express.Router();

const {assignTask,getTask,employeeStatus,TaskCompleted,getVerificationStatus,getTaskDetails,updateTaskVerified} = require("./taskController.js")

router.post("/assignTask",assignTask)
router.get("/getTask",getTask)
router.get("/employeeStatus",employeeStatus)
router.post("/TaskCompleted",TaskCompleted)
router.get("/VerificationStatus",getVerificationStatus)
router.get("/TaskDetails",getTaskDetails)
router.get("/TaskVerified",updateTaskVerified)

module.exports = router;