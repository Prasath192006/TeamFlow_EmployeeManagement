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

const ManagerHistory = () => {
  const [managerTasks, setManagerTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

 // Fetch manager history
  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const managerID = JSON.parse(sessionStorage.getItem("data")).userID;

        const response = await axios.get(
          "https://teamflow-employeemanagement.onrender.com/api/history/ManagerHistoryData",
          { params: { managerID } }
        );

        setManagerTasks(response.data);
      } catch (error) {
        console.error("Error fetching manager history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManagerData();
  }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        Assigned Task History
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : managerTasks.length > 0 ? (
        managerTasks.map((task, index) => {
          const isExpanded = expandedId === index;

          return (
            <Paper
              key={index}
              elevation={8}
              sx={{
                margin: { xs: "4vw", md: "0vw -5.5vw 2vw -5.5vw" },
                borderRadius: "8px",
                backgroundColor: "rgb(243 248 253)",
                color: "#061523",
                padding: { xs: 2, md: 4 },
              }}
            >
              {/* Basic Info Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {task.taskTitle}
                  </Typography>

                  <Typography variant="subtitle1">
                    Completed On:{" "}
                    {task.completedOn
                      ? dayjs(task.completedOn).format("DD-MM-YYYY HH:mm")
                      : "Not completed yet"}
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={() => handleToggle(index)}>
                  {isExpanded ? "View Less" : "View More"}
                </Button>
              </Box>

              {/* Expanded View */}
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box mt={2}>
                  <Typography>Description: {task.taskDesc}</Typography>

                  <Typography variant="subtitle1">Key Points:</Typography>
                  <ul>
                    {task.keyList?.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>

                  {task.link && (
                    <Typography>
                      Link:{" "}
                      <Link
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Work Reference
                      </Link>
                    </Typography>
                  )}

                  <Typography>
                    Verified By:{" "}
                    {task.completedBy}
                  </Typography>

                  <Typography>
                    Verified On:{" "}
                    {task.verifiedOn
                      ? dayjs(task.verifiedOn).format("DD-MM-YYYY HH:mm")
                      : "Verification Pending"}
                  </Typography>
                </Box>
              </Collapse>
            </Paper>
          );
        })
      ) : (
        <Typography>No assigned task history available.</Typography>
      )}
    </Container>
  );
};

export default ManagerHistory;
