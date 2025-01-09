// components/admin/monitoring/SystemHealthDashboard.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  IconButton,
  Tooltip,
  Alert,
  Chip
} from '@mui/material';
import {
  Memory,
  Storage,
  Speed,
  Refresh,
  Warning,
  CheckCircle,
  Error,
  CloudQueue
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

export const SystemHealthDashboard = ({ onRefresh }) => {
  const [metrics, setMetrics] = useState({
    system: {
      cpu: {
        usage: 45,
        temperature: 65,
        status: 'healthy'
      },
      memory: {
        total: 16,
        used: 8.5,
        status: 'warning'
      },
      storage: {
        total: 500,
        used: 350,
        status: 'healthy'
      }
    },
    application: {
      activeUsers: 120,
      responseTime: 250,
      errorRate: 0.5,
      status: 'healthy'
    },
    database: {
      connections: 25,
      queryTime: 150,
      status: 'healthy'
    }
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
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
          <Chip 
            label={status}
            color={getStatusColor(status)}
            size="small"
          />
        </Box>

        <Typography variant="h4" gutterBottom>
          {value}
          <Typography component="span" variant="body2" color="textSecondary" ml={1}>
            {unit}
          </Typography>
        </Typography>

        {details && (
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
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">System Health Dashboard</Typography>
        <IconButton onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </Box>

      {metrics.system.status === 'critical' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Critical system issues detected! Immediate attention required.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* CPU Usage */}
        <Grid item xs={12} md={4}>
          <MetricCard
            title="CPU Usage"
            value={metrics.system.cpu.usage}
            unit="%"
            icon={<Memory color="primary" />}
            status={metrics.system.cpu.status}
            details={[
              { label: 'Temperature', value: `${metrics.system.cpu.temperature}°C` },
              { label: 'Processes', value: '125 active' }
            ]}
          />
        </Grid>

        {/* Memory Usage */}
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Memory Usage"
            value={metrics.system.memory.used}
            unit={`/ ${metrics.system.memory.total} GB`}
            icon={<Storage color="primary" />}
            status={metrics.system.memory.status}
            details={[
              { label: 'Available', value: `${metrics.system.memory.total - metrics.system.memory.used} GB` },
              { label: 'Swap Usage', value: '2.1 GB' }
            ]}
          />
        </Grid>

        {/* Storage Usage */}
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Storage Usage"
            value={Math.round((metrics.system.storage.used / metrics.system.storage.total) * 100)}
            unit="%"
            icon={<CloudQueue color="primary" />}
            status={metrics.system.storage.status}
            details={[
              { label: 'Total Space', value: `${metrics.system.storage.total} GB` },
              { label: 'Free Space', value: `${metrics.system.storage.total - metrics.system.storage.used} GB` }
            ]}
          />
        </Grid>

        {/* Application Performance */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Performance
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Active Users</Typography>
                    <Typography variant="h4">{metrics.application.activeUsers}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Response Time</Typography>
                    <Typography variant="h4">
                      {metrics.application.responseTime}
                      <Typography component="span" variant="body1" ml={1}>ms</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Error Rate</Typography>
                    <Typography variant="h4">
                      {metrics.application.errorRate}
                      <Typography component="span" variant="body1" ml={1}>%</Typography>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Database Health */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Database Health
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Active Connections</Typography>
                    <Typography variant="h4">{metrics.database.connections}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Average Query Time</Typography>
                    <Typography variant="h4">
                      {metrics.database.queryTime}
                      <Typography component="span" variant="body1" ml={1}>ms</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography color="textSecondary">Status</Typography>
                    <Chip 
                      label={metrics.database.status}
                      color={getStatusColor(metrics.database.status)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};