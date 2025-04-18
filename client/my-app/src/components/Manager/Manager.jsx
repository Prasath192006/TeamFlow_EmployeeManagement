import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { Tempdata } from "../../App.jsx";
import BackDrop from "../BackDrop.jsx";
import {
  Avatar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";

export default function Manager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageEMP, setPageEMP] = useState(0);
  const [rowsPerPageEMP, setRowsPerPageEMP] = useState(5);
  const navigate = useNavigate();

  const { userID } = useParams();

  //loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("employeeStats")) {
      setLoading(true);
    }
  }, []);

  const userData = JSON.parse(sessionStorage.getItem("data"));
  if (!userData) {
    console.log(userID, "sds");
    return <Typography>User not found.</Typography>;
  }
  const [completedTasks, setCompletedTasks] = useState(
    Tempdata.filter(
      (empl) => empl.TaskStatus === "Completed" && empl.task !== "nil"
    )
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePageEMP = (event, newPage) => setPageEMP(newPage);
  const handleChangeRowsPerPageEMP = (event) => {
    setRowsPerPageEMP(parseInt(event.target.value, 10));
    setPageEMP(0);
  };

  const verifyBtn = (currUser) => {
    setCompletedTasks((prevTasks) =>
      prevTasks
        .map((empl) =>
          empl.userid === currUser.userid ? { ...empl, task: "nil" } : empl
        )
        .filter((empl) => empl.task !== "nil")
    );
  };

  //server

  const [serverData, setserverData] = useState(() => {
    const storedData = sessionStorage.getItem("employeeStats");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [verificationData, setverificationData] = useState([]);

   const getVerficationStatus = async()=>{
    try{
      const res = await axios.get("http://localhost:5000/api/task/VerificationStatus")
      .then((res)=>{
        setverificationData(res.data)
      })

    }catch(err){ 
      console.log("Error in getting verfication status",err);

    }
   }

    const fetchEmployeeStatus = async () => {
      try {
        console.log("inside fetchEmployeeStatus");
        const res = await axios.get(
          "http://localhost:5000/api/task/employeeStatus"
        );
        setLoading(false);
        if (res.data?.data) {
          const newData = res.data.data;
          const existingData = sessionStorage.getItem("employeeStats");
          const parsedExistingData = existingData
            ? JSON.parse(existingData)
            : [];

          if (JSON.stringify(newData) !== JSON.stringify(parsedExistingData)) {
            console.log("inside if");
            sessionStorage.setItem("employeeStats", JSON.stringify(newData));
            
            setserverData(newData);
          }
        } else {
          console.warn("No valid data received from API");
        }
      } catch (err) {
        console.error("Error in getting employee status:", err);
      }
    };

  useEffect(() => {
    fetchEmployeeStatus();
    getVerficationStatus(); // Call on component mount
  }, []);

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        bgcolor: "#01123eeb",
        color: "aliceblue",
        minHeight: "100vh",
        pb: "10rem",
        mb: "-2rem",
      }}
    >
      <BackDrop open={loading} />
      <Grid
        container
        spacing={2}
        sx={{ p: { xs: 2, md: 4 }, mt: 0, border: "1px solid white" }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="img"
            src={userData.image}
            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">
            {userData.name.toUpperCase()}
          </Typography>
          <Typography variant="h6">Role: {userData.role}</Typography>
          <Typography variant="h6">ID: {userData.userID}</Typography>
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            Address: {userData.address}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("AddEmployee")}
            >
              ADD EMPLOYEE
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("AssignTask")}
            >
              Assign Task
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{ my: { xs: 3, md: 5 }, fontFamily: '"Sansita", serif' }}
      >
        Task Verification
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", mx: "auto", mb: 4, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sno",
                "Name",
                "Task",
                "Assigned ON",
                "Completed Time",
                "Check",
              ].map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: { xs: "10px", md: "14px" },
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {verificationData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((empl, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{empl.emplName}</TableCell>
                  <TableCell align="center">{empl.taskDescription}</TableCell>
                  <TableCell align="center">{empl.assignedDate}</TableCell>
                  <TableCell align="center">{empl.completedOn}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => navigate("CheckTask", { state: { taskID: empl.taskID , Link :empl.link } })}
                      >
                      CHECK
                    </Button>
                  </TableCell>
                  {/* <TableCell align="center">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => verifyBtn(empl)}
                    >
                      VERIFIED
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={verificationData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{ my: { xs: 3, md: 7 }, fontFamily: '"Sansita", serif' }}
      >
        Employee Status
      </Typography>

      {/* ------------------------#######################__________________________######################## */}

      <TableContainer
        component={Paper}
        sx={{ width: "95%", mx: "auto", mb: 4, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sno",
                "Name",
                "UserID",
                "Role",
                "Current Task",
                "Due Date",
                "Status",
              ].map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: { xs: "10px", md: "14px" },
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {serverData
              .flatMap((empl, index) =>
                empl.tasks.length > 0
                  ? empl.tasks.map((task, taskIndex) => ({
                      userID: empl.userID,
                      name: empl.name,
                      role: empl.role,
                      logStatus: empl.logStatus,
                      task,
                      index,
                      taskIndex,
                      taskCount: empl.tasks.length,
                    }))
                  : [
                      {
                        userID: empl.userID,
                        name: empl.name,
                        role: empl.role,
                        logStatus: empl.logStatus,
                        task: null, // No task case
                        index,
                        taskIndex: 0,
                        taskCount: 1,
                      },
                    ]
              )
              .slice(
                pageEMP * rowsPerPageEMP,
                pageEMP * rowsPerPageEMP + rowsPerPageEMP
              ) // ✅ Apply pagination correctly
              .map(
                ({
                  userID,
                  name,
                  role,
                  logStatus,
                  task,
                  index,
                  taskIndex,
                  taskCount,
                }) => (
                  <TableRow key={`${userID}-${taskIndex}`}>
                    {taskIndex === 0 && (
                      <>
                        <TableCell align="center" rowSpan={taskCount}>
                          {pageEMP * rowsPerPageEMP + index + 1}
                        </TableCell>
                        <TableCell align="center" rowSpan={taskCount}>
                          {name}
                        </TableCell>
                        <TableCell align="center" rowSpan={taskCount}>
                          {userID}
                        </TableCell>
                        <TableCell align="center" rowSpan={taskCount}>
                          {role}
                        </TableCell>
                      </>
                    )}

                    {/* Task Column */}
                    <TableCell align="center">
                      {task ? task.taskTitle : "No Tasks Assigned"}
                    </TableCell>
                    <TableCell align="center">
                      {task?.dueDate
                        ? dayjs(task.dueDate).format("DD-MM-YYYY")
                        : "N/A"}
                    </TableCell>

                    {taskIndex === 0 && (
                      <TableCell
                        align="center"
                        rowSpan={taskCount}
                        sx={{ color: logStatus === "Active" ? "green" : "red" }}
                      >
                        {logStatus}
                      </TableCell>
                    )}
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left-side Button */}
          <Button
            variant="contained"
            sx={{ cursor: "pointer" ,m:" 1vw 0 1vw 2vw" }}
            onClick={() => {
              fetchEmployeeStatus()
              alert("clicked");

            }}
          >
            Refresh
          </Button>

          {/* Right-side Pagination */}
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 20]}
            component="div"
            count={serverData.reduce(
              (total, empl) => total + (empl.tasks.length || 1),
              0
            )}
            rowsPerPage={rowsPerPageEMP}
            page={pageEMP}
            onPageChange={handleChangePageEMP}
            onRowsPerPageChange={handleChangeRowsPerPageEMP}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}
