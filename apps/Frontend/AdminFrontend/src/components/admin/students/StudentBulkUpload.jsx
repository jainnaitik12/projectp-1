import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Link,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  Download,
  CheckCircle,
  Error,
  Delete,
  Refresh
} from '@mui/icons-material';
import { useState } from 'react';
import studentService from '../../../services/admin/studentService';
import { API_BASE_URL } from '../../../config/constants';

const StudentBulkUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);

    studentService.bulkImport(formData).then(response => {
      setUploading(false);
      setUploadResults(response);
    }).catch(error => {
      setUploading(false);
      console.error('Upload failed:', error);
    });
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/students/template`;
    link.setAttribute('download', 'student_template.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bulk Student Upload
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Download the template file, fill in the student details, and upload it back.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{ mr: 2 }}
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
              >
                Download Sample File
              </Button>
            </Box>

            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                mb: 3
              }}
            >
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Select File
                </Button>
              </label>
              {selectedFile && (
                <Box>
                  <Typography variant="body2">
                    Selected file: {selectedFile.name}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={uploading}
                    sx={{ mt: 2 }}
                  >
                    Upload and Process
                  </Button>
                </Box>
              )}
            </Box>

            {uploading && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading and processing...
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {uploadResults && (
              <Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Total Records
                        </Typography>
                        <Typography variant="h4">
                          {uploadResults.total}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="success.main" gutterBottom>
                          Successful
                        </Typography>
                        <Typography variant="h4" color="success.main">
                          {uploadResults.successful}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="error.main" gutterBottom>
                          Failed
                        </Typography>
                        <Typography variant="h4" color="error.main">
                          {uploadResults.failed}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {uploadResults.errors.length > 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Error Details
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Row</TableCell>
                          <TableCell>Error</TableCell>
                          <TableCell>Data</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {uploadResults.errors.map((error, index) => (
                          <TableRow key={index}>
                            <TableCell>{error.row}</TableCell>
                            <TableCell>{error.error}</TableCell>
                            <TableCell>{error.data}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentBulkUpload;
