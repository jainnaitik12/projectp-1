import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { validatePassword } from '../../utils/validators';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Get token from URL query params
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password
    const { isValid, errors } = validatePassword(formData.password);
    if (!isValid) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await resetPassword(token, formData.password);
      showSuccess('Password has been reset successfully');
      navigate('/auth/login');
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      showError('Failed to reset password');
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!token) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Invalid Reset Link
        </Typography>
        <Typography variant="body1" paragraph>
          The password reset link is invalid or has expired.
        </Typography>
        <Button
          component={RouterLink}
          to="/auth/forgot-password"
          variant="contained"
          fullWidth
        >
          Request New Reset Link
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Please enter your new password.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange('password')}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          margin="normal"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>

        <Typography variant="body2" align="center">
          Remember your password?{' '}
          <Link component={RouterLink} to="/auth/login">
            Back to Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword; 