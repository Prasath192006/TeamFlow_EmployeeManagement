const express = require("express");
const router = express.Router();

const {getHistory,getManagerHistory} = require("./historyController.js");

router.get("/HistoryData",getHistory);
router.get("/ManagerHistoryData",getManagerHistory)

module.exports = router;