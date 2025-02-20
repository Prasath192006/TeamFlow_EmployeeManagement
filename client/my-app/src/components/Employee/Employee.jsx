import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import sam1 from "../../images/sample.jpg";
import { Tempdata } from "../../App.jsx";
import Timer from "../Timer.jsx";
import { GridOff } from "@mui/icons-material";

export default function Employee() {
  const { userID } = useParams();
  const userData = Tempdata.find((id) => id.userid === userID);
  const options = userData.checkList;

  const [checkStatus, setCheckStatus] = useState(
    options.reduce((acc, op) => ({ ...acc, [op]: false }), {})
  );

  const checkHandler = (event) => {
    setCheckStatus({
      ...checkStatus,
      [event.target.name]: event.target.checked,
    });
  };

  const allChecked = Object.values(checkStatus).every(Boolean);

  return (
    <Box
      sx={{
        backgroundColor: "#01123eeb",
        color: "aliceblue",
        minHeight: "100vh",
      }}
    >
      <HeaderCont name={userData.name} />

      {/* User Info Section */}
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
            src={sam1}
            alt="Profile"
            s
            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {userData.name.toUpperCase()}
          </Typography>
          <Typography variant="h6">Role: {userData.role}</Typography>
          <Typography variant="h6">ID: {userData.userid}</Typography>
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            Address: Karpagam college of engineering, Othakalmandapam,
            Coimbatore, Tamil Nadu
          </Typography>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>

      {/* Tasks Section */}
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ marginTop: { xs: 3, md: 5 }, marginBottom: { xs: 2, md: 4 } }}
      >
        TASKS
      </Typography>

      <Paper
        elevation={10}
        sx={{
          margin: { xs: "4vw", md: "5vw" },
          borderRadius: "8px",
          backgroundColor: "rgb(243 248 253)",
          color: "#061523",
          padding: { xs: 2, md: 4 },
        }}
      >
        {userData.task === "" ? (
          <Typography variant="h6" align="center">
            Contact Your MANAGER
          </Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                }}
              >
                {userData.task}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                <strong>Description:</strong> {userData.taskDesc}
              </Typography>

              <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                <strong>Checklist:</strong>
              </Typography>
              <Box
                component="ol"
                sx={{ paddingLeft: 2, listStyle: "none", marginTop: 1 }}
              >
                {options.map((op) => (
                  <li key={op}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={op}
                          checked={checkStatus[op]}
                          onChange={checkHandler}
                        />
                      }
                      label={<Typography variant="body2">{op}</Typography>}
                    />
                  </li>
                ))}
              </Box>
            </Grid>

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
              <Box sx={{ display: "flex", alignItems: "center",justifyContent:"center", gap: 1 }}>
                <Typography
                  variant="subtitle1"
                 
                >
                  Days Left:
                </Typography>
                
                  <Timer due={userData.dueDate} />
                
              </Box>
            </Grid>

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
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                variant="contained"
                disabled={!allChecked}
                sx={{ width: { xs: "80vw", sm: "60vw", md: "40vw" } }}
              >
                Completed
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Footer />
    </Box>
  );
}
