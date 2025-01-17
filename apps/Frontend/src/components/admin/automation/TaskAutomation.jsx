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

export const TaskAutomation = () => {
  const { logEvent } = useAudit();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Document Verification',
      trigger: 'student_registration',
      assignee: 'tpo_admin',
      priority: 'high',
      deadline: '24h',
      isActive: true
    },
    {
      id: 2,
      name: 'Interview Schedule Confirmation',
      trigger: 'interview_scheduled',
      assignee: 'placement_coordinator',
      priority: 'medium',
      deadline: '2h',
      isActive: true
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    assignee: '',
    priority: '',
    deadline: ''
  });

  const triggers = [
    'student_registration',
    'interview_scheduled',
    'document_uploaded',
    'offer_received'
  ];

  const assignees = [
    'tpo_admin',
    'placement_coordinator',
    'department_coordinator',
    'faculty_mentor'
  ];

  const priorities = ['low', 'medium', 'high', 'urgent'];
  const deadlines = ['1h', '2h', '4h', '24h', '48h', '72h'];

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({
        name: '',
        trigger: '',
        assignee: '',
        priority: '',
        deadline: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id
            ? { ...formData, id: editingTask.id, isActive: t.isActive }
            : t
        )
      );
      logEvent('update', 'TaskAutomation', `Updated task: ${formData.name}`);
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        isActive: true
      };
      setTasks(prev => [...prev, newTask]);
      logEvent('create', 'TaskAutomation', `Created new task: ${formData.name}`);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
      logEvent('delete', 'TaskAutomation', `Deleted task ID: ${id}`);
    }
  };

  const handleToggleTask = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isActive: !t.isActive } : t
      )
    );
    const task = tasks.find(t => t.id === id);
    logEvent('update', 'TaskAutomation', `${task.isActive ? 'Disabled' : 'Enabled'} task: ${task.name}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Task Automation</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Create Task
            </Button>
          </Box>

          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{task.name}</Typography>
                      <Switch
                        checked={task.isActive}
                        onChange={() => handleToggleTask(task.id)}
                      />
                    </Box>

                    <Box mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        Trigger: {task.trigger}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Assignee: {task.assignee}
                      </Typography>
                      <Box mt={1} display="flex" gap={1}>
                        <Chip
                          label={`Priority: ${task.priority}`}
                          size="small"
                          color={getPriorityColor(task.priority)}
                        />
                        <Chip
                          label={`Deadline: ${task.deadline}`}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(task)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteTask(task.id)}
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
          {editingTask ? 'Edit Task' : 'Create Task'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Task Name"
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
              <InputLabel>Assignee</InputLabel>
              <Select
                value={formData.assignee}
                onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                label="Assignee"
              >
                {assignees.map((assignee) => (
                  <MenuItem key={assignee} value={assignee}>
                    {assignee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                label="Priority"
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Deadline</InputLabel>
              <Select
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                label="Deadline"
              >
                {deadlines.map((deadline) => (
                  <MenuItem key={deadline} value={deadline}>
                    {deadline}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveTask}
            variant="contained"
            disabled={!formData.name || !formData.trigger || !formData.assignee || !formData.priority || !formData.deadline}
          >
            {editingTask ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskAutomation; 