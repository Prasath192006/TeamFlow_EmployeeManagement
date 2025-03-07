import React, { useState, useEffect } from "react";
import HeaderCont from "../HeaderCont.jsx";
import Footer from "../Footer.jsx";
import axios from "axios";
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
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddEmpl() {
  const [formData, setFormData] = useState({
    fname: "",
    profilePic: null,
    email: "",
    salary: "",
    address: "",
    emprole: "",
    empid: "",
    password: "",
    Conpassword: "",
  });
  const [Preview, setPreview] = useState(null);

  const [errorMSG, seterrorMSG] = useState({
    emailerr: "Invalid Email",
    emailerrcolor: "#D84040",
    useriderr: "Incorrect Format e.g`TF2XE4XXX`",
    useriderrcolor: "#D84040",
  });

  const [verify, setverify] = useState({
    email: false,
    userid: false,
  });

  const [formatverification, setformatverification] = useState({
    verifyEmail: false,
    verifyPass: false,
    verifyEmpID: false,
  });

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateEmpID = (empid) => /^TF\d{2}[ME]\d{4}$/.test(empid);
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      seterrorMSG((prev) => ({
        ...prev,
        emailerrcolor: "#E50046",
      }));
      setverify((prev) => ({
        ...prev,
        email: false,
      }));
      const emailVerify = validateEmail(value);
      if (!emailVerify) {
        seterrorMSG((prev) => ({ ...prev, emailerr: "Invalid Email" }));
      }

      setformatverification((prev) => ({
        ...prev,
        verifyEmail: value !== "" ? !emailVerify : false,
      }));
      if (emailVerify) {
        isemailexist();
      }
    }
    if (name === "Conpassword" && value) {
      setformatverification((prev) => ({
        ...prev,
        verifyPass: formData.password !== value,
      }));
    }
    if (name === "empid") {
      const useridverify = validateEmpID(value);
      seterrorMSG((prev) => ({
        ...prev,
        useriderrcolor: "#E50046",
      }));
      setverify((prev) => ({
        ...prev,
        userid: false,
      }));
      console.log("usrisd:value", useridverify, value);
      if (!useridverify) {
        seterrorMSG((prev) => ({
          ...prev,
          useriderr: "Incorrect Format e.g`TF2XE4XXX`",
        }));
      }

      setformatverification((prev) => ({
        ...prev,
        verifyEmpID: value !== "" ? !useridverify : false,
      }));
      if (useridverify) {
        isuseridexist();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fname: "",
      profilePic: null,
      email: "",
      salary: "",
      Preview: null,
      address: "",
      emprole: "",
      empid: "",
      password: "",
      Conpassword: "",
    });
    setformatverification({ verifyEmail: false, verifyPass: false });
  };

  const handleimage = (e) => {
    const file = e.target.files[0];

    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setPreview(URL.createObjectURL(file));
  };

  // SERVER CODE

  const handleSubmit = async (e) => {
    const formdata = new FormData();
    formdata.append("name", formData.fname);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("userID", formData.empid);
    formdata.append("role", formData.emprole);
    formdata.append("address", formData.address);
    formdata.append("salary", formData.salary);
    formdata.append("image", formData.profilePic);

    axios
      .post("http://localhost:5000/api/LogIN/AddUser", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data.message);
        alert("Added Successfully!!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isemailexist = async () => {
    console.log("isemailexist called");
    axios
      .get("http://localhost:5000/api/LogIN/isemailexist", {
        params: { email: formData.email },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.isemailexist) {
          seterrorMSG((prev) => ({
            ...prev,
            emailerrcolor: "#5CB338",
          }));
          setverify((prev) => ({
            ...prev,
            email: true,
          }));
        }
        seterrorMSG((prev) => ({ ...prev, emailerr: res.data.message }));
        setformatverification((prev) => ({
          ...prev,
          verifyEmail: true,
        }));
      });
  };
  const isuseridexist = async () => {
    console.log("isuseridexist called");
    axios
      .get("http://localhost:5000/api/LogIN/isuseridexist", {
        params: { userid: formData.empid },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.isuseridexist) {
          seterrorMSG((prev) => ({
            ...prev,
            useriderrcolor: "#5CB338",
          }));
          setverify((prev) => ({
            ...prev,
            userid: true,
          }));
        }
        seterrorMSG((prev) => ({ ...prev, useriderr: res.data.message }));
        setformatverification((prev) => ({
          ...prev,
          verifyEmpID: true,
        }));
      });
  };

  return (
    <Box sx={{ backgroundColor: "#01123eeb", minHeight: "100vh", pb: "8rem" }}>
      <Box
        component="h2"
        sx={{
          color: "aliceblue",
          textAlign: "center",
          pt: "2rem",
          fontFamily: '"Sansita", serif',
          fontSize: { xs: "28px", md: "40px" },
          mb: "2rem",
        }}
      >
        Add Employee
      </Box>
      <Box>
        <Paper
          elevation={3}
          sx={{
            m: "0vw auto",
            width: { xs: "90%", md: "60%" },
            maxWidth: "1200px",
            backgroundColor: "rgb(243 248 253)",
            color: "#061523",
            px: "2vw",
            py: "4vw",
            borderRadius: "12px",
          }}
        >
          <FormControl fullWidth>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
              mb={"3rem"}
            >
              <Avatar
                src={Preview}
                alt="Profile Preview"
                sx={{ width: 140, height: 140, mb: "2rem" }}
              />
              <input
                type="file"
                name="profilePic"
                style={{ display: "none" }}
                onChange={handleimage}
                id="profile-pic"
              />
              <label htmlFor="profile-pic">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ mb: "1vw", alignItems: "center" }}
                >
                  Choose Profile Photo
                </Button>
              </label>
            </Box>

            <Grid container spacing={5}>
              <Grid item xs={12} md={6} spacing={10}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <TextField
                    fullWidth
                    label=" Name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleFormData}
                    placeholder="Enter First Name"
                    variant="outlined"
                    sx={{ mb: "1.5vw" }}
                  />
                  {/* { EMAIL} */}
                  <TextField
                    fullWidth
                    autoComplete="off"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormData}
                    onBlur={handleValidation}
                    placeholder="Enter Email"
                    //error={formatverification.verifyEmail}
                    helperText={
                      formatverification.verifyEmail ? errorMSG.emailerr : ""
                    }
                    variant="outlined"
                    sx={{
                      mb: "1.5vw",
                      "& .MuiFormHelperText-root": {
                        color: errorMSG.emailerrcolor,
                      },
                    }}
                  />

                  {/* //ADDRESS */}
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
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleFormData}
                    onBlur={handleValidation}
                    placeholder="Enter Salary"
                    variant="outlined"
                    sx={{ mb: "1.5vw" }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
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
                        "Manager",
                      ].map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* EMPLOYEE ID */}

                  <TextField
                    fullWidth
                    label="Employee ID"
                    autoComplete="off"
                    name="empid"
                    //error={formatverification.verifyEmpID  }
                    value={formData.empid}
                    onChange={handleFormData}
                    placeholder="Enter Employee ID"
                    onBlur={handleValidation}
                    helperText={
                      formatverification.verifyEmpID
                        ? errorMSG.useriderr
                        : "Must be unique"
                    }
                    variant="outlined"
                    sx={{
                      mb: "1.5vw",
                      "& .MuiFormHelperText-root": {
                        color: errorMSG.useriderrcolor,
                      },
                    }}
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
                    sx={{ mb: "1.5vw", mt: "-1.5rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPass((prev) => !prev)}
                          >
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
                    error={formatverification.verifyPass}
                    helperText={
                      formatverification.verifyPass ? "Password Mismatch" : ""
                    }
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
                gap: { xs: "5vw", md: "2vw" },
              }}
            >
              <Button variant="outlined" color="primary" onClick={resetForm}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!Object.values(verify).every((val) => val)}
              >
                {console.log(Object.values(verify))}
                Create Employee
              </Button>
            </Box>
          </FormControl>
        </Paper>
      </Box>
    </Box>
  );
}
