import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
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

const ExperienceEdit = ({ experience, onExperienceChange }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAddExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    onExperienceChange([...experience, newExperience]);
    setExpandedPanel(`experience-${experience.length}`);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">Experience</Typography>
          <Button startIcon={<AddIcon />} onClick={handleAddExperience}>
            Add Experience
          </Button>
        </Box>

        <div className="space-y-4">
          {experience.map((exp, index) => (
            <Accordion
              key={index}
              expanded={expandedPanel === `experience-${index}`}
              onChange={handleAccordionChange(`experience-${index}`)}
              className="border rounded-lg"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="hover:bg-gray-50"
              >
                <Box className="flex justify-between items-center w-full pr-4">
                  <Typography>
                    {exp.title
                      ? `${exp.title} at ${exp.company}`
                      : `Experience ${index + 1}`}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExperienceChange(
                        experience.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Title"
                      value={exp.title}
                      onChange={(e) => {
                        const updated = experience.map((item, i) =>
                          i === index
                            ? { ...item, title: e.target.value }
                            : item
                        );
                        onExperienceChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = experience.map((item, i) =>
                          i === index
                            ? { ...item, company: e.target.value }
                            : item
                        );
                        onExperienceChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = experience.map((item, i) =>
                          i === index
                            ? { ...item, duration: e.target.value }
                            : item
                        );
                        onExperienceChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const updated = experience.map((item, i) =>
                          i === index
                            ? { ...item, description: e.target.value }
                            : item
                        );
                        onExperienceChange(updated);
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

export default ExperienceEdit;
