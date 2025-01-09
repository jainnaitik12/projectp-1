// components/admin/backup/DataBackupManager.jsx
export const DataBackupManager = () => {
    const [backups, setBackups] = useState([
      {
        id: 1,
        type: 'full',
        date: '2024-02-20T00:00:00',
        size: '1.2GB',
        status: 'completed'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Data Backup Management</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Schedule />}
                onClick={() => {/* Configure schedule */}}
              >
                Schedule
              </Button>
              <Button
                variant="contained"
                startIcon={<Backup />}
                onClick={() => {/* Start backup */}}
              >
                Backup Now
              </Button>
            </Box>
          </Box>
  
          <Grid container spacing={3}>
            {/* Backup Status */}
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Last Backup
                  </Typography>
                  <Typography variant="h5">
                    {new Date(backups[0]?.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Size: {backups[0]?.size}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Storage Usage */}
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Storage Usage
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={70}
                    sx={{ mt: 2, mb: 1 }}
                  />
                  <Typography variant="body2">
                    70% of allocated storage used
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Backup Schedule */}
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Next Scheduled Backup
                  </Typography>
                  <Typography variant="h5">
                    Tomorrow, 02:00 AM
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    sx={{ mt: 1 }}
                  >
                    Change Schedule
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
  
          {/* Backup History */}
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Backup History
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        {new Date(backup.date).toLocaleString()}
                      </TableCell>
                      <TableCell>{backup.type}</TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>
                        <Chip
                          label={backup.status}
                          color={backup.status === 'completed' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <Download />
                        </IconButton>
                        <IconButton size="small">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };
  