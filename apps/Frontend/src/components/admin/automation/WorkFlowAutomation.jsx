// components/admin/automation/WorkflowAutomation.jsx
import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Switch,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useAudit } from '../../../hooks/admin/useAudit';

export const WorkflowAutomation = () => {
  const { logEvent } = useAudit();
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'JNF Approval',
      trigger: 'jnf_submitted',
      actions: ['notify_tpo', 'update_status'],
      isActive: true,
      description: 'Automatically process JNF submissions'
    },
    {
      id: 2,
      name: 'Student Registration',
      trigger: 'student_registered',
      actions: ['send_welcome_email', 'create_profile'],
      isActive: true,
      description: 'Handle new student registrations'
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    actions: [],
    description: ''
  });

  const triggers = [
    'jnf_submitted',
    'student_registered',
    'company_registered',
    'interview_scheduled',
    'offer_received'
  ];

  const availableActions = [
    'notify_tpo',
    'update_status',
    'send_welcome_email',
    'create_profile',
    'send_notification',
    'update_database'
  ];

  const handleOpenDialog = (workflow = null) => {
    if (workflow) {
      setEditingWorkflow(workflow);
      setFormData(workflow);
    } else {
      setEditingWorkflow(null);
      setFormData({
        name: '',
        trigger: '',
        actions: [],
        description: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingWorkflow(null);
    setFormData({
      name: '',
      trigger: '',
      actions: [],
      description: ''
    });
  };

  const handleSaveWorkflow = () => {
    if (editingWorkflow) {
      setWorkflows(prev =>
        prev.map(w =>
          w.id === editingWorkflow.id
            ? { ...formData, id: editingWorkflow.id, isActive: w.isActive }
            : w
        )
      );
      logEvent('update', 'Workflow', `Updated workflow: ${formData.name}`);
    } else {
      const newWorkflow = {
        ...formData,
        id: Date.now(),
        isActive: true
      };
      setWorkflows(prev => [...prev, newWorkflow]);
      logEvent('create', 'Workflow', `Created new workflow: ${formData.name}`);
    }
    handleCloseDialog();
  };

  const handleDeleteWorkflow = (id) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(prev => prev.filter(w => w.id !== id));
      logEvent('delete', 'Workflow', `Deleted workflow ID: ${id}`);
    }
  };

  const handleToggleWorkflow = (id) => {
    setWorkflows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isActive: !w.isActive } : w
      )
    );
    const workflow = workflows.find(w => w.id === id);
    logEvent('update', 'Workflow', `${workflow.isActive ? 'Disabled' : 'Enabled'} workflow: ${workflow.name}`);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Workflow Automation</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Create Workflow
            </Button>
          </Box>

          <Grid container spacing={3}>
            {workflows.map((workflow) => (
              <Grid item xs={12} md={6} key={workflow.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{workflow.name}</Typography>
                      <Switch
                        checked={workflow.isActive}
                        onChange={() => handleToggleWorkflow(workflow.id)}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {workflow.description}
                    </Typography>

                    <Box mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        Trigger: {workflow.trigger}
                      </Typography>
                      <Box mt={1}>
                        {workflow.actions.map((action, index) => (
                          <Chip
                            key={index}
                            label={action}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(workflow)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Workflow Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Trigger</InputLabel>
              <Select
                value={formData.trigger}
                onChange={(e) => setFormData(prev => ({ ...prev, trigger: e.target.value }))}
                label="Trigger"
              >
                {triggers.map((trigger) => (
                  <MenuItem key={trigger} value={trigger}>
                    {trigger}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Actions</InputLabel>
              <Select
                multiple
                value={formData.actions}
                onChange={(e) => setFormData(prev => ({ ...prev, actions: e.target.value }))}
                label="Actions"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {availableActions.map((action) => (
                  <MenuItem key={action} value={action}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveWorkflow}
            variant="contained"
            disabled={!formData.name || !formData.trigger || formData.actions.length === 0}
          >
            {editingWorkflow ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkflowAutomation;
  