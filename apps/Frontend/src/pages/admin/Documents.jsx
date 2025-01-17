import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper } from '@mui/material';
import DocumentManager from '../../components/admin/documents/DocumentManager';
import DocumentUploader from '../../components/admin/documents/DocumentUploader';
import DocumentTemplates from '../../components/admin/documents/DocumentTemplates';
import DocumentArchive from '../../components/admin/documents/DocumentArchive';

const Documents = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Documents" />
          <Tab label="Upload Documents" />
          <Tab label="Templates" />
          <Tab label="Archive" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <DocumentManager />}
      {activeTab === 1 && <DocumentUploader />}
      {activeTab === 2 && <DocumentTemplates />}
      {activeTab === 3 && <DocumentArchive />}
    </Box>
  );
};

export default Documents;