import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get the vertical scroll position
      const maxScroll = 300; // Adjust based on when you want the full black effect
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0.3); // Ensure opacity doesn't go below 0.3
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut", delay: 1 },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Align left content and buttons on opposite sides
        color: "#fff",
        overflow: "hidden",
        padding: "0 5%",
      }}
    >
      {/* Dynamic Background Image */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/image.png')`, // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1, // Keep it behind other elements
          opacity: scrollOpacity, // Dynamically adjust opacity based on scroll
          transition: "opacity 0.2s ease-out",
          filter: "brightness(0.7)", // Optional dark overlay for contrast
        }}
      ></Box>

      {/* Heading Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        style={{
          width: "66.66%", // 2/3 width
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Faded black background
            color: "#fff",
            borderRadius: "15px", // Rounded corners
            padding: "20px",
            textAlign: "left", // Align text to the left
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              marginBottom: "10px",
            }}
          >
            Welcome to the Training & Placement Cell
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              lineHeight: "1.6",
            }}
          >
            Welcome to the recruitment website for NIT Kurukshetra.
            The Training & Placement Cell at the National Institute of
            Technology, Kurukshetra, is dedicated to bridging the gap between
            academia and industry.Our graduates
            are a combination of rigorous thinking, hardwork and fundamental stronghold. 
            They are nurtured by the institute to strive for excellence and deliver impact
            in their field of work. Let us begin...
          </Typography>
        </Box>
      </motion.div>

      {/* Button Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        style={{
          width: "33.33%", // 1/3 width
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px", // Spacing between buttons
        }}
      >

        <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              marginBottom: "10px",
              color: "#6C63FF",
            }}
          >
          Login/Signup
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "30px",
            width: "80%", // Adjust button width
            "&:hover": {
              backgroundColor: "#5348D5",
            },
          }}
        >
          Admin
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "30px",
            width: "80%", // Adjust button width
            "&:hover": {
              backgroundColor: "#5348D5",
            },
          }}
        >
          Student
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "30px",
            width: "80%", // Adjust button width
            "&:hover": {
              backgroundColor: "#5348D5",
            },
          }}
        >
          Recruiter
        </Button>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
