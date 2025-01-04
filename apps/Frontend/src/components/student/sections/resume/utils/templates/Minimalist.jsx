import React from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Chip,
  Link,
  Divider,
} from "@mui/material";
import {
  GitHub,
  Launch,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
} from "@mui/icons-material";
import PropTypes from "prop-types";
const Minimalist = ({ data }) => {
  const { personalInfo, academics, skills, education, experience, projects } =
    data;

  const SectionTitle = ({ children }) => (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 500,
        letterSpacing: 1.2,
        mb: 2,
        color: "#2c3e50",
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: -4,
          left: 0,
          width: 40,
          height: 2,
          backgroundColor: "#3498db",
        },
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "210mm",
        minHeight: "297mm",
        p: "20mm",
        backgroundColor: "#fff",
        "@media print": {
          margin: 0,
          boxShadow: "none",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 300,
            color: "#2c3e50",
            letterSpacing: 1,
            mb: 1,
          }}
        >
          {personalInfo.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#7f8c8d", mb: 2, letterSpacing: 0.5 }}
        >
          {personalInfo.department} • Batch of {personalInfo.batch}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            color: "#7f8c8d",
            "& a": {
              color: "inherit",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              "&:hover": {
                color: "#3498db",
              },
            },
          }}
        >
          <Link href={`mailto:${data.email}`}>
            <Email fontSize="small" />
            {data.email}
          </Link>
          <Link href={`tel:${personalInfo.phone}`}>
            <Phone fontSize="small" />
            {personalInfo.phone}
          </Link>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOn fontSize="small" />
            {personalInfo.location}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12}>
          <SectionTitle>SKILLS</SectionTitle>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                sx={{
                  borderColor: "#bdc3c7",
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#3498db",
                    color: "white",
                    borderColor: "#3498db",
                  },
                }}
              />
            ))}
          </Box>

          {experience.length > 0 && (
            <>
              <SectionTitle>EXPERIENCE</SectionTitle>
              {experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#2c3e50" }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#7f8c8d", mb: 1, fontStyle: "italic" }}
                  >
                    {exp.company} • {exp.duration}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#2c3e50", whiteSpace: "pre-line" }}
                  >
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </>
          )}

          <SectionTitle>PROJECTS</SectionTitle>
          {projects?.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#2c3e50" }}
              >
                {project.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#2c3e50", mb: 1 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                {project.technologies.map((tech, i) => (
                  <Chip
                    key={i}
                    label={tech}
                    size="small"
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderColor: "#bdc3c7",
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Box>
              {project.links && (
                <Box sx={{ display: "flex", gap: 2 }}>
                  {project.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "#3498db",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: "#2980b9",
                        },
                      }}
                    >
                      {link.type === "github" && <GitHub fontSize="small" />}
                      {link.type === "live" && <Launch fontSize="small" />}
                      {link.type}
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          ))}

          <SectionTitle>EDUCATION</SectionTitle>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#2c3e50" }}
              >
                {edu.degree}
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                {edu.institution} • {edu.year} • {edu.score}
              </Typography>
            </Box>
          ))}

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
              Academic Performance: CGPA {academics.cgpa} • XII{" "}
              {academics.twelfthMarks}% • X {academics.tenthMarks}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

//proptype validation
Minimalist.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rollNumber: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
    }).isRequired,
    academics: PropTypes.shape({
      cgpa: PropTypes.number.isRequired,
      tenthMarks: PropTypes.number.isRequired,
      twelfthMarks: PropTypes.number.isRequired,
    }).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        institution: PropTypes.string,
        degree: PropTypes.string,
        year: PropTypes.number,
        score: PropTypes.string,
      })
    ),
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        company: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        technologies: PropTypes.arrayOf(PropTypes.string),
        links: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};
export default Minimalist;
