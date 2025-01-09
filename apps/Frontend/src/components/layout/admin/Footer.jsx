import { Box, Typography, Link, useTheme } from '@mui/material';
import { APP_CONFIG } from '../../../config/constants';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {currentYear} {APP_CONFIG.name} v{APP_CONFIG.version}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            href="#"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'none' }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'none' }}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'none' }}
          >
            Contact Support
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer; 