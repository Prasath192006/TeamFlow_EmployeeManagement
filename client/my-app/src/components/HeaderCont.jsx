import React from "react";
import axios from "axios";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import Sidebar from "./Sidebar.jsx";

export default function HeaderCont(props) {
  const storedData = JSON.parse(sessionStorage.getItem("data"));
  const name = storedData.name;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    axios
      .get("https://teamflow-employeemanagement.onrender.com/api/Log/logout", {
        params: { userID: storedData.userID },
      })
      .then((res) => {
        navigate("/", { replace: true });
        sessionStorage.removeItem("data");
      })
      .catch((err) => {
        console.log("Error in logout API", err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1a1a33",
        color: "aliceblue",
        height: { xs: "7vh", md: "8vh" },
        px: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      {/* Logo & Brand Name */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
      >
        <Avatar
          alt="Gravis Howard"
          src={logo}
          variant="square"
          sx={{ width: { xs: 32, md: 45 }, height: { xs: 32, md: 45 } }}
        />
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Sansita", serif',
            fontSize: { xs: "24px", md: "42px" },
            marginTop: { xs: "0", md: "-5px" },
          }}
        >
          TeamFlow
        </Typography>
      </Box>

      {/* User Info & Logout */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Sansita", serif',
            fontSize: { xs: "18px", md: "35px" },
            display: { xs: "none", sm: "block" },
          }}
        >
          {name}
        </Typography>
        <Avatar
          onClick={handleDrawerOpen}
          sx={{
            bgcolor: "aliceblue",
            color: "#1a1a33",
            width: { xs: 30, md: 40 },
            height: { xs: 30, md: 40 },
            fontSize: { xs: "14px", md: "18px" },
            margin: { md: "0 -20vw 0 0", xs: "0 -73vw 0 0" },
          }}
        >
          {name[0]}
        </Avatar>

        {/* //SideBar */}
        <Sidebar
          open={open}
          handleClose={handleDrawerClose}
          onHistoryClick={() => {
            props.onShowHistory();
            //setOpen(false);
          }}
          onLogoutClick={() => {
            handleLogout();
          }}
          onManagerHistoryClick={props.onManagerHistoryClick}
        />

        {/* <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            height: { xs: "4vh", md: "3vw" },
            fontSize: { xs: "12px", md: "16px" },
            px: { xs: 1.5, md: 3 },
          }}
        >
          Logout
        </Button> */}
      </Box>
    </Box>
  );
}
