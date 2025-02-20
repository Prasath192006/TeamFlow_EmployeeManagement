import React from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1a1a33", py: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          textAlign: { xs: "left", md: "center" },
          gap: { xs: 4, md: 10 },
          color: "aliceblue",
        }}
      >
        {/* Contact Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            CONTACTS
          </Typography>
          <Typography variant="body2">Phone: 9562748315</Typography>
          <Typography variant="body2" sx={{ margin: 0 }}>
            Mail: teamflow@tf.ac.in
          </Typography>
        </Box>

        {/* Rights & Terms */}
        <Box>
          <Typography variant="body2">Rights & Terms</Typography>
          <Typography variant="body2">© 2025 TeamFlow. All rights reserved.</Typography>
          <Typography variant="body2">Privacy Policy | Terms and Service</Typography>
        </Box>

        {/* Social Media */}
        <Box>
          <Typography variant="h6" gutterBottom>
            ON SOCIAL MEDIA
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              justifyContent: { xs: "flex-start", md: "center" },
            }}
          >
            <InstagramIcon
              onClick={() => window.open("https://instagram.com", "_blank")}
              sx={iconStyles}
            />
            <XIcon
              onClick={() => window.open("https://twitter.com", "_blank")}
              sx={iconStyles}
            />
            <FacebookIcon
              onClick={() => window.open("https://facebook.com", "_blank")}
              sx={iconStyles}
            />
            <WhatsAppIcon
              onClick={() => window.open("https://wa.me/9360120842", "_blank")}
              sx={iconStyles}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const iconStyles = {
  fontSize: { xs: 24, md: 30 },
  cursor: "pointer",
  color: "#E4405F",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "aliceblue",
  },
};
