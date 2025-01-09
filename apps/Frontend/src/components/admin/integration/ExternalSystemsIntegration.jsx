export const ExternalSystemsIntegration = () => {
    const [integrations, setIntegrations] = useState({
      emailService: {
        name: 'SMTP Server',
        status: 'connected',
        lastSync: '2024-02-20T10:00:00'
      },
      smsGateway: {
        name: 'SMS API',
        status: 'connected',
        lastSync: '2024-02-20T10:00:00'
      },
      erp: {
        name: 'College ERP',
        status: 'disconnected',
        lastSync: null
      }
    });
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">External Systems Integration</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {/* Add new integration */}}
            >
              Add Integration
            </Button>
          </Box>
  
          <List>
            {Object.entries(integrations).map(([key, integration]) => (
              <ListItem
                key={key}
                sx={{
                  mb: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1
                }}
              >
                <ListItemText
                  primary={integration.name}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        Last Sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                      label={integration.status}
                      color={integration.status === 'connected' ? 'success' : 'error'}
                    />
                    <Switch
                      checked={integration.status === 'connected'}
                      onChange={() => {/* Toggle connection */}}
                    />
                    <IconButton>
                      <Settings />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
  
          {/* Integration Status */}
          <Box mt={3}>
            <Alert severity="info">
              System Health: All critical integrations are functioning normally
            </Alert>
          </Box>
        </CardContent>
      </Card>
    );
  };
  