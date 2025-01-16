import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  pagination = {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (!columns || columns.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No columns defined</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || 'left'}
                  style={{ minWidth: column.width }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${row.id}-${column.field}`}
                      align={column.align || 'left'}
                    >
                      {column.renderCell
                        ? column.renderCell({ value: row[column.field], row })
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(_, newPage) => onPageChange?.(newPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange?.(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};

export default DataTable; 