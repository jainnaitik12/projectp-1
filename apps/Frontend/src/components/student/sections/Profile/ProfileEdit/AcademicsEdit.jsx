import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Tooltip,
  Box,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

const AcademicsEdit = ({ data = {}, isLocked, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex items-center justify-between mb-3">
          <Typography variant="h6">Academic Information</Typography>
          {isLocked && (
            <Tooltip title="Information Locked">
              <Lock color="primary" />
            </Tooltip>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="CGPA"
              name="cgpa"
              type="number"
              inputProps={{
                step: "0.01",
                min: "0",
                max: "10",
              }}
              value={data?.cgpa || ""}
              onChange={handleChange}
              disabled={isLocked}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="10th Marks (%)"
              name="tenthMarks"
              type="number"
              inputProps={{
                min: "0",
                max: "100",
              }}
              value={data?.tenthMarks || ""}
              onChange={handleChange}
              disabled={isLocked}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="12th Marks (%)"
              name="twelfthMarks"
              type="number"
              inputProps={{
                min: "0",
                max: "100",
              }}
              value={data?.twelfthMarks || ""}
              onChange={handleChange}
              disabled={isLocked}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AcademicsEdit;
