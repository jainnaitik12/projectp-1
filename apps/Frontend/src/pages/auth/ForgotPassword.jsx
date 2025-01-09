import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      showSuccess('Password reset instructions have been sent to your email');
    } catch (err) {
      setError(err.message || 'Failed to process request');
      showError('Failed to send reset instructions');
    }
  };

  if (isSubmitted) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1" paragraph>
          We've sent password reset instructions to {email}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Didn't receive the email? Check your spam folder or{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsSubmitted(false)}
          >
            try again
          </Link>
        </Typography>
        <Button
          component={RouterLink}
          to="/auth/login"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Back to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Enter your email address and we'll send you instructions to reset your
        password.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Instructions
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

export default ForgotPassword; 