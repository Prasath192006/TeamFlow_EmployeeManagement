import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { Tempdata } from "../../App";


export default function ManagerComponent() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getData = (userId) => Tempdata.find((it) => it.userid === userId);

  const handleLogin = () => {
    const data = getData(userid);
    if (data && data.passkey === password) {
      data.userid.startsWith("M")
        ? navigate(`/Manager/${userid}`)
        : navigate(`/Employee/${userid}`);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#1a1a33", minHeight: "100vh", p: { xs: 2, md: 2 } }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left Section - Logo and Heading */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, md: 4 },
          }}
        >
          <motion.img
            src={logo}
            alt="LOGO"
            style={{ borderRadius: "10px" }}
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            width="60%"
            height="auto"
          />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Sansita, serif",
                color: "aliceblue",
                fontSize: {  sm: "6vw", md: "4.5vw",},
                textAlign: "center",
              }}
            >
              Welcome to TeamFlow
            </Typography>
          </motion.div>
        </Grid>

        {/* Right Section - Login Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: { xs: "auto", md: "100vh" },
            }}
          >
            <Paper
              elevation={10}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#1a1a33",
                color: "aliceblue",
                boxShadow: "5px 5px 20px rgba(255, 255, 255, 0.5)",
                width: { xs: "90vw",md: "23vw"},
                height:{xs:"" , md:"28vw"},
                transition: "transform 0.4s ease",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar sx={{ bgcolor: "blue" }}>
                    <LockIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="h5">Sign In</Typography>
                </Grid>
              </Grid>

              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                  '& .MuiInputBase-input': { color: "aliceblue" },
                  '& .MuiInputLabel-root': { color: "aliceblue" },
                  '& .MuiInput-underline:before': { borderBottomColor: "aliceblue" },
                }}
              >
                <TextField
                  label="Enter User ID"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setUserid(e.target.value)}
                />
                <TextField
                  label="Enter Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Typography sx={{fontSize:"0.8rem" ,  color:"#ffca28" }}>
                  If you are a new User please contact your Admin/Manager
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  mt: {xs:1 , md:2},
                  color: "white",
                  backgroundColor: "blue",
                  fontWeight: "bold",
                  '&:disabled': { backgroundColor: "gray" },
                }}
                disabled={!userid || !password}
              >
                SIGN IN
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    
    </Box>
   
  );
}