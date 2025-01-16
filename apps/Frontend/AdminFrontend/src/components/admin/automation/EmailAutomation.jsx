import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Switch,
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
  Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useAudit } from '../../../hooks/admin/useAudit';

export const EmailAutomation = () => {
  const { logEvent } = useAudit();
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      trigger: 'student_registration',
      template: 'welcome_template',
      recipients: ['student'],
      conditions: ['is_new_user'],
      isActive: true
    },
    {
      id: 2,
      name: 'Interview Reminder',
      trigger: 'interview_scheduled',
      template: 'interview_reminder',
      recipients: ['student', 'company_hr'],
      conditions: ['24h_before'],
      isActive: true
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    template: '',
    recipients: [],
    conditions: []
  });

  const triggers = [
    'student_registration',
    'interview_scheduled',
    'offer_received',
    'placement_confirmed'
  ];

  const templates = [
    'welcome_template',
    'interview_reminder',
    'offer_letter',
    'placement_confirmation'
  ];

  const recipientTypes = [
    'student',
    'company_hr',
    'tpo',
    'department_head'
  ];

  const conditions = [
    'is_new_user',
    '24h_before',
    'cgpa_above_7',
    'no_backlogs'
  ];

  const handleOpenDialog = (rule = null) => {
    if (rule) {
      setEditingRule(rule);
      setFormData(rule);
    } else {
      setEditingRule(null);
      setFormData({
        name: '',
        trigger: '',
        template: '',
        recipients: [],
        conditions: []
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRule(null);
  };

  const handleSaveRule = () => {
    if (editingRule) {
      setRules(prev =>
        prev.map(r =>
          r.id === editingRule.id
            ? { ...formData, id: editingRule.id, isActive: r.isActive }
            : r
        )
      );
      logEvent('update', 'EmailRule', `Updated email rule: ${formData.name}`);
    } else {
      const newRule = {
        ...formData,
        id: Date.now(),
        isActive: true
      };
      setRules(prev => [...prev, newRule]);
      logEvent('create', 'EmailRule', `Created new email rule: ${formData.name}`);
    }
    handleCloseDialog();
  };

  const handleDeleteRule = (id) => {
    if (window.confirm('Are you sure you want to delete this email rule?')) {
      setRules(prev => prev.filter(r => r.id !== id));
      logEvent('delete', 'EmailRule', `Deleted email rule ID: ${id}`);
    }
  };

  const handleToggleRule = (id) => {
    setRules(prev =>
      prev.map(r =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      )
    );
    const rule = rules.find(r => r.id === id);
    logEvent('update', 'EmailRule', `${rule.isActive ? 'Disabled' : 'Enabled'} email rule: ${rule.name}`);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Email Automation Rules</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Create Rule
            </Button>
          </Box>

          <Grid container spacing={3}>
            {rules.map((rule) => (
              <Grid item xs={12} md={6} key={rule.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{rule.name}</Typography>
                      <Switch
                        checked={rule.isActive}
                        onChange={() => handleToggleRule(rule.id)}
                      />
                    </Box>

                    <Box mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        Trigger: {rule.trigger}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Template: {rule.template}
                      </Typography>
                      
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          Recipients:
                        </Typography>
                        {rule.recipients.map((recipient, index) => (
                          <Chip
                            key={index}
                            label={recipient}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>

                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          Conditions:
                        </Typography>
                        {rule.conditions.map((condition, index) => (
                          <Chip
                            key={index}
                            label={condition}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(rule)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteRule(rule.id)}
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
          {editingRule ? 'Edit Email Rule' : 'Create Email Rule'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Rule Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Template</InputLabel>
              <Select
                value={formData.template}
                onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                label="Template"
              >
                {templates.map((template) => (
                  <MenuItem key={template} value={template}>
                    {template}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Recipients</InputLabel>
              <Select
                multiple
                value={formData.recipients}
                onChange={(e) => setFormData(prev => ({ ...prev, recipients: e.target.value }))}
                label="Recipients"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {recipientTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Conditions</InputLabel>
              <Select
                multiple
                value={formData.conditions}
                onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                label="Conditions"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {conditions.map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {condition}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveRule}
            variant="contained"
            disabled={!formData.name || !formData.trigger || !formData.template || formData.recipients.length === 0}
          >
            {editingRule ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmailAutomation; 