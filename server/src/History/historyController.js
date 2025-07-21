const mongoose = require("mongoose");
const {
  TaskListModel,
  EmployeeTaskModel,
  VerifyTaskModel,
} = require("../Task/taskSchema");
const AddUserModel = require("../User/AddUserSchema");

const getHistory = async (req, res) => {
  console.log("GetHistory API called!!!!!!!!");
  const employeeID = req.query.employeeID;
  try {
    // Step 1: Find employee's task IDs
    const employeeData = await EmployeeTaskModel.findOne({
      assignedTo: employeeID,
    });
    if (
      !employeeData ||
      !employeeData.taskID ||
      employeeData.taskID.length === 0
    ) {
      return []; // no tasks assigned
    }

    const taskIDs = employeeData.taskID;

    // Step 2: Aggregate from TaskListModel
    const tasks = await TaskListModel.aggregate([
      {
        $match: {
          _id: { $in: taskIDs },
          completedOn: { $ne: null }, // Match only the tasks assigned to employee
        },
      },
      {
        $lookup: {
          from: "verifytaskmodels", // collection name in lowercase (MongoDB auto-pluralizes)
          localField: "_id",
          foreignField: "taskID",
          as: "verifyInfo",
        },
      },
      {
        $unwind: {
          path: "$verifyInfo",
          preserveNullAndEmptyArrays: true, // In case link is not yet added
        },
      },
      {
        $project: {
          taskTitle: 1,
          taskDesc: 1,
          keyList: 1,
          assignedBy: 1,
          completedOn: 1,
          verifiedOn: 1,
          link: "$verifyInfo.link",
        },
      },
    ]);

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

//GET MANAGER HISTORY DATA
const getManagerHistory = async (req, res) => {
  const { managerID } = req.query;
  try {
    console.log("getHistory of manager called ", managerID);
    if (!managerID)
      return res.status(400).json({ message: "managerID required" });

    //Fetch verified tasks assigned by this manager
    const tasks = await TaskListModel.find({
      "assignedBy.MuserID": managerID,
      verifiedOn: { $ne: null },
    }).lean();

    if (!tasks.length) return res.json([]);

    // Get all taskIDs
    const taskIDs = tasks.map((t) => t._id);

    // Find employee assignments for these tasks
    const emplAssignments = await EmployeeTaskModel.find({
      taskID: { $in: taskIDs },
    }).lean();

    // Map taskID → employeeID
    const taskEmployeeMap = {};
    emplAssignments.forEach((assign) => {
      // Each EmplTask has taskID[] array, so map all
      assign.taskID.forEach((tid) => {
        taskEmployeeMap[tid.toString()] = assign.assignedTo; // employeeID
      });
    });

    // Find all employee IDs
    const employeeIDs = Object.values(taskEmployeeMap);

    //Fetch employee names
    const employees = await AddUserModel.find(
      { userID: { $in: employeeIDs } },
      { userID: 1, name: 1 }
    ).lean();

    const employeeMap = {};
    employees.forEach((emp) => {
      employeeMap[emp.userID] = emp.name;
    });

    //Fetch VerifyTask to get links
    const verifyLinks = await VerifyTaskModel.find({
      taskID: { $in: taskIDs },
    }).lean();

    const linkMap = {};
    verifyLinks.forEach((v) => {
      linkMap[v.taskID.toString()] = v.link || "";
    });

    //Merge everything
    const finalData = tasks.map((task) => {
      const tid = task._id.toString();
      const employeeID = taskEmployeeMap[tid];
      const employeeName = employeeMap[employeeID] || "Unknown Employee";

      return {
        taskTitle: task.taskTitle,
        taskDesc: task.taskDesc,
        keyList: task.keyList,
        completedOn: task.completedOn,
        completedBy: employeeName,
        verifiedOn: task.verifiedOn,
        link: linkMap[tid] || "",
      };
    });

    res.json(finalData);
  } catch (error) {
    console.log("Error at getManagerHistory = ", error);
  }
};

module.exports = { getHistory, getManagerHistory };
