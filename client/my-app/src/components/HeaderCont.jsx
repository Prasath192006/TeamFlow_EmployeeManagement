import React from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function HeaderCont({ name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
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
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
        <Avatar
          alt="Gravis Howard"
          src={logo}
          variant="square"
          sx={{ width: { xs: 32, md: 45 }, height: { xs: 32, md: 45 } , }}
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
            fontSize: { xs: "18px", md: "30px" },
            display: { xs: "none", sm: "block" }, 
          }}
        >
          {name}
        </Typography>
        <Avatar
          sx={{
            bgcolor: "aliceblue",
            color: "#1a1a33",
            width: { xs: 30, md: 40 },
            height: { xs: 30, md: 40 },
            fontSize: { xs: "14px", md: "18px" },
          }}
        >
          {name[0]}
        </Avatar>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            height: { xs: "4vh", md: "3vw" },
            fontSize: { xs: "12px", md: "16px" },
            px: { xs: 1.5, md: 3 },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
