// components/admin/communication/BulkCommunicationCenter.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Chip,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Alert,
    LinearProgress
  } from '@mui/material';
  import {
    Email,
    Sms,
    Group,
    Preview,
    Send,
    Schedule
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const BulkCommunicationCenter = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [communicationType, setCommunicationType] = useState('email');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [scheduleTime, setScheduleTime] = useState(null);
  
    const steps = [
      'Select Recipients',
      'Choose Template',
      'Preview & Schedule',
      'Confirm'
    ];
  
    const RecipientSelection = () => (
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Select Recipients
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Student Groups
                </Typography>
                <FormControlLabel
                  control={<Checkbox />}
                  label="All Students"
                />
                <Box ml={3}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Final Year Students"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Pre-Final Year Students"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Eligible for Placement"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Not Yet Placed"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Department Filter
                </Typography>
                <FormControlLabel
                  control={<Checkbox />}
                  label="All Departments"
                />
                <Box ml={3}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Computer Science"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Electronics"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Mechanical"
                  />
                  {/* Add more departments */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12}>
            <Alert severity="info">
              Selected Recipients: 250 students
            </Alert>
          </Grid>
        </Grid>
      </Box>
    );
  
    const TemplateSelection = () => (
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Communication Method
        </Typography>
        
        <RadioGroup
          row
          value={communicationType}
          onChange={(e) => setCommunicationType(e.target.value)}
          sx={{ mb: 3 }}
        >
          <FormControlLabel 
            value="email" 
            control={<Radio />} 
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Email /> Email
              </Box>
            }
          />
          <FormControlLabel 
            value="sms" 
            control={<Radio />} 
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Sms /> SMS
              </Box>
            }
          />
        </RadioGroup>
  
        <Typography variant="subtitle1" gutterBottom>
          Select Template
        </Typography>
  
        <Grid container spacing={2}>
          {[1, 2, 3].map((template) => (
            <Grid item xs={12} md={4} key={template}>
              <Card 
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: selectedTemplate === template ? 'action.selected' : 'inherit'
                }}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent>
                  <Typography variant="subtitle2">
                    Template {template}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description of template {template}
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    <Chip 
                      label={communicationType} 
                      size="small" 
                      color="primary"
                    />
                    <Chip 
                      label="General" 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  
    const PreviewAndSchedule = () => (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              Message Preview
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Box 
                  sx={{ 
                    bgcolor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    minHeight: 200
                  }}
                >
                  {/* Preview content */}
                  Preview of the message will appear here
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Schedule
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <RadioGroup
                  value={scheduleTime ? 'scheduled' : 'immediate'}
                  onChange={(e) => {
                    if (e.target.value === 'immediate') {
                      setScheduleTime(null);
                    }
                  }}
                >
                  <FormControlLabel
                    value="immediate"
                    control={<Radio />}
                    label="Send Immediately"
                  />
                  <FormControlLabel
                    value="scheduled"
                    control={<Radio />}
                    label="Schedule for Later"
                  />
                </RadioGroup>
  
                {scheduleTime !== null && (
                  <TextField
                    fullWidth
                    type="datetime-local"
                    sx={{ mt: 2 }}
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  
    const Confirmation = () => (
      <Box>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please review the details before sending
        </Alert>
  
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Recipients</TableCell>
                  <TableCell>250 students</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Communication Type</TableCell>
                  <TableCell>
                    <Chip 
                      icon={communicationType === 'email' ? <Email /> : <Sms />}
                      label={communicationType.toUpperCase()}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Template</TableCell>
                  <TableCell>Template {selectedTemplate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Schedule</TableCell>
                  <TableCell>
                    {scheduleTime ? new Date(scheduleTime).toLocaleString() : 'Immediate'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    );
  
    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return <RecipientSelection />;
        case 1:
          return <TemplateSelection />;
        case 2:
          return <PreviewAndSchedule />;
        case 3:
          return <Confirmation />;
        default:
          return 'Unknown step';
      }
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Bulk Communication</Typography>
          </Box>
  
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          {getStepContent(activeStep)}
  
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={scheduleTime ? <Schedule /> : <Send />}
                onClick={() => {
                  // Send or schedule logic
                }}
              >
                {scheduleTime ? 'Schedule' : 'Send Now'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };