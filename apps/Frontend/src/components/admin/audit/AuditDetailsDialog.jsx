import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider
} from '@mui/material';

export const AuditDetailsDialog = ({ open, onClose, logData }) => {
  if (!logData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Audit Log Details</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Timestamp
          </Typography>
          <Typography variant="body1" gutterBottom>
            {logData.timestamp}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            User
          </Typography>
          <Typography variant="body1" gutterBottom>
            {logData.user}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Action
          </Typography>
          <Typography variant="body1" gutterBottom>
            {logData.action}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Resource
          </Typography>
          <Typography variant="body1" gutterBottom>
            {logData.resource}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            {logData.details}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            IP Address
          </Typography>
          <Typography variant="body1">
            {logData.ipAddress}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}; 