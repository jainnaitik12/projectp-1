import React from "react";
import { Box, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Email, Phone } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f8",
        padding: "20px 40px",
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Left: Contact Information */}
        <Box sx={{ maxWidth: "400px", marginBottom: { xs: "20px", md: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Training & Placement Office
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", marginTop: "8px" }}>
            National Institute of Technology, Kurukshetra
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <Phone sx={{ fontSize: "20px", marginRight: "10px" }} />
            <Typography variant="body2">+91-12345-67890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <Email sx={{ fontSize: "20px", marginRight: "10px" }} />
            <Typography variant="body2">tnp@nitkkr.ac.in</Typography>
          </Box>
        </Box>

        {/* Center: Quick Links */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
            <Link href="/faq" color="inherit" underline="hover">
              FAQ
            </Link>
            <Link href="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        </Box>

        {/* Right: Social Media */}
        <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <IconButton
              sx={{
                backgroundColor: "#2196F3",
                color: "#fff",
                "&:hover": { backgroundColor: "#1976D2" },
              }}
              component="a"
              href="https://facebook.com"
              target="_blank"
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#2196F3",
                color: "#fff",
                "&:hover": { backgroundColor: "#1976D2" },
              }}
              component="a"
              href="https://twitter.com"
              target="_blank"
            >
              <Twitter />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#2196F3",
                color: "#fff",
                "&:hover": { backgroundColor: "#1976D2" },
              }}
              component="a"
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ marginY: "20px" }} />

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="body2" sx={{ color: "#777" }}>
          &copy; {new Date().getFullYear()} National Institute of Technology, Kurukshetra. All Rights Reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: "#777" }}>
          Designed & Developed by the Training & Placement Office
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
