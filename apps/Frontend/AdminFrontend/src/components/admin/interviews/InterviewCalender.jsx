// components/admin/interviews/InterviewCalendar.jsx
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Button,
    IconButton,
    Chip,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';
  import {
    ChevronLeft,
    ChevronRight,
    Add,
    VideoCall,
    LocationOn,
    People
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const InterviewCalendar = () => {
    // In real app with Redux:
    // const dispatch = useDispatch();
    // const { interviews, loading, error } = useSelector(state => state.interviews);
    // useEffect(() => {
    //   dispatch(fetchInterviews());
    // }, []);
  
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDialog, setViewDialog] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
  
    // Demo data
    const interviews = [
      {
        id: 1,
        company: 'Tech Corp',
        role: 'Software Engineer',
        candidates: [
          { id: 1, name: 'John Doe', time: '10:00 AM', status: 'scheduled' }
        ],
        type: 'Technical',
        location: 'Room 101',
        interviewers: ['Jane Smith', 'Bob Wilson']
      }
    ];
  
    const TimeSlot = ({ interview }) => (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 1, 
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={() => {
          setSelectedInterview(interview);
          setViewDialog(true);
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            {interview.company}
          </Typography>
          <Chip 
            size="small"
            label={interview.type}
            color="primary"
          />
        </Box>
        <Typography color="textSecondary" variant="body2">
          {interview.role}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <People fontSize="small" />
          <Typography variant="body2">
            {interview.candidates.length} candidates
          </Typography>
          {interview.location.includes('http') ? (
            <VideoCall fontSize="small" color="primary" />
          ) : (
            <LocationOn fontSize="small" color="primary" />
          )}
        </Box>
      </Paper>
    );
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5">Interview Calendar</Typography>
            <Box display="flex" alignItems="center">
              <IconButton>
                <ChevronLeft />
              </IconButton>
              <Typography>
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </Typography>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
          >
            Schedule Interview
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          {/* Calendar View */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  {/* Calendar grid implementation */}
                  {Array.from({ length: 35 }).map((_, index) => (
                    <Grid item xs={12/7} key={index}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1, 
                          textAlign: 'center',
                          bgcolor: 'grey.100'
                        }}
                      >
                        <Typography>
                          {/* Date calculation logic */}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Day Schedule */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Schedule for {selectedDate.toLocaleDateString()}
                </Typography>
                {interviews.map((interview) => (
                  <TimeSlot key={interview.id} interview={interview} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        {/* Interview Details Dialog */}
        <Dialog
          open={viewDialog}
          onClose={() => setViewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Interview Details
          </DialogTitle>
          <DialogContent dividers>
            {selectedInterview && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {selectedInterview.company} - {selectedInterview.role}
                  </Typography>
                  <Typography color="textSecondary">
                    {selectedInterview.type} Interview
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Candidates
                  </Typography>
                  {selectedInterview.candidates.map((candidate) => (
                    <Box 
                      key={candidate.id}
                      display="flex" 
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography>{candidate.name}</Typography>
                      <Box>
                        <Chip 
                          size="small"
                          label={candidate.time}
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          size="small"
                          label={candidate.status}
                          color={candidate.status === 'scheduled' ? 'primary' : 'default'}
                        />
                      </Box>
                    </Box>
                  ))}
                </Grid>
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Interviewers
                  </Typography>
                  <Box display="flex" gap={1}>
                    {selectedInterview.interviewers.map((interviewer, index) => (
                      <Chip 
                        key={index}
                        label={interviewer}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Location
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    {selectedInterview.location.includes('http') ? (
                      <>
                        <VideoCall color="primary" />
                        <Typography>Online Interview</Typography>
                      </>
                    ) : (
                      <>
                        <LocationOn color="primary" />
                        <Typography>{selectedInterview.location}</Typography>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialog(false)}>
              Close
            </Button>
            <Button variant="contained" color="primary">
              View Details
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };