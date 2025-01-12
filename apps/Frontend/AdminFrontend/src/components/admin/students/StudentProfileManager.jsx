// components/admin/students/StudentProfileManager.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar
} from '@mui/material';
import {
  Save,
  Cancel,
  Upload,
  Delete,
  Add,
  Edit,
  CloudUpload
} from '@mui/icons-material';
import { useState } from 'react';

const StudentProfileManager = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: student?.firstName || '',
      lastName: student?.lastName || '',
      email: student?.email || '',
      phone: student?.phone || '',
      dateOfBirth: student?.dateOfBirth || '',
      gender: student?.gender || '',
      bloodGroup: student?.bloodGroup || '',
      address: student?.address || '',
      photo: student?.photo || null
    },
    academicInfo: {
      rollNo: student?.rollNo || '',
      registrationNo: student?.registrationNo || '',
      batch: student?.batch || '',
      branch: student?.branch || '',
      section: student?.section || '',
      semester: student?.semester || '',
      cgpa: student?.cgpa || '',
      backlogs: student?.backlogs || 0,
      attendance: student?.attendance || ''
    },
    documents: student?.documents || [],
    skills: student?.skills || [],
    certifications: student?.certifications || [],
    activities: student?.activities || []
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogData, setDialogData] = useState(null);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle photo upload
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('personalInfo', 'photo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    // Handle document upload
    const newDocuments = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString()
    }));
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const handleAddItem = (type) => {
    setDialogType(type);
    setDialogData(null);
    setOpenDialog(true);
  };

  const handleEditItem = (type, item) => {
    setDialogType(type);
    setDialogData(item);
    setOpenDialog(true);
  };

  const handleDialogSave = (data) => {
    switch (dialogType) {
      case 'skill':
        if (dialogData) {
          // Edit existing skill
          const updatedSkills = formData.skills.map(skill =>
            skill.id === dialogData.id ? data : skill
          );
          setFormData(prev => ({ ...prev, skills: updatedSkills }));
        } else {
          // Add new skill
          setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, { ...data, id: Date.now() }]
          }));
        }
        break;
      // Add cases for other types...
    }
    setOpenDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Avatar
                      src={formData.personalInfo.photo}
                      sx={{ width: 150, height: 150, margin: 'auto' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="photo-upload"
                      style={{ display: 'none' }}
                      onChange={handlePhotoUpload}
                    />
                    <label htmlFor="photo-upload">
                      <Button
                        component="span"
                        startIcon={<Upload />}
                        sx={{ mt: 2 }}
                      >
                        Upload Photo
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
                      />
                    </Grid>
                    {/* Add more personal info fields */}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Academic Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Information
              </Typography>
              <Grid container spacing={2}>
                {/* Add academic info fields */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Documents
                </Typography>
                <input
                  type="file"
                  multiple
                  id="document-upload"
                  style={{ display: 'none' }}
                  onChange={handleDocumentUpload}
                />
                <label htmlFor="document-upload">
                  <Button
                    component="span"
                    startIcon={<CloudUpload />}
                  >
                    Upload Documents
                  </Button>
                </label>
              </Box>
              <List>
                {formData.documents.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.type} • ${new Date(doc.uploadDate).toLocaleDateString()}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills and Certifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Skills & Certifications
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => handleAddItem('skill')}
                >
                  Add Skill
                </Button>
              </Box>
              <Box mb={3}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    onDelete={() => {/* Handle delete */}}
                    onClick={() => handleEditItem('skill', skill)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
              {/* Add certifications section */}
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              startIcon={<Cancel />}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogType === 'skill' ? 'Add Skill' : 'Add Item'}
        </DialogTitle>
        <DialogContent>
          {/* Add dialog content based on type */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => handleDialogSave({})}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfileManager;

