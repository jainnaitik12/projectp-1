import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  useTheme,
  Box,
  useMediaQuery,
  Alert,
  Tooltip,
  Link,
  IconButton,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Preview,
  Edit,
  ArrowForward,
  PersonOutline,
  Download,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { templates } from "./utils/templates";
import { TemplateSelector } from "./components/TemplateSelector";
import { PreviewDialog } from "./components/PreviewDialog";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { motion } from "framer-motion";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { student } = useOutletContext();
  const theme = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);

  const SelectedTemplate = templates[selectedTemplate].component;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section with Profile Update */}
          <Paper
            elevation={0}
            sx={{
              background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
              borderRadius: "24px",
              p: { xs: 3, md: 5 },
              mb: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Decoration */}
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Resume Builder
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mb: 3,
                }}
              >
                Create a professional resume in minutes
              </Typography>

              <Alert
                severity="info"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  maxWidth: "fit-content",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Want to update your resume content?
                  <Button
                    onClick={() =>
                      navigate(`/student/${student._id}/profile/edit`)
                    }
                    startIcon={<Edit />}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Alert>
            </Box>
          </Paper>

          {/* Template Selection Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              mb: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              Choose Your Template
            </Typography>

            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              theme={theme}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<Preview />}
                onClick={() => setPreviewOpen(true)}
                sx={{
                  background:
                    "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #34495e 0%, #2980b9 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                Preview & Download
              </Button>
            </Box>
          </Paper>

          <PreviewDialog
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            zoom={zoom}
            onZoomChange={setZoom}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            profile={student}
            SelectedTemplate={SelectedTemplate}
            fullScreen={isSmallScreen}
          />
        </motion.div>
      </Container>
    </ErrorBoundary>
  );
};

export default ResumeBuilder;
