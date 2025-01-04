import React from "react";
import { Box, IconButton, Tooltip, Slider } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";

export const ZoomControls = ({ zoom, onZoomChange }) => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
    <Tooltip title="Zoom Out">
      <IconButton
        onClick={() => onZoomChange(Math.max(50, zoom - 10))}
        disabled={zoom <= 50}
      >
        <ZoomOut />
      </IconButton>
    </Tooltip>
    <Slider
      value={zoom}
      onChange={(_, value) => onZoomChange(value)}
      min={50}
      max={150}
      sx={{ width: 100 }}
    />
    <Tooltip title="Zoom In">
      <IconButton
        onClick={() => onZoomChange(Math.min(150, zoom + 10))}
        disabled={zoom >= 150}
      >
        <ZoomIn />
      </IconButton>
    </Tooltip>
  </Box>
);
