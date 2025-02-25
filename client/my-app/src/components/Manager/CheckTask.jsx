import { Box, Paper, Grid } from "@mui/material";
import React from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
  Button
} from "@mui/material";
import { Tempdata } from "../../App";

export default function CheckTask() {
  const userID = "E25TF05";
  const userData = Tempdata.find((id) => id.userid === userID);
  const keysPts = userData.checkList;
  const link = "https://google.com";
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#01123eeb",
        color: "aliceblue",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          marginBottom: { xs: 2, md: 4 },
          paddingTop: { xs: 2, md: 3 },
          fontFamily: '"Sansita", serif',
          fontSize: { xs: "2.4rem", md: "3rem" },
        }}
      >
        GIVEN TASK
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
                <strong>Key Points:</strong>
              </Typography>

              <Box
                component="ol"
                sx={{ paddingLeft: 2, listStyle: "circle", marginTop: 1 }}
              >
                {" "}
                <Typography variant="subtitle1">
                  {keysPts.map((op) => (
                    <li key={op}>{op}</li>
                  ))}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Link:
                <Link href={link} underline="hover" target="_blank">
                  {link}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
       
        <Button variant="contained" sx={{ display:"flex", justifyContent:"center", margin:" 3rem auto 1.2rem  auto ", width:"10rem"}}>
            VERIFIED
          </Button>
        
        
      </Paper>
    </Box>
  );
}
