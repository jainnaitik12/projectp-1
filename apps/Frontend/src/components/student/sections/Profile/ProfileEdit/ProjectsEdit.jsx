import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Box,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const ProjectsEdit = ({ projects, onProjectsChange }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAddProject = () => {
    const newProject = {
      title: "",
      description: "",
      technologies: [],
      links: [{ type: "github", url: "" }],
    };
    onProjectsChange([...projects, newProject]);
    // Auto expand newly added project
    setExpandedPanel(`project-${projects.length}`);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">Projects</Typography>
          <Button startIcon={<AddIcon />} onClick={handleAddProject}>
            Add Project
          </Button>
        </Box>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <Accordion
              key={index}
              expanded={expandedPanel === `project-${index}`}
              onChange={handleAccordionChange(`project-${index}`)}
              className="border rounded-lg"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="hover:bg-gray-50"
              >
                <Box className="flex justify-between items-center w-full pr-4">
                  <Typography>
                    {project.title || `Project ${index + 1}`}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectsChange(projects.filter((_, i) => i !== index));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Title"
                      value={project.title}
                      onChange={(e) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = {
                          ...project,
                          title: e.target.value,
                        };
                        onProjectsChange(updatedProjects);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      value={project.description}
                      onChange={(e) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = {
                          ...project,
                          description: e.target.value,
                        };
                        onProjectsChange(updatedProjects);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Technologies
                    </Typography>
                    <Box className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          onDelete={() => {
                            const updatedProjects = [...projects];
                            updatedProjects[index] = {
                              ...project,
                              technologies: project.technologies.filter(
                                (_, i) => i !== techIndex
                              ),
                            };
                            onProjectsChange(updatedProjects);
                          }}
                        />
                      ))}
                    </Box>
                    <TextField
                      size="small"
                      placeholder="Add technology and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          const updatedProjects = [...projects];
                          updatedProjects[index] = {
                            ...project,
                            technologies: [
                              ...project.technologies,
                              e.target.value.trim(),
                            ],
                          };
                          onProjectsChange(updatedProjects);
                          e.target.value = "";
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="GitHub URL"
                      value={project.links[0]?.url || ""}
                      onChange={(e) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = {
                          ...project,
                          links: [{ type: "github", url: e.target.value }],
                        };
                        onProjectsChange(updatedProjects);
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsEdit;
