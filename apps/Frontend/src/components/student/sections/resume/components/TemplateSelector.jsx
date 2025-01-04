import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { templates } from "../utils/templates";

export const TemplateSelector = ({
  selectedTemplate,
  onTemplateSelect,
  theme,
}) => (
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
          onClick={() => onTemplateSelect(key)}
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
);
