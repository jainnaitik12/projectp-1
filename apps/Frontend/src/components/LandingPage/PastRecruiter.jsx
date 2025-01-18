import React from "react";
import { Box, Typography } from "@mui/material";

const PastRecruiters = () => {
  // Array of company logos (URLs or public folder paths)
  const companyLogos = [
    "/logos/google.png",
    "/logos/microsoft.png",
    "/logos/amazon.png",
    "/logos/apple.png",
    "/logos/meta.png",
    "/logos/tesla.png",
    "/logos/adobe.png",
    "/logos/ibm.png",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f7faff",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "50px",
          color: "#333",
        }}
      >
        Past Recruiters
      </Typography>

      {/* Scrolling Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          marginBottom: "50px",
          whiteSpace: "nowrap",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            animation: "scroll 20s linear infinite",
          }}
        >
          {companyLogos.map((logo, index) => (
            <Box
              key={index}
              component="img"
              src={logo}
              alt={`Company ${index + 1}`}
              sx={{
                maxWidth: "150px",
                margin: "0 20px",
                filter: "grayscale(100%)", // Optional: Make logos grayscale for uniformity
                transition: "filter 0.3s ease-in-out",
                "&:hover": {
                  filter: "grayscale(0%)", // Highlight logo on hover
                },
              }}
            />
          ))}
          {/* Duplicate logos to create a seamless scroll */}
          {companyLogos.map((logo, index) => (
            <Box
              key={`duplicate-${index}`}
              component="img"
              src={logo}
              alt={`Company ${index + 1}`}
              sx={{
                maxWidth: "150px",
                margin: "0 20px",
                filter: "grayscale(100%)",
                transition: "filter 0.3s ease-in-out",
                "&:hover": {
                  filter: "grayscale(0%)",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default PastRecruiters;
