import React, { useState } from "react";
import axios from "axios";
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
import BackDrop from "../BackDrop";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { Tempdata } from "../../App";

export default function LogIn() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = (userId) => Tempdata.find((it) => it.userid === userId);

  const handleHintBtn = () => {
    console.log("btn called");
    if (hint !== "") {
      setHint("");
    } else setHint('manager- userid:"TF25M1234", password:123456789 , Employee- userid:"TF25E1234" password:123456789');
  };
  const [handleErr, sethandleErr] = useState({
    useridErr: false,
    useridErrMsg: "",
    passErr: false,
    passErrMsg: "",
  });
  const resetHandleErr = () => {
    sethandleErr((prev) => ({
      ...prev,
      useridErr: false,
      useridErrMsg: "",
      passErr: false,
      passErrMsg: "",
    }));
  };
  //server side code
  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
  }

  const handleLogin = async () => {
    setLoading(true);

    await axios
      .get("http://localhost:5000/api/LogIN/", {
        params: { userid: userid, password: password },
      })
      .then((res) => {
        const userData = {
          userID: res.data.data.userID,
          name: res.data.data.name,
          role: res.data.data.role,
          address: res.data.data.address,
          image: `data:${
            res.data.data.image.contentType
          };base64,${arrayBufferToBase64(res.data.data.image.data.data)}`,
        };

        localStorage.setItem("data", JSON.stringify(userData));

        userid[4] === "M"
          ? navigate(`/Manager/${"M25TF09"}`)
          : navigate(`/Employee/${"E25TF05"}`);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.message);
          const errType = err.response.data.errfrom;
          if (errType === "userid") {
            sethandleErr((prev) => ({
              ...prev,
              useridErr: true,
              useridErrMsg: err.response.data.message,
            }));
          } else if (errType === "password") {
            sethandleErr((prev) => ({
              ...prev,
              passErr: true,
              passErrMsg: err.response.data.message,
            }));
          }
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a33",
        minHeight: "100vh",
        p: { xs: 2, md: 2 },
      }}
    >
      <BackDrop open={loading}  />
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
                fontSize: { sm: "6vw", md: "4.5vw" },
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
                width: { xs: "90vw", md: "23vw" },
                height: { xs: "", md: "31vw" },
                transition: "transform 0.4s ease",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
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
                  gap: 5,
                  mt: 3,
                  "& .MuiInputBase-input": { color: "aliceblue" },
                  "& .MuiInputLabel-root": { color: "aliceblue" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "aliceblue",
                  },
                }}
              >
                <TextField
                  label="Enter User ID"
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    setUserid(e.target.value), resetHandleErr();
                  }}
                  error={handleErr.useridErr}
                  helperText={handleErr.useridErr ? handleErr.useridErrMsg : ""}
                />
                <TextField
                  label="Enter Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value), resetHandleErr();
                  }}
                  error={handleErr.passErr}
                  helperText={handleErr.passErr ? handleErr.passErrMsg : ""}
                />
                <Typography sx={{ fontSize: "0.8rem", color: "#ffca28" }}>
                  If you are a new User please contact your Admin/Manager
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  mt: { xs: 1, md: 2 },
                  color: "white",
                  backgroundColor: "blue",
                  fontWeight: "bold",
                  "&:disabled": { backgroundColor: "gray" },
                }}
                disabled={!userid || !password}
              >
                SIGN IN
              </Button>
            </Paper>
          </Box>
          <center> <Button onClick={handleHintBtn} variant="contained" sx={{mt:{xs:5}}} >HINT [TESTING PURPOSE] </Button></center>
         
          <Typography sx={{ fontSize: "0.8rem", color: "#ffca28" }}>
                 {hint}
                </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
