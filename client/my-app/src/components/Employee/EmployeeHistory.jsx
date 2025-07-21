import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Typography,
  Container,
  Paper,
  Box,
  Button,
  Collapse,
  Link,
  CircularProgress,
} from "@mui/material";
import axios from "axios"; 

const EmployeeHistory = () => {
  const [verifiedData, setVerifiedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = JSON.parse(sessionStorage.getItem("data")).userID;

        const response = await axios.get(
          "https://teamflow-employeemanagement.onrender.com/api/history/HistoryData",
          { params: { employeeID: id } }
        );
        setVerifiedData(response.data);
      } catch (error) {
        console.error("Error fetching verified tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4"
        textAlign="center"
        sx={{ marginTop: 3, marginBottom: 2 }}>
        Work History
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : verifiedData.length > 0 ? (
        verifiedData.map((task, index) => {
          const isExpanded = expandedId === index;

          return (
            <Paper
              key={index + 1}
              elevation={8}
              sx={{
                margin: { xs: "4vw", md: "0vw -5.5vw 2vw -5.5vw" },
                borderRadius: "8px",
                backgroundColor: "rgb(243 248 253)",
                color: "#061523",
                padding: { xs: 2, md: 4 },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                  
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {task.taskTitle}
                  </Typography>
                  <Typography variant="subtitle1">
                    Verified by:{" "}
                    {task.verifiedOn != null
                      ? task.assignedBy.Mname
                      : "Verification Pending"}
                  </Typography>
                  <Typography variant="subtitle1">
                    Verified on:{" "}
                    {task.verifiedOn
                      ? dayjs(task.verifiedOn).format("DD-MM-YYYY HH:mm")
                      : "Verification Pending"}
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={() => handleToggle(index)}>
                  {isExpanded ? "View Less" : "View More"}
                </Button>
              </Box>

              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box mt={2}>
                  <Typography>Description: {task.taskDesc}</Typography>
                  <Typography variant="subtitle1">Key List:</Typography>
                  <ul>
                    {task.keyList.map((item, index) => (
                      <li key={index}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>

                  <Typography>
                    Link:{" "}
                    <Link
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Work
                    </Link>
                  </Typography>
                  <Typography>
                    Completed On:{" "}
                    {dayjs(task.completedOn).format("DD-MM-YYYY HH:mm")}
                  </Typography>
                </Box>
              </Collapse>
            </Paper>
          );
        })
      ) : (
        <Typography>No verified tasks available.</Typography>
      )}
    </Container>
  );
};

export default EmployeeHistory;
