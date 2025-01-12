import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      department: user?.department || '',
    });
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      showSuccess('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      showError('Failed to update profile');
    }
  };

  const recentActivities = [
    { action: 'Updated student record', time: '2 hours ago' },
    { action: 'Generated placement report', time: '1 day ago' },
    { action: 'Added new company', time: '2 days ago' },
  ];

  return (
    <Grid container spacing={3}>
      {/* Profile Overview */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.role}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Member since {new Date(user?.createdAt).getFullYear()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Profile Details */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Profile Details</Typography>
              {!editing ? (
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  variant="outlined"
                >
                  Edit
                </Button>
              ) : (
                <Box>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Box component="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    disabled={!editing}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem
                  key={index}
                  divider={index !== recentActivities.length - 1}
                >
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile; 