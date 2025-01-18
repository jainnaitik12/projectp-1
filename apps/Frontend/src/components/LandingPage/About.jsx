import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const reverseImageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f7faff",
      }}
    >
      {/* About Us Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        About Us
      </Typography>

      {/* Content Section 1: Image Left, Text Right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
          maxWidth: "1000px",
          marginBottom: "40px",
        }}
      >
        {/* Image with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
          viewport={{ once: true }}
        >
          <Box
            component="img"
            src="/image1.png" // First image
            alt="Institute Banner 1"
            sx={{
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          />
        </motion.div>

        {/* Additional Information */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#333", textAlign: "justify" }}
          >
            The Training and Placement Office at NIT Kurukshetra serves as a
            bridge between academia and industry. It facilitates placements,
            internships, and skill development for students, ensuring their
            professional growth and success in a competitive environment.
          </Typography>
        </Box>
      </Box>

      {/* Content Section 2: Text Left, Image Right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
          maxWidth: "1000px",
        }}
      >
        {/* Additional Information */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#333", textAlign: "justify" }}
          >
            Our office is committed to providing a seamless and enriching
            experience for students and recruiters alike. From organizing campus
            drives to facilitating internships and workshops, we ensure every
            student is well-prepared for the challenges of the industry.
          </Typography>
        </Box>

        {/* Image with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={reverseImageVariants}
          viewport={{ once: true }}
        >
          <Box
            component="img"
            src="/image2.png" // Second image
            alt="Institute Banner 2"
            sx={{
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default About;
