import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box
  } from '@mui/material';
import JNFAnalytics from '../../components/admin/jnf/JNFAnalytics';
  
  export const JNFApprovalCard = ({ jnf, onApprove, onReject }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{jnf.companyName}</Typography>
          <Typography color="textSecondary" gutterBottom>
            JNF ID: {jnf.id}
          </Typography>
          <Box mt={2}>
            <Chip 
              label={jnf.status} 
              color={jnf.status === 'pending' ? 'warning' : 'success'} 
              size="small" 
            />
          </Box>
          <Typography variant="body2" mt={2}>
            Positions: {jnf.positions.join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            onClick={() => onApprove(jnf.id)}
          >
            Approve
          </Button>
          <Button 
            size="small" 
            color="error" 
            onClick={() => onReject(jnf.id)}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    );
  };
