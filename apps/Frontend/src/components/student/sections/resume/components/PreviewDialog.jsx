import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  Stack,
} from "@mui/material";
import { Close, Print, Download } from "@mui/icons-material";
import { ZoomControls } from "./ZoomControls";
import { generatePDF } from "../utils/pdfGenerator";

export const PreviewDialog = ({
  open,
  onClose,
  zoom,
  onZoomChange,
  isGenerating,
  setIsGenerating,
  profile,
  SelectedTemplate,
  fullScreen,
}) => {
  const [error, setError] = React.useState(null);

  const handleDownload = async () => {
    setError(null);
    setIsGenerating(true);
    try {
      await generatePDF("resume-preview-content", profile);
    } catch (err) {
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: fullScreen ? "100%" : "90vh",
          width: "100%",
          maxWidth: "1200px",
        },
      }}
    >
      <DialogTitle sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <ZoomControls zoom={zoom} onZoomChange={onZoomChange} />
          <Tooltip title="Download PDF">
            <IconButton
              onClick={handleDownload}
              disabled={isGenerating}
              color="primary"
            >
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()} color="primary">
              <Print />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      {isGenerating && <LinearProgress />}

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <DialogContent
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          minHeight: "100%",
        }}
      >
        <Box
          id="resume-preview-content"
          sx={{
            width: "210mm",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.2s",
            backgroundColor: "white",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            my: 2,
          }}
        >
          <SelectedTemplate data={profile} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
