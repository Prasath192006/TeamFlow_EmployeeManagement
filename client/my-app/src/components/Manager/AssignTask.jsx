import React, { useState, useEffect } from "react";
import HeaderCont from "../HeaderCont.jsx";
import Footer from "../Footer.jsx";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";

export default function AssignTask() {
  const [items, setItems] = useState([]);
  const [currItem, setCurrItem] = useState("");
  const [helperTxt, setHelperTxt] = useState(false);
  const [empid, setEmpid] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, "day"));

  const [validateUserID, setvalidateUserID] = useState({
    helpertxt: false,
    helpertxtMsg: "",
    helpertxterr: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      empid.trim() !== "" &&
        taskTitle.trim() !== "" &&
        taskDesc.trim() !== "" &&
        items.length > 0 &&
        validateUserID.helpertxt && !validateUserID.helpertxterr
    );
  }, [empid, taskTitle, taskDesc, items, validateUserID.helpertxt,validateUserID.helpertxterr]);

  const addItem = () => {
    if (currItem.trim()) {
      setItems((prev) => [...prev, currItem]);
      setCurrItem("");
      setHelperTxt(false);
    } else {
      setHelperTxt(true);
    }
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };
  //server side code

  //validate the user id

  const isuseridexist = async () => {
    console.log("isuseridexist called");
    axios
      .get("http://localhost:5000/api/Log/isuseridexist", {
        params: { userid: empid },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isuseridexist) {
          setvalidateUserID((prev) => ({
            ...prev,
            helpertxtMsg: "Verified✅",
            helpertxt: true,
            helpertxterr: false,
          }));
        } else {
          setvalidateUserID((prev) => ({
            ...prev,
            helpertxtMsg: "User ID does not Exist",
            helpertxt: true,
            helpertxterr: true,
          }));
        }
        // seterrorMSG((prev) => ({ ...prev, useriderr: res.data.message }));
        // setformatverification((prev) => ({
        //   ...prev,
        //   verifyEmpID: true,
        // }));
      });
  };

  const assignTask = () => {
    const managerData = JSON.parse(localStorage.getItem("data"));
    const data = {
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      dueDate: selectedDate,
      keyList: items,
      assignedBy: { MuserID: managerData.userID, Mname: managerData.name },
      assignedTo: empid,
    };
    axios
      .post("http://localhost:5000/api/task/assignTask", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("AssignTask:", res.data);
      })
      .catch((err) => {
        console.log("Error in assignTask api", err);
      });
  };

  return (
    <Box sx={{ backgroundColor: "#01123eeb", minHeight: "100vh", pb: "13vh" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: "aliceblue",

          mb: { xs: "6vh", md: "4vh" },
          fontFamily: '"Sansita", serif',
          fontSize: "clamp(30px, 5vw, 45px)",
        }}
      >
        ASSIGN TASK
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mx: { xs: "5vw", md: "15vw" },
          p: { xs: "4vw", md: "5vw" },
          bgcolor: "rgb(243, 248, 253)",
          color: "#061523",
        }}
      >
        <form onSubmit={assignTask}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "8vw ", md: "4vw" },
              mb: { xs: "8vw ", md: "4vw" },
            }}
          >
            <TextField
              label="EMPLOYEE ID"
              placeholder="Enter Employee ID"
              value={empid}
              onBlur={isuseridexist}
              onChange={(e) => setEmpid(e.target.value)}
              sx={{
                width: {
                  xs: "100%",
                  md: "45%",
                  "& .MuiFormHelperText-root": {
                    color: validateUserID.helpertxterr?"":"#5CB338",
                  },
                },
              }}
              error={validateUserID.helpertxterr}
              helperText={
                validateUserID.helpertxt ? validateUserID.helpertxtMsg : ""
              }
             
            />
            <TextField
              label="Task Title"
              placeholder="Enter Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              sx={{ width: { xs: "100%", md: "50%" } }}
              required
            />
          </Box>

          <TextField
            label="Task Description"
            placeholder="Enter Detail Description"
            multiline
            maxRows={6}
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            sx={{ width: "100%", mb: { xs: "8vw ", md: "4vw" } }}
            required
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: "2vw",
              mb: { xs: "8vw ", md: "4vw" },
            }}
          >
            <TextField
              error={helperTxt}
              label="Enter Key Points"
              value={currItem}
              onChange={(e) => setCurrItem(e.target.value)}
              helperText={helperTxt ? "Please enter data" : ""}
              sx={{ width: { xs: "100%", sm: "70%" } }}
            />
            <Button
              variant="contained"
              onClick={addItem}
              sx={{ width: { xs: "100%", sm: "20vh" }, height: "5vh" }}
            >
              ADD
            </Button>
          </Box>

          {items.length > 0 && (
            <Box
              component="table"
              sx={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "1vw",
                mb: { xs: "8vw ", md: "4vw" },
              }}
            >
              <tbody>
                {items.map((item, index) => (
                  <Box component="tr" key={index} sx={{ width: "100%" }}>
                    <Box
                      component="td"
                      sx={{
                        padding: "10px",
                        width: "70%",
                        wordBreak: "break-word",
                      }}
                    >
                      {item}
                    </Box>
                    <Box component="td">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(index)}
                        sx={{
                          width: { xs: "100%", sm: "15vh" },
                          height: "4vh",
                        }}
                      >
                        REMOVE
                      </Button>
                    </Box>
                  </Box>
                ))}
              </tbody>
            </Box>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                gap: "1vw",
                mb: "4vh",
              }}
            >
              <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>
                Due Date:
              </Typography>
              <DateTimePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                sx={{ width: { xs: "100%", sm: "60%" } }}
                required
              />
            </Box>
          </LocalizationProvider>

          <Box sx={{ textAlign: "center", mt: "6vh" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!isFormValid}
              sx={{ width: { xs: "100%", sm: "30vw" }, py: "1vh" }}
            >
              ASSIGN
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
