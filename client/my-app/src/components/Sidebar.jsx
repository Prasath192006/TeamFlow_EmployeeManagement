import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Sidebar = ({
  open,
  handleClose,
  onHistoryClick,
  onLogoutClick,
  onManagerHistoryClick,
}) => {
  const logoutItem = "Logout";
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isManager, setIsManager] = useState(false);

  // Get userID from session storage
  useEffect(() => {
    const raw = sessionStorage.getItem("data");
    if (raw) {
      try {
        const userData = JSON.parse(raw);
        const userID = userData?.userID || "";
        setIsManager(userID.includes("M"));
      } catch (error) {
        console.error("Invalid user data in sessionStorage:", error);
      }
    }
  }, []);

  const handleItemClick = (text) => {
    setSelectedItem(text);
    if (text === "Tasks") {
      const section = document.getElementById("tasks-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    else if (text === "Task Verification" || text === "Employee Status") {
      const userID = JSON.parse(sessionStorage.getItem("data")).userID;
      const managerPath = `/Manager/${userID}`;

      // Map menu text → section ID

      const sectionMap = {
        "Task Verification": "task-verification-section",
        "Employee Status": "employee-status-section",
      };

      const targetSection = sectionMap[text];

      if (location.pathname === managerPath) {
        // ✅ Already on Manager → just scroll
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // ✅ Not on Manager → navigate with ?scrollTo=<sectionID>
        navigate(`${managerPath}?scrollTo=${targetSection}`);
      }
    }

    if (text === "Task History") {
      onHistoryClick?.();
    }
    if (text === "Work History") {
      const userID = JSON.parse(sessionStorage.getItem("data")).userID;
      const managerPath = `/Manager/${userID}`;

      if (location.pathname === managerPath) {
        // ✅ Already on Manager page → directly call function to show history
        onManagerHistoryClick?.();
      } else {
        // ✅ On a different page → navigate with query param so Manager will auto-show
        navigate(`${managerPath}?showHistory=true`);
      }
    }

    if (text === "Logout") {
      onLogoutClick?.();
    }
  };

  // Define sidebar menu based on role
  const menuItems = isManager
    ? ["Task Verification", "Employee Status", "Work History"]
    : ["Tasks", "Task History"];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#1a1a33",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuItems.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(text)}
                selected={selectedItem === text}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#3f3f66",
                    color: "#ffffff",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#57578c",
                  },
                  "&:hover": {
                    backgroundColor: "#2a2a4d",
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(logoutItem)}
              selected={selectedItem === logoutItem}
              sx={{
                color: "#ff4d4d", // 🔴 base red text
                "&.Mui-selected": {
                  backgroundColor: "#661111", // darker red for selected
                  color: "#ffffff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#880e0e",
                },
                "&:hover": {
                  backgroundColor: "#2a2a4d", // dark hover on red
                },
              }}
            >
              <ListItemText primary={logoutItem} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
