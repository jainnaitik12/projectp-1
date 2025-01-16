import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    CircularProgress,
    IconButton,
    Tooltip,
    Alert
  } from '@mui/material';
  import {
    Speed,
    Memory,
    Storage,
    Refresh,
    Warning,
    CheckCircle,
    Error
  } from '@mui/icons-material';
  import { useState, useEffect } from 'react';
  
  export const PerformanceMetrics = ({ onRefresh }) => {
    const [metrics, setMetrics] = useState({
      api: {
        responseTime: 0,
        requestsPerMinute: 0,
        errorRate: 0,
        status: 'healthy'
      },
      database: {
        connections: 0,
        queryTime: 0,
        diskUsage: 0,
        status: 'healthy'
      },
      cache: {
        hitRate: 0,
        missRate: 0,
        memoryUsage: 0,
        status: 'healthy'
      }
    });
  
    const getStatusIcon = (status) => {
      switch(status) {
        case 'healthy':
          return <CheckCircle color="success" />;
        case 'warning':
          return <Warning color="warning" />;
        case 'error':
          return <Error color="error" />;
        default:
          return null;
      }
    };
  
    const MetricCard = ({ title, value, unit, icon, status, details }) => (
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              {icon}
              <Typography variant="h6">{title}</Typography>
            </Box>
            {getStatusIcon(status)}
          </Box>
          
          <Typography variant="h4" gutterBottom>
            {value}
            <Typography component="span" variant="body2" color="textSecondary">
              {unit}
            </Typography>
          </Typography>
  
          <Box mt={2}>
            {details.map((detail, index) => (
              <Box 
                key={index}
                display="flex" 
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Typography variant="body2" color="textSecondary">
                  {detail.label}
                </Typography>
                <Typography variant="body2">
                  {detail.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">System Performance Metrics</Typography>
            <IconButton onClick={onRefresh}>
              <Refresh />
            </IconButton>
          </Box>
  
          {metrics.api.status === 'error' && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Critical system performance issues detected
            </Alert>
          )}
  
          <Grid container spacing={3}>
            {/* API Performance */}
            <Grid item xs={12} md={4}>
              <MetricCard
                title="API Performance"
                value={metrics.api.responseTime}
                unit="ms"
                icon={<Speed color="primary" />}
                status={metrics.api.status}
                details={[
                  { label: 'Requests/min', value: metrics.api.requestsPerMinute },
                  { label: 'Error Rate', value: `${metrics.api.errorRate}%` }
                ]}
              />
            </Grid>
  
            {/* Database Performance */}
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Database Performance"
                value={metrics.database.queryTime}
                unit="ms"
                icon={<Storage color="primary" />}
                status={metrics.database.status}
                details={[
                  { label: 'Active Connections', value: metrics.database.connections },
                  { label: 'Disk Usage', value: `${metrics.database.diskUsage}%` }
                ]}
              />
            </Grid>
  
            {/* Cache Performance */}
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Cache Performance"
                value={metrics.cache.hitRate}
                unit="%"
                icon={<Memory color="primary" />}
                status={metrics.cache.status}
                details={[
                  { label: 'Miss Rate', value: `${metrics.cache.missRate}%` },
                  { label: 'Memory Usage', value: `${metrics.cache.memoryUsage}%` }
                ]}
              />
            </Grid>
          </Grid>
  
          {/* Real-time Metrics Graph */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Real-time Performance
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Response Time Trend
                    </Typography>
                    {/* Add Line Chart Component Here */}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Request Volume
                    </Typography>
                    {/* Add Bar Chart Component Here */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
  
          {/* System Alerts */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Recent Alerts
            </Typography>
            <Card variant="outlined">
              <CardContent>
                {/* Add Alert List Component Here */}
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    );
  };
  