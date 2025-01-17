import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from '../../components/common/DataTable';
import { useTable } from '../../hooks/admin/useTable';
import { useTemplate } from '../../hooks/admin/useTemplate';

const Templates = () => {
  const { getTemplates } = useTemplate();
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Template Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'createdAt', headerName: 'Created Date', width: 150 },
    { field: 'lastModified', headerName: 'Last Modified', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const {
    data,
    loading,
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTable(getTemplates);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Document Templates
      </Typography>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default Templates; 