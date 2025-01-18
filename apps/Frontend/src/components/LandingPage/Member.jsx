import React from "react";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";

// Dummy Data for Team Members
const teamMembers = [
  {
    name: "John Doe",
    post: "Director",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Munish Sharma",
    post: "TNP Coordinator",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mr. Alex Brown",
    post: "Faculty Advisor",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ms. Lisa Green",
    post: "Student Representative",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mr. Mark Wilson",
    post: "Placement Officer",
    image: "https://via.placeholder.com/150",
  },
];

const TeamCarousel = () => {
  // Slick Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7faff",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Section Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "30px" }}>
        Meet Our Team
      </Typography>

      {/* Carousel Slider */}
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 300,
              margin: "0 auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "15px",
                  border: "3px solid #2196F3",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#777", marginTop: "5px" }}
                >
                  {member.post}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default TeamCarousel;
