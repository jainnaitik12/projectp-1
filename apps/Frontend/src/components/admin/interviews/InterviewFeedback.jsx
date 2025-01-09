import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Rating,
  TextField,
  Button,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  Person,
  Business,
  Star
} from '@mui/icons-material';
import { useState } from 'react';

const InterviewFeedback = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedback, setFeedback] = useState({
    technicalRating: 0,
    communicationRating: 0,
    overallRating: 0,
    comments: '',
    status: ''
  });

  const feedbacks = [
    {
      id: 1,
      studentName: 'John Doe',
      company: 'Google',
      interviewDate: '2024-03-10',
      round: 'Technical',
      technicalRating: 4,
      communicationRating: 4,
      overallRating: 4,
      status: 'selected',
      comments: 'Good technical knowledge and problem-solving skills.'
    },
    // Add more feedbacks...
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'selected':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Interview Feedbacks
            </Typography>

            {feedbacks.map((feedback) => (
              <Box key={feedback.id} mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box display="flex" gap={2}>
                    <Avatar>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">
                        {feedback.studentName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feedback.company} - {feedback.round}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(feedback.interviewDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={feedback.status}
                    color={getStatusColor(feedback.status)}
                    size="small"
                  />
                </Box>

                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2" gutterBottom>
                        Technical Skills
                      </Typography>
                      <Rating
                        value={feedback.technicalRating}
                        readOnly
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" gutterBottom>
                        Communication
                      </Typography>
                      <Rating
                        value={feedback.communicationRating}
                        readOnly
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" gutterBottom>
                        Overall
                      </Typography>
                      <Rating
                        value={feedback.overallRating}
                        readOnly
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="body2" mt={2}>
                    {feedback.comments}
                  </Typography>
                </Box>

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Feedback
            </Typography>

            <Box component="form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Technical Skills
                  </Typography>
                  <Rating
                    value={feedback.technicalRating}
                    onChange={(event, newValue) => {
                      setFeedback({ ...feedback, technicalRating: newValue });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Communication Skills
                  </Typography>
                  <Rating
                    value={feedback.communicationRating}
                    onChange={(event, newValue) => {
                      setFeedback({ ...feedback, communicationRating: newValue });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Overall Rating
                  </Typography>
                  <Rating
                    value={feedback.overallRating}
                    onChange={(event, newValue) => {
                      setFeedback({ ...feedback, overallRating: newValue });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Comments"
                    value={feedback.comments}
                    onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      // Handle feedback submission
                      console.log('Feedback:', feedback);
                    }}
                  >
                    Submit Feedback
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InterviewFeedback; 