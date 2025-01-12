import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Restore,
  Delete,
  PictureAsPdf,
  Description,
  InsertDriveFile
} from '@mui/icons-material';
import { useState } from 'react';

const DocumentArchive = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const archivedDocs = [
    {
      id: 1,
      name: 'Placement Policy 2023',
      type: 'pdf',
      archivedDate: '2024-01-15',
      archivedBy: 'Admin',
      reason: 'Outdated',
      size: '2.1 MB'
    },
    // Add more archived documents...
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'docx':
        return <Description color="primary" />;
      default:
        return <InsertDriveFile />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Archived Documents</Typography>
          <TextField
            size="small"
            placeholder="Search archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Archived Date</TableCell>
              <TableCell>Archived By</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivedDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <Box display="flex" gap={1} alignItems="center">
                    {getFileIcon(doc.type)}
                    <Typography variant="body2">
                      {doc.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={doc.type.toUpperCase()}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{new Date(doc.archivedDate).toLocaleDateString()}</TableCell>
                <TableCell>{doc.archivedBy}</TableCell>
                <TableCell>{doc.reason}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <IconButton size="small" title="Restore">
                    <Restore color="primary" />
                  </IconButton>
                  <IconButton size="small" title="Delete Permanently">
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentArchive; 