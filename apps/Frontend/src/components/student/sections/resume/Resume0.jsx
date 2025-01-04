import React, { useState } from "react";
import Modern from "./utils/templates/Modern";
import Professional from "./utils/templates/Professional";
import Minimalist from "./utils/templates/Minimalist";
import Creative from "./utils/templates/Creative";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import {
  GitHub,
  Launch,
  Description,
  VideoLibrary,
  Email,
  School,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";

// Templates object start
const templates = {
  modern: {
    name: "Modern",
    component: Modern,
  },
  professional: {
    name: "Professional",
    component: Professional,
  },
  minimalist: {
    name: "Minimalist",
    component: Minimalist,
  },
  creative: {
    name: "Creative",
    component: Creative,
  },
};

// Main Component
const ResumeBuilder = ({ profile }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewOpen, setPreviewOpen] = useState(false);

  const downloadPDF = () => {
    const element = document.getElementById("resume-content");
    html2pdf()
      .set({
        margin: 0,
        filename: `${profile.personalInfo.name}_resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  const SelectedTemplate = templates[selectedTemplate].component;

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Resume Builder
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>Select Template:</Typography>
            <Grid container spacing={2}>
              {Object.entries(templates).map(([key, template]) => (
                <Grid item key={key}>
                  <Button
                    variant={
                      selectedTemplate === key ? "contained" : "outlined"
                    }
                    onClick={() => setSelectedTemplate(key)}
                    sx={{
                      minWidth: "120px",
                      textTransform: "capitalize",
                    }}
                  >
                    {template.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPreviewOpen(true)}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={downloadPDF}
              sx={{ ml: 2 }}
            >
              Download PDF
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Resume Preview
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPDF}
            sx={{ float: "right" }}
          >
            Download PDF
          </Button>
        </DialogTitle>
        <DialogContent>
          <SelectedTemplate data={profile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResumeBuilder;
