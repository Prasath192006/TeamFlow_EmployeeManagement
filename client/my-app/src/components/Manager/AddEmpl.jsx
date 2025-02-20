import React, { useState } from "react";
import HeaderCont from "../HeaderCont.jsx";
import { useParams } from "react-router-dom";
import Footer from "../Footer.jsx";
import {
  Paper,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddEmpl() {
  const { name } = useParams();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    emprole: "",
    empid: "",
    password: "",
    Conpassword: "",
  });

  const [verification, setVerification] = useState({
    verifyEmail: false,
    verifyPass: false,
  });

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value) {
      setVerification((prev) => ({
        ...prev,
        verifyEmail: !validateEmail(value),
      }));
    }
    if (name === "Conpassword" && value) {
      setVerification((prev) => ({
        ...prev,
        verifyPass: formData.password !== value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      address: "",
      emprole: "",
      empid: "",
      password: "",
      Conpassword: "",
    });
    setVerification({ verifyEmail: false, verifyPass: false });
  };

  const handleSubmit = () => {
    if (formData.password === formData.Conpassword) {
      alert("Added Successfully");
    } else {
      alert("Password Mismatch");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#01123eeb", minHeight: "100vh", }}>
      <HeaderCont name={name} />
      <Box
        component="h2"
        sx={{
          color: "aliceblue",
          textAlign: "center",
          mb: "2vw",
          fontFamily: '"Sansita", serif',
          fontSize: { xs: "28px", md: "40px" },
        }}
      >
        Add Employee
      </Box>
     <Box>
      <Paper
        elevation={3}
        sx={{
          m: "2vw auto",
          width: {xs:"90%" , md:"60%"},
          maxWidth: "1200px",
          backgroundColor: "rgb(243 248 253)",
          color: "#061523",
          px: "2vw",
          py:"4vw",
          borderRadius: "12px",
        }}
      >
        <FormControl fullWidth>
          <Grid container spacing={5} >
            <Grid item xs={12} md={6} spacing={10}>
              <Box sx={{display:"flex" ,flexDirection:"column", gap:"20px"}}>
              <TextField
                fullWidth
                label="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleFormData}
                placeholder="Enter First Name"
                variant="outlined"
                sx={{ mb: "1.5vw" }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleFormData}
                placeholder="Enter Last Name"
                variant="outlined"
                sx={{ mb: "1.5vw" }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormData}
                onBlur={handleValidation}
                placeholder="Enter Email"
                error={verification.verifyEmail}
                helperText={verification.verifyEmail ? "Invalid Email" : ""}
                variant="outlined"
                sx={{ mb: "1.5vw" }}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleFormData}
                placeholder="Enter Address"
                multiline
                maxRows={4}
                variant="outlined"
                sx={{ mb: "1.5vw" }}
              />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{display:"flex" ,flexDirection:"column", gap:"20px"}}>
              <FormControl fullWidth sx={{ mb: "1.5vw" }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="emprole"
                  value={formData.emprole}
                  onChange={handleFormData}
                  label="Role"
                >
                  {[
                    "Technical Engineer",
                    "Frontend Developer",
                    "Figma Designer",
                    "Backend Developer",
                    "Database Manager",
                  ].map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Employee ID"
                name="empid"
                value={formData.empid}
                onChange={handleFormData}
                placeholder="Enter Employee ID"
                helperText="Must be unique"
                variant="outlined"
                sx={{ mb: "1.5vw" }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={handleFormData}
                placeholder="Enter Password"
                variant="outlined"
                sx={{ mb: "1.5vw" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass((prev) => !prev)}>
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="Conpassword"
                type={showConPass ? "text" : "password"}
                value={formData.Conpassword}
                onChange={handleFormData}
                onBlur={handleValidation}
                placeholder="Re-enter Password"
                error={verification.verifyPass}
                helperText={verification.verifyPass ? "Password Mismatch" : ""}
                variant="outlined"
                sx={{ mb: "1.5vw" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConPass((prev) => !prev)}
                      >
                        {showConPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "2vw",
              gap: {xs:"5vw" , md:"2vw"},
            }}
           >
            <Button variant="outlined" color="primary" onClick={resetForm}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Employee
            </Button>
          </Box>
        </FormControl>
      </Paper>
      </Box>
      <Footer />
    </Box>
  );
}
