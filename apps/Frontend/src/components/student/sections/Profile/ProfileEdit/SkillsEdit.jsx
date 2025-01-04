import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const SkillsEdit = ({ skills, onSkillsChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      onSkillsChange([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Box className="flex gap-2 mb-4">
          <TextField
            size="small"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button
            variant="contained"
            onClick={handleAddSkill}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => onSkillsChange(skills.filter((s) => s !== skill))}
              color="primary"
              variant="outlined"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsEdit;
