const {
  TaskListModel,
  EmployeeTaskModel,
  VerifyTaskModel,
} = require("./taskSchema.js");
const AddUserModel = require("../User/AddUserSchema.js");
const mongoose = require("mongoose");
const  dayjs = require("dayjs");
// ASSIGNING TASK
const assignTask = async (req, res) => {
  console.log("Inside assignTask api");
  const { taskTitle, taskDesc, dueDate, assignedTo, assignedBy, keyList } =
    req.body;
  const taskList = await TaskListModel.create({
    taskTitle,
    taskDesc,
    keyList,
    dueDate,
    assignedBy,
  });
  const updateEmplTask = await EmployeeTaskModel.findOneAndUpdate(
    { assignedTo },
    { $push: { taskID: new mongoose.Types.ObjectId(taskList._id) } },
    { new: true, upsert: true }  
  );

  console.log("Updated empltask collection");
};

//GET TASK TO DISPLAY ON EMPLOYEE PAGE

const getTask = async (req, res) => {
  const { userID } = req.query;
  console.log("Inside GetTask api");

  const userTasks = await EmployeeTaskModel.aggregate([
    {
      $match: { assignedTo: userID },
    },
    {
      $lookup: {
        from: "TaskList",
        let: { task_ids: "$taskID" }, // taskID is an array or a single value
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$task_ids"] }, // match taskIDs
                  { $eq: ["$completedOn", null] }, // only where CompletedOn is null
                ],
              },
            },
          },
        ],
        as: "taskDetails",
      },
    },
    {
      $project: {
        _id: 0,
        assignedTo: 1,
        taskDetails: 1,
      },
    },
  ]);

  res.json({
    message: "Data Fetched successfully",
    serverData: userTasks[0].taskDetails,
  });
};

//ALL EMPLOYEE STATUS TO DISPLAY IN MANAGERS PAGE

const employeeStatus = async (req, res) => {
  try {
    // (Excluding Managers) from UserData
    const employees = await AddUserModel.find({
      role: { $nin: ["Manager", "CEO"] },
    });

    // Fetch task details for each employee
    const results = await Promise.all(
      employees.map(async (employee) => {
        // Find the employee's assigned tasks in EmplTask
        const assignedTask = await EmployeeTaskModel.findOne({
          assignedTo: employee.userID,
        });

        // If no tasks are found, return only user details
        if (!assignedTask || !assignedTask.taskID.length) {
          return {
            userID: employee.userID,
            name: employee.name,
            role: employee.role,
            logStatus: employee.logStatus || "Unknown",
            tasks: [{ taskTitle: "No Task Assigned", dueDate: "N/A" }],
          };
        }

        // Find all task details using $in operator (taskID is already ObjectId)
        const taskDetails = await TaskListModel.find({
          _id: { $in: assignedTask.taskID },
          verifiedOn: { $eq: null },
        });
        

        // Return user details with all assigned task details
        return {
          userID: employee.userID,
          name: employee.name,
          role: employee.role,
          logStatus: employee.logStatus || "Unknown",
          tasks:
            taskDetails.length > 0
              ? taskDetails.map((task) => ({
                  taskTitle: task.taskTitle,
                  dueDate:
                    dayjs(task.dueDate).format("DD-MM-YYYY HH:mm") || "N/A",
                }))
              : [{ taskTitle: "Task Not Assigned", dueDate: "N/A" }],
        };
      })
    );
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error at employeeStatus:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//ADD TASK TO VERIFY TASK MODEL
const TaskCompleted = async (req, res) => {
  console.log("inside verifyTask");
  const { managerID, taskID, emplDetails, link } = req.body;
  const newtaskID = new mongoose.Types.ObjectId(taskID);
  const today = new Date();
  try {
    //update TaskList
    const UpdatedData = await TaskListModel.findOneAndUpdate(
      { _id: newtaskID },
      { completedOn: today }
    );

    const storedData = await VerifyTaskModel.create({
      managerID,
      taskID: newtaskID,
      emplDetails,
      link,
    });

    res.status(200).json({ message: "Stored Successfully [verifyTask]" });
  } catch (err) {
    res
      .status(402)
      .json({ message: "Error in storing Data in VerifyTask [verifyTask]" });
  }
};

const getVerificationStatus = async (req, res) => {
  const { userID } = req.query;
  try {
    const verifyPendingData = await VerifyTaskModel.aggregate([
      {
        $match: {
          managerID: userID, // Match only the manager’s records
        },
      },
      {
        $lookup: {
          from: "TaskList", // collection name in MongoDB (lowercase + plural)
          localField: "taskID",
          foreignField: "_id",
          as: "taskInfo",
        },
      },
      {
        $unwind: "$taskInfo", // Flatten the taskInfo array
      },
      {
        $match: {
          "taskInfo.verifiedOn": null
        }
      },
      {
        $project: {
          _id: 0,
          emplName: "$emplDetails.EmpName",
          emplID: "$emplDetails.EmpID",
          taskDescription: "$taskInfo.taskDesc",
          taskID: "$taskID",
          link: "$link",
          assignedDate: "$taskInfo.createdAt",
          completedOn: "$taskInfo.completedOn",
        },
      },
    ]);

    res.status(200).json(verifyPendingData);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//GET TASKDETAILS FOR TASK VERIFICATION
const getTaskDetails = async (req, res) => {
  const taskID = new mongoose.Types.ObjectId(req.query.taskID);
  try {
    const TaskDetails = await TaskListModel.findById(
      taskID,
      "taskTitle taskDesc  keyList assignedBy"
    );
    res.status(200).json(TaskDetails);
  } catch (error) {
    console.error("Error fetching TaskDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTaskVerified = async (req, res) => {
  const taskID = new mongoose.Types.ObjectId(req.query.taskID);
  console.log("inside verifiedTask,");
  const today = new Date();
  try {
    const updatedData = await TaskListModel.findByIdAndUpdate(
      taskID,
      { verifiedOn: today },
      { new: true }
    );
    res.status(200);
  } catch (error) {
    console.error("Error Updating Verified Task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  assignTask,
  getTask,
  employeeStatus,
  TaskCompleted,
  getVerificationStatus,
  getTaskDetails,
  updateTaskVerified,
};
