import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderCont from "../HeaderCont.jsx";
import {
  Avatar,
  Button,
  Paper,
  Box,
  Typography,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Footer from "../Footer.jsx";
import { Tempdata } from "../../App.jsx";
import Timer from "../Timer.jsx";

export default function Employee() {
  const userData = JSON.parse(sessionStorage.getItem("data"));

  // Track checklist state per task
  const [checkStatus, setCheckStatus] = useState({});
  // Track link input per task
  const [linkInputs, setLinkInputs] = useState({});
  // Server Data
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(sessionStorage.getItem("data"));
        if (!data || !data.userID) {
          console.error("No userID found in sessionStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/task/getTask",
          { params: { userID: data.userID } }
        );

        setServerData(response.data.serverData);

        // Initialize checklist state for each task
        const initialCheckStatus = {};
        const initialLinkInputs = {};
        response.data.serverData.forEach((task) => {
          initialCheckStatus[task.taskTitle] = task.keyList.reduce(
            (acc, key) => ({ ...acc, [key]: task.completedOn ? true : false }),
            {} 
          );
          initialLinkInputs[task.taskTitle] = ""; // Empty link initially
        });

        setCheckStatus(initialCheckStatus);
        setLinkInputs(initialLinkInputs);
        console.log(initialCheckStatus, initialLinkInputs);
      } catch (error) {
        console.error("Error in accessing Server...", error);
      }
    };

    fetchData();
  }, []);

  // Handle Checklist Change
  const checkHandler = (event, taskTitle) => {
    setCheckStatus((prevState) => ({
      ...prevState,
      [taskTitle]: {
        ...prevState[taskTitle],
        [event.target.name]: event.target.checked,
      },
    }));
  };

  // Handle Link Input Change
  const handleLinkChange = (event, taskTitle) => {
    setLinkInputs((prevState) => ({
      ...prevState,
      [taskTitle]: event.target.value,
    }));
  };

  // Check if all conditions are met for "Completed" button
  const isTaskComplete = (taskTitle, keyList) => {
    const allChecked =
      checkStatus[taskTitle] &&
      keyList.every((key) => checkStatus[taskTitle][key] === true);
    const linkProvided =
      linkInputs[taskTitle] && linkInputs[taskTitle].trim() !== "";
    return allChecked && linkProvided;
  };

  //Server

  const handleOnComplete = async(id,taskTitle,task) => {
    const data = {
      managerID:task.assignedBy.MuserID,
      taskID : task._id,
      emplDetails:{
             EmpName:userData.name,
             EmpID:userData.userID
      },
      link:linkInputs[task.taskTitle]
    }

    alert(JSON.stringify(data))

    await axios.post("http://localhost:5000/api/task/verifyTask",data)
    .then((res)=>{
      console.log(res.data.message);
    })
    .catch((err)=>{
      console.log("Error in handleOnComplete api call",err)
    })
  };
        
  return (
    <Box
      sx={{
        backgroundColor: "#01123eeb",
        color: "aliceblue",
        minHeight: "100vh",
      }}
    >
      <HeaderCont />

      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: { xs: 2, md: 4 },
          border: "1px solid aliceblue",
          mt: { xs: 0, md: 2 },
        }}
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
            src={userData.image}
            alt="Profile"
            
            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {userData.name.toUpperCase()}
          </Typography>
          <Typography variant="h6">Role: {userData.role}</Typography>
          <Typography variant="h6">ID: {userData.userID}</Typography>
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            Address:{userData.address}
          </Typography>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        TASKS
      </Typography>

      {serverData === null ? (
        <Typography variant="h6" align="center">
          Contact Your MANAGER
        </Typography>
      ) : (
        serverData.map((task) => (
          <Paper
            key={task.taskTitle}
            elevation={10}
            sx={{
              margin: { xs: "4vw", md: "5vw" },
              borderRadius: "8px",
              backgroundColor: "rgb(243 248 253)",
              color: "#061523",
              padding: { xs: 2, md: 4 },
            }}
          >
            <Grid container spacing={3}>
              {/* Task Details */}
              <Grid item xs={12} md={8}>
                {task.verifiedOn ? 
                  <Typography
                 sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  color:"#01123eeb",
                  disabled:true
                }}>
                  Verification Status:
                  </Typography>
                 :""}
              
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    fontWeight: "bold",
                  }}
                >
                  {task.taskTitle}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  <strong>Description:</strong> {task.taskDesc}
                </Typography>

                <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                  <strong>Checklist:</strong>
                </Typography>
                <Box
                  component="ol"
                  sx={{ paddingLeft: 2, listStyle: "none", marginTop: 1 }}
                >
                  {task.keyList.map((op) => (
                    <li key={op}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={op}
                            checked={checkStatus[task.taskTitle]?.[op] || false}
                            onChange={(e) => checkHandler(e, task.taskTitle)}
                          />
                        }
                        label={<Typography variant="body2">{op}</Typography>}
                      />
                    </li>
                  ))}
                </Box>
              </Grid>

              {/* Days Left Section */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="subtitle1">Days Left:</Typography>
                  <Timer due={task.dueDate} />
                </Box>
              </Grid>

              {/* Link Input */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Link:
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="e.g., GitHub repo"
                  size="small"
                  sx={{ width: "350px" }}
                  value={linkInputs[task.taskTitle] || ""}
                  onChange={(e) => handleLinkChange(e, task.taskTitle)}
                  disabled={task.completedOn ? true : false}
                />
              
              </Grid>
                <Typography
                  
                  textAlign="center"
                  sx={{ marginTop: 4, marginLeft:3, 
                    fontWeight: "bold", }}
                >
                  Assigned By:{task.assignedBy.Mname} [{task.assignedBy.MuserID}]
                </Typography>

              {/* Complete Button */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  variant="contained"
                  disabled={!isTaskComplete(task.taskTitle, task.keyList) || task.completedOn ? true : false}
                  sx={{ width: { xs: "80vw", sm: "60vw", md: "40vw" } }}
                  id={task.taskTitle}
                  onClick={() => handleOnComplete(task._id,task.taskTitle,task)}
                >
                  Completed
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}

      <Footer />
    </Box>
  );
}
