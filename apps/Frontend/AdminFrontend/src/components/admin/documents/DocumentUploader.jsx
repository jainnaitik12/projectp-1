import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  LinearProgress
} from '@mui/material';
import { CloudUpload, Clear } from '@mui/icons-material';
import { useState } from 'react';

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    access: '',
    description: ''
  });

  const handleFileDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    setUploading(true);
    // Implement upload logic here
    setTimeout(() => {
      setUploading(false);
      setFiles([]);
      setFormData({ category: '', access: '', description: '' });
    }, 2000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Documents
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                border: '2px dashed #ccc',
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main'
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                type="file"
                id="file-input"
                multiple
                hidden
                onChange={handleFileSelect}
              />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & Drop Files Here
              </Typography>
              <Typography variant="body2" color="textSecondary">
                or click to browse
              </Typography>
            </Paper>

            {files.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Files:
                </Typography>
                {files.map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                    mb={1}
                    bgcolor="grey.50"
                    borderRadius={1}
                  >
                    <Typography variant="body2">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <Clear />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Policy">Policy</MenuItem>
                <MenuItem value="Template">Template</MenuItem>
                <MenuItem value="Notice">Notice</MenuItem>
                <MenuItem value="Report">Report</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Access Level</InputLabel>
              <Select
                value={formData.access}
                label="Access Level"
                onChange={(e) => setFormData({ ...formData, access: e.target.value })}
              >
                <MenuItem value="all">All Students</MenuItem>
                <MenuItem value="staff">Staff Only</MenuItem>
                <MenuItem value="admin">Admin Only</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={files.length === 0 || uploading}
              onClick={handleUpload}
            >
              Upload Files
            </Button>

            {uploading && (
              <Box mt={2}>
                <LinearProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader; 