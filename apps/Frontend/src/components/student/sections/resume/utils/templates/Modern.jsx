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
  Description,
  VideoLibrary,
  LinkedIn,
  Email,
  Phone,
} from "@mui/icons-material";
import { colors } from "./colors";
import PropTypes from "prop-types";

const Modern = ({ data }) => {
  const { personalInfo, academics, skills, education, experience, projects } =
    data;

  const renderSectionTitle = (title) => (
    <Typography
      variant="h6"
      sx={{
        color: colors.modern.primary,
        borderBottom: `2px solid ${colors.modern.accent}`,
        pb: 1,
        mb: 3,
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>
  );

  const renderSkillChip = (skill, index) => (
    <Chip
      key={index}
      label={skill}
      sx={{
        backgroundColor: colors.modern.accent,
        color: colors.modern.primary,
        fontWeight: 500,
        "&:hover": {
          backgroundColor: colors.modern.primary,
          color: "#fff",
        },
      }}
    />
  );

  const renderProjectLinks = (links) => {
    const iconMap = {
      github: <GitHub />,
      live: <Launch />,
      documentation: <Description />,
      video: <VideoLibrary />,
    };

    return links.map((link, i) => (
      <Link
        key={i}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          color: colors.modern.primary,
          textDecoration: "none",
          mr: 2,
          "&:hover": {
            color: colors.modern.accent,
          },
        }}
      >
        {iconMap[link.type]}
        {link.type}
      </Link>
    ));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "210mm",
        minHeight: "297mm",
        height: "auto",
        p: "20mm",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        pageBreakAfter: "always",
        "@media print": {
          margin: 0,
          padding: "20mm",
          boxShadow: "none",
          width: "210mm",
          minHeight: "297mm",
          height: "auto",
          breakInside: "avoid",
          pageBreakInside: "avoid",
        },
      }}
      id="resume-content"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              color: colors.modern.primary,
              fontWeight: 700,
              letterSpacing: 1,
              mb: 0,
            }}
          >
            {personalInfo.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: colors.modern.secondary, mb: 2 }}
          >
            {personalInfo.department} • Batch of {personalInfo.batch}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Email fontSize="small" />
              {data.email}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Phone fontSize="small" />
              {personalInfo.phone}
            </Box>
          </Box>
          <Divider sx={{ mt: 2, mb: 4 }} />
        </Box>

        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={4}>
            <Box sx={{ height: "100%" }}>
              {/* Skills Section */}
              {renderSectionTitle("Technical Skills")}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {skills.map((skill, index) => renderSkillChip(skill, index))}
              </Box>

              {/* Education Section */}
              {renderSectionTitle("Education")}
              <Box sx={{ mb: 4 }}>
                {education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      sx={{ fontWeight: 600, color: colors.modern.primary }}
                    >
                      {edu.degree}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: colors.modern.secondary }}
                    >
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2">
                      Year: {edu.year} | Score: {edu.score}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Academic Performance */}
              {renderSectionTitle("Academics")}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ mb: 1 }}>
                  CGPA: <strong>{academics.cgpa}</strong>
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Class XII: <strong>{academics.twelfthMarks}%</strong>
                </Typography>
                <Typography>
                  Class X: <strong>{academics.tenthMarks}%</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={8}>
            {/* Experience Section */}
            {experience.length > 0 && (
              <Box sx={{ mb: 5 }}>
                {renderSectionTitle("Professional Experience")}
                {experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: colors.modern.primary, fontWeight: 600 }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography sx={{ color: colors.modern.secondary, mb: 1 }}>
                      {exp.company} • {exp.duration}
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                      {exp.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Projects Section */}
            {projects?.length > 0 && (
              <Box>
                {renderSectionTitle("Notable Projects")}
                {projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: colors.modern.primary, fontWeight: 600 }}
                    >
                      {project.title}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                    >
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: `${colors.modern.accent}20`,
                            color: colors.modern.primary,
                            border: `1px solid ${colors.modern.accent}`,
                          }}
                        />
                      ))}
                    </Box>
                    {project.links && (
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {renderProjectLinks(project.links)}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

Modern.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rollNumber: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
      phone: PropTypes.string,
    }).isRequired,
    academics: PropTypes.shape({
      cgpa: PropTypes.number.isRequired,
      tenthMarks: PropTypes.number.isRequired,
      twelfthMarks: PropTypes.number.isRequired,
    }).isRequired,
    email: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        institution: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        score: PropTypes.string.isRequired,
      })
    ).isRequired,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
};

export default Modern;
