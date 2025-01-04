import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Chip,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Language,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { colors } from "./colors";

const Professional = ({ data }) => {
  // Get theme and screen size for responsiveness
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Destructure data props
  const { personalInfo, academics, skills, education, experience, projects } =
    data;

  // Reusable section title component
  const SectionTitle = ({ children }) => (
    <Typography
      variant={isMobile ? "h6" : "h5"}
      sx={{
        color: colors.professional.primary,
        borderBottom: `2px solid ${colors.professional.accent}`,
        paddingBottom: 1,
        marginBottom: 3,
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );

  // Render skill chip with consistent styling
  const SkillChip = ({ skill }) => (
    <Chip
      label={skill}
      size={isMobile ? "small" : "medium"}
      sx={{
        backgroundColor: `${colors.professional.accent}15`,
        color: colors.professional.primary,
        margin: 0.5,
        border: `1px solid ${colors.professional.accent}`,
        "&:hover": {
          backgroundColor: colors.professional.accent,
          color: "white",
        },
      }}
    />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "210mm",
        minHeight: "297mm",
        padding: { xs: "10mm", sm: "15mm", md: "20mm" },
        backgroundColor: "#fff",
        margin: "auto",
        "@media print": {
          margin: 0,
          boxShadow: "none",
          breakInside: "avoid",
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            color: colors.professional.primary,
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          {personalInfo.name}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          {personalInfo.department} • Batch of {personalInfo.batch}
        </Typography>

        {/* Contact Information */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            marginTop: 2,
          }}
        >
          {data.email && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email fontSize="small" />
              {data.email}
            </Box>
          )}
          {personalInfo.phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone fontSize="small" />
              {personalInfo.phone}
            </Box>
          )}
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          {/* Skills Section */}
          <Box sx={{ marginBottom: 4 }}>
            <SectionTitle>Technical Skills</SectionTitle>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {skills.map((skill, index) => (
                <SkillChip key={index} skill={skill} />
              ))}
            </Box>
          </Box>

          {/* Education Section */}
          {education?.length > 0 && (
            <Box sx={{ marginBottom: 4 }}>
              <SectionTitle>Education</SectionTitle>
              {education.map((edu, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography
                    sx={{ fontWeight: 600, color: colors.professional.primary }}
                  >
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2">
                    {edu.year} • {edu.score}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          {/* Experience Section */}
          {experience?.length > 0 && (
            <Box sx={{ marginBottom: 4 }}>
              <SectionTitle>Professional Experience</SectionTitle>
              {experience.map((exp, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 3,
                    padding: 2,
                    borderLeft: `3px solid ${colors.professional.accent}`,
                    "&:hover": {
                      backgroundColor: `${colors.professional.accent}05`,
                    },
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 600, color: colors.professional.primary }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
                    {exp.company} • {exp.duration}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Projects Section */}
          {projects?.length > 0 && (
            <Box>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((project, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 3,
                    padding: 2,
                    borderLeft: `3px solid ${colors.professional.accent}`,
                    "&:hover": {
                      backgroundColor: `${colors.professional.accent}05`,
                    },
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 600, color: colors.professional.primary }}
                  >
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginY: 1 }}>
                    {project.description}
                  </Typography>
                  {project.technologies?.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: `${colors.professional.accent}15`,
                            color: colors.professional.primary,
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

// PropTypes validation
Professional.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
      phone: PropTypes.string,
    }).isRequired,
    email: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string.isRequired,
        institution: PropTypes.string.isRequired,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        score: PropTypes.string.isRequired,
      })
    ),
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }).isRequired,
};

export default Professional;
