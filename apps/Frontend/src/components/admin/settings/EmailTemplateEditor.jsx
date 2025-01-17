import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from '@mui/material';
  import { Save, Preview } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const EmailTemplateEditor = ({ templates, onSave }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [content, setContent] = useState('');
    const [subject, setSubject] = useState('');
  
    const templateTypes = [
      { id: 'welcome', name: 'Welcome Email' },
      { id: 'interview', name: 'Interview Invitation' },
      { id: 'offer', name: 'Offer Letter' },
      { id: 'rejection', name: 'Rejection Email' },
    ];
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Email Template Editor
          </Typography>
  
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Template</InputLabel>
            <Select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              {templateTypes.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 2 }}
          />
  
          <TextField
            fullWidth
            multiline
            rows={10}
            label="Template Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
  
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => onSave({ id: selectedTemplate, subject, content })}
            >
              Save Template
            </Button>
            <Button
              variant="outlined"
              startIcon={<Preview />}
            >
              Preview
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };