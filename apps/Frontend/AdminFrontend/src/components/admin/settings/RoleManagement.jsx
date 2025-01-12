import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Paper,
    Box
  } from '@mui/material';
  import { Edit, Delete, Add } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const RoleManagement = ({ roles, permissions, onAction }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
  
    const handleEdit = (role) => {
      setSelectedRole(role);
      setDialogOpen(true);
    };
  
    return (
      <>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Role Management</Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => handleEdit(null)}
              >
                Add Role
              </Button>
            </Box>
  
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role Name</TableCell>
                    {permissions.map((permission) => (
                      <TableCell key={permission.id} align="center">
                        {permission.name}
                      </TableCell>
                    ))}
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell component="th" scope="row">
                        {role.name}
                      </TableCell>
                      {permissions.map((permission) => (
                        <TableCell key={permission.id} align="center">
                          <Checkbox
                            checked={role.permissions.includes(permission.id)}
                            disabled
                          />
                        </TableCell>
                      ))}
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(role)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => onAction('delete', role)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
  
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedRole ? 'Edit Role' : 'Create Role'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Role Name"
              defaultValue={selectedRole?.name}
              sx={{ mt: 2, mb: 3 }}
            />
  
            <Typography variant="subtitle2" gutterBottom>
              Permissions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRole?.permissions.includes(permission.id)}
                        />
                      </TableCell>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onAction(selectedRole ? 'update' : 'create', selectedRole);
                setDialogOpen(false);
              }}
            >
              {selectedRole ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };