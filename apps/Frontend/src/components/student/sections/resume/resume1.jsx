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
  IconButton,
  Tooltip,
  Slider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Close,
  Print,
  Share,
  Preview,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";

const templates = {
  modern: {
    name: "Modern",
    component: Modern,
    thumbnail: "/templates/modern.png",
  },
  professional: {
    name: "Professional",
    component: Professional,
    thumbnail: "/templates/professional.png",
  },
  minimalist: {
    name: "Minimalist",
    component: Minimalist,
    thumbnail: "/templates/minimalist.png",
  },
  creative: {
    name: "Creative",
    component: Creative,
    thumbnail: "/templates/creative.png",
  },
};

const ResumeBuilder = ({ profile }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleZoomChange = (_, newValue) => {
    setZoom(newValue);
  };

  const downloadPDF = async () => {
    setIsGenerating(true);
    const element = document.getElementById("resume-content");
    try {
      await html2pdf()
        .set({
          margin: 1,
          filename: `${profile.personalInfo.name}_resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: true,
          },
        })
        .from(element)
        .save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const SelectedTemplate = templates[selectedTemplate].component;

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Resume Builder
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select Template:
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(templates).map(([key, template]) => (
                <Grid item xs={6} sm={3} key={key}>
                  <Paper
                    elevation={selectedTemplate === key ? 8 : 1}
                    sx={{
                      p: 1,
                      cursor: "pointer",
                      border:
                        selectedTemplate === key
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                      "&:hover": {
                        elevation: 4,
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                    onClick={() => setSelectedTemplate(key)}
                  >
                    <Box
                      component="img"
                      src={template.thumbnail}
                      alt={template.name}
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 1,
                      }}
                    />
                    <Typography
                      align="center"
                      sx={{
                        mt: 1,
                        fontWeight: selectedTemplate === key ? 600 : 400,
                      }}
                    >
                      {template.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<Preview />}
                onClick={() => setPreviewOpen(true)}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                startIcon={
                  isGenerating ? <CircularProgress size={20} /> : <Download />
                }
                onClick={downloadPDF}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating PDF..." : "Download PDF"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        fullScreen={fullScreen}
        maxWidth="lg"
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        PaperProps={{
          sx: {
            height: fullScreen ? "100%" : "90vh",
            maxWidth: fullScreen ? "100%" : "1000px",
            margin: fullScreen ? 0 : 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6">Resume Preview</Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Zoom Out">
              <IconButton
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                disabled={zoom <= 50}
              >
                <ZoomOut />
              </IconButton>
            </Tooltip>
            <Slider
              value={zoom}
              onChange={handleZoomChange}
              min={50}
              max={150}
              sx={{ width: 100 }}
            />
            <Tooltip title="Zoom In">
              <IconButton
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                disabled={zoom >= 150}
              >
                <ZoomIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={() => window.print()}>
                <Print />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download PDF">
              <IconButton
                onClick={downloadPDF}
                disabled={isGenerating}
                color="primary"
              >
                {isGenerating ? <CircularProgress size={24} /> : <Download />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={() => setPreviewOpen(false)}>
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            bgcolor: "grey.100",
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
              my: 2,
              bgcolor: "white",
              boxShadow: 3,
              "@media print": {
                boxShadow: "none",
                margin: 0,
              },
            }}
          >
            <SelectedTemplate data={profile} />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ResumeBuilder;
