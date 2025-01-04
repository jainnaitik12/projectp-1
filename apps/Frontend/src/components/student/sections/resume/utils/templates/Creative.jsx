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
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import PropTypes from "prop-types";
const Creative = ({ data }) => {
  const { personalInfo, academics, skills, education, experience, projects } =
    data;

  const SectionTitle = ({ children }) => (
    <Typography
      variant="h6"
      sx={{
        color: "#1a237e",
        borderBottom: "2px solid #1a237e",
        pb: 0.5,
        mb: 2,
        fontWeight: 600,
        fontSize: "1.1rem",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {children}
    </Typography>
  );

  const SkillChip = ({ skill }) => (
    <Chip
      label={skill}
      sx={{
        m: 0.5,
        backgroundColor: "#e8eaf6",
        color: "#1a237e",
        border: "1px solid #1a237e",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "#1a237e",
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
        p: "15mm",
        backgroundColor: "#fff",
        "@media print": {
          margin: 0,
          boxShadow: "none",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#1a237e",
            fontWeight: 700,
            mb: 1,
            letterSpacing: 1,
          }}
        >
          {personalInfo.name}
        </Typography>
        <Typography
          sx={{
            color: "#455a64",
            mb: 2,
            fontSize: "1rem",
            letterSpacing: 0.5,
          }}
        >
          {personalInfo.department} • {personalInfo.batch}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            color: "#455a64",
            fontSize: "0.9rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Email fontSize="small" />
            {data.email}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Phone fontSize="small" />
            {personalInfo.phone}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOn fontSize="small" />
            {personalInfo.location}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={4}>
          <Box sx={{ pr: 2 }}>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600, color: "#1a237e" }}>
                  {edu.degree}
                </Typography>
                <Typography variant="body2" sx={{ color: "#455a64" }}>
                  {edu.institution}
                </Typography>
                <Typography variant="body2" sx={{ color: "#546e7a" }}>
                  {edu.year} • {edu.score}
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 3 }}>
              <SectionTitle>Technical Skills</SectionTitle>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {skills.map((skill, index) => (
                  <SkillChip key={index} skill={skill} />
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <SectionTitle>Academics</SectionTitle>
              <Typography sx={{ mb: 1, color: "#455a64" }}>
                CGPA: <strong>{academics.cgpa}</strong>
              </Typography>
              <Typography sx={{ mb: 1, color: "#455a64" }}>
                Class XII: <strong>{academics.twelfthMarks}%</strong>
              </Typography>
              <Typography sx={{ color: "#455a64" }}>
                Class X: <strong>{academics.tenthMarks}%</strong>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={8}>
          <Box sx={{ pl: 2 }}>
            {experience.length > 0 && (
              <>
                <SectionTitle>Experience</SectionTitle>
                {experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1a237e",
                        fontSize: "1.1rem",
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography
                      sx={{ color: "#455a64", mb: 1, fontStyle: "italic" }}
                    >
                      {exp.company} • {exp.duration}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#546e7a",
                        whiteSpace: "pre-line",
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </Box>
                ))}
              </>
            )}

            {projects?.length > 0 && (
              <>
                <SectionTitle>Projects</SectionTitle>
                {projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1a237e",
                        fontSize: "1.1rem",
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      sx={{ color: "#546e7a", mb: 1, lineHeight: 1.6 }}
                    >
                      {project.description}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}
                    >
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: "#e8eaf6",
                            color: "#1a237e",
                            border: "1px solid #c5cae9",
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
                              color: "#1a237e",
                              textDecoration: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              "&:hover": {
                                color: "#303f9f",
                              },
                            }}
                          >
                            {link.type === "github" && (
                              <GitHub fontSize="small" />
                            )}
                            {link.type === "live" && (
                              <Launch fontSize="small" />
                            )}
                            {link.type}
                          </Link>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Creative;
