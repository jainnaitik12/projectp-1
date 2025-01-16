import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar 
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const AnalyticsCard = ({ title, count, percentage, icon, color }) => {
  const isPositive = percentage > 0;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {count}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {isPositive ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? 'success.main' : 'error.main',
                  ml: 0.5,
                }}
              >
                {Math.abs(percentage)}%
              </Typography>
            </Box>
          </Box>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard; 