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

const EducationEdit = ({ education, onEducationChange }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      year: "",
      score: "",
    };
    onEducationChange([...education, newEducation]);
    setExpandedPanel(`education-${education.length}`);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">Education</Typography>
          <Button startIcon={<AddIcon />} onClick={handleAddEducation}>
            Add Education
          </Button>
        </Box>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <Accordion
              key={index}
              expanded={expandedPanel === `education-${index}`}
              onChange={handleAccordionChange(`education-${index}`)}
              className="border rounded-lg"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="hover:bg-gray-50"
              >
                <Box className="flex justify-between items-center w-full pr-4">
                  <Typography>
                    {edu.institution
                      ? `${edu.degree} at ${edu.institution}`
                      : `Education ${index + 1}`}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEducationChange(
                        education.filter((_, i) => i !== index)
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
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = education.map((item, i) =>
                          i === index
                            ? { ...item, institution: e.target.value }
                            : item
                        );
                        onEducationChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = education.map((item, i) =>
                          i === index
                            ? { ...item, degree: e.target.value }
                            : item
                        );
                        onEducationChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      type="number"
                      value={edu.year}
                      onChange={(e) => {
                        const updated = education.map((item, i) =>
                          i === index ? { ...item, year: e.target.value } : item
                        );
                        onEducationChange(updated);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Score"
                      value={edu.score}
                      onChange={(e) => {
                        const updated = education.map((item, i) =>
                          i === index
                            ? { ...item, score: e.target.value }
                            : item
                        );
                        onEducationChange(updated);
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

export default EducationEdit;
