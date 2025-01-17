import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't render breadcrumbs on root path
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <MuiBreadcrumbs 
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to="/"
      >
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // Convert path to display text (e.g., 'admin' -> 'Admin')
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        return isLast ? (
          <Typography color="text.primary" key={name}>
            {displayName}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={routeTo}
            key={name}
          >
            {displayName}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs; 