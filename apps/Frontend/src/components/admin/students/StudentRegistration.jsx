import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Switch,
  Divider,
  Avatar,
  IconButton,
  Chip
} from '@mui/material';
import {
  PhotoCamera,
  Save,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { useState } from 'react';

const StudentRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [studentData, setStudentData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    alternatePhone: '',
    photo: null,
    category: '',
    nationality: '',
    religion: '',
    bloodGroup: '',
    aadharNumber: '',
    panNumber: '',

    // Academic Information
    rollNumber: '',
    registrationNumber: '',
    batch: '',
    branch: '',
    section: '',
    semester: '',
    admissionType: '',
    admissionDate: '',
    academicStatus: 'active',

    // Contact Information
    currentAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    permanentAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsCurrent: false,

    // Parent/Guardian Information
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',

    // Academic History
    previousInstitute: '',
    previousQualification: '',
    previousBoard: '',
    previousScore: '',
    entranceExam: '',
    entranceScore: '',
    entranceRank: '',

    // Additional Information
    hostelRequired: false,
    transportRequired: false,
    scholarshipApplied: false,
    scholarshipDetails: '',
    medicalConditions: '',
    bloodGroup: '',
    emergencyContact: '',
    emergencyRelation: '',

    // Documents
    documents: {
      photo: null,
      aadhar: null,
      pan: null,
      previousMarksheets: [],
      entranceExamCard: null,
      domicile: null,
      incomeCertificate: null,
      casteCertificate: null
    }
  });

  const steps = [
    'Personal Information',
    'Academic Details',
    'Contact Information',
    'Family Details',
    'Academic History',
    'Additional Details',
    'Documents'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field, value) => {
    setStudentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setStudentData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field, file) => {
    setStudentData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Student registered:', studentData);
    // Reset form or navigate to another page
  };

  // Render different form sections based on active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={studentData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={studentData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                value={studentData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={studentData.gender}
                  label="Gender"
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Add more personal information fields */}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Roll Number"
                value={studentData.rollNumber}
                onChange={(e) => handleChange('rollNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Registration Number"
                value={studentData.registrationNumber}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Batch</InputLabel>
                <Select
                  value={studentData.batch}
                  label="Batch"
                  onChange={(e) => handleChange('batch', e.target.value)}
                >
                  <MenuItem value="2020-24">2020-24</MenuItem>
                  <MenuItem value="2021-25">2021-25</MenuItem>
                  <MenuItem value="2022-26">2022-26</MenuItem>
                  <MenuItem value="2023-27">2023-27</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={studentData.branch}
                  label="Branch"
                  onChange={(e) => handleChange('branch', e.target.value)}
                >
                  <MenuItem value="CSE">CSE</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="ECE">ECE</MenuItem>
                  <MenuItem value="EEE">EEE</MenuItem>
                  <MenuItem value="MECH">MECH</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Section</InputLabel>
                <Select
                  value={studentData.section}
                  label="Section"
                  onChange={(e) => handleChange('section', e.target.value)}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Add more academic fields */}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Address Line 1"
                value={studentData.currentAddress.line1}
                onChange={(e) => handleAddressChange('currentAddress', 'line1', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Address Line 2"
                value={studentData.currentAddress.line2}
                onChange={(e) => handleAddressChange('currentAddress', 'line2', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                value={studentData.currentAddress.city}
                onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                value={studentData.currentAddress.state}
                onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Pincode"
                value={studentData.currentAddress.pincode}
                onChange={(e) => handleAddressChange('currentAddress', 'pincode', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={studentData.sameAsCurrent}
                    onChange={(e) => handleChange('sameAsCurrent', e.target.checked)}
                  />
                }
                label="Same as Current Address"
              />
            </Grid>
            {!studentData.sameAsCurrent && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Permanent Address Line 1"
                    value={studentData.permanentAddress.line1}
                    onChange={(e) => handleAddressChange('permanentAddress', 'line1', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Permanent Address Line 2"
                    value={studentData.permanentAddress.line2}
                    onChange={(e) => handleAddressChange('permanentAddress', 'line2', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={studentData.permanentAddress.city}
                    onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={studentData.permanentAddress.state}
                    onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={studentData.permanentAddress.pincode}
                    onChange={(e) => handleAddressChange('permanentAddress', 'pincode', e.target.value)}
                    required
                  />
                </Grid>
              </>
            )}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's Name"
                value={studentData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's Occupation"
                value={studentData.fatherOccupation}
                onChange={(e) => handleChange('fatherOccupation', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's Phone"
                value={studentData.fatherPhone}
                onChange={(e) => handleChange('fatherPhone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's Email"
                value={studentData.fatherEmail}
                onChange={(e) => handleChange('fatherEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Name"
                value={studentData.motherName}
                onChange={(e) => handleChange('motherName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Occupation"
                value={studentData.motherOccupation}
                onChange={(e) => handleChange('motherOccupation', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Phone"
                value={studentData.motherPhone}
                onChange={(e) => handleChange('motherPhone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Email"
                value={studentData.motherEmail}
                onChange={(e) => handleChange('motherEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guardian's Name"
                value={studentData.guardianName}
                onChange={(e) => handleChange('guardianName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guardian's Relation"
                value={studentData.guardianRelation}
                onChange={(e) => handleChange('guardianRelation', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guardian's Phone"
                value={studentData.guardianPhone}
                onChange={(e) => handleChange('guardianPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guardian's Email"
                value={studentData.guardianEmail}
                onChange={(e) => handleChange('guardianEmail', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous Institute"
                value={studentData.previousInstitute}
                onChange={(e) => handleChange('previousInstitute', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous Qualification"
                value={studentData.previousQualification}
                onChange={(e) => handleChange('previousQualification', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous Board"
                value={studentData.previousBoard}
                onChange={(e) => handleChange('previousBoard', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous Score"
                value={studentData.previousScore}
                onChange={(e) => handleChange('previousScore', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Entrance Exam"
                value={studentData.entranceExam}
                onChange={(e) => handleChange('entranceExam', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Entrance Score"
                value={studentData.entranceScore}
                onChange={(e) => handleChange('entranceScore', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Entrance Rank"
                value={studentData.entranceRank}
                onChange={(e) => handleChange('entranceRank', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={studentData.hostelRequired}
                    onChange={(e) => handleChange('hostelRequired', e.target.checked)}
                  />
                }
                label="Hostel Required"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={studentData.transportRequired}
                    onChange={(e) => handleChange('transportRequired', e.target.checked)}
                  />
                }
                label="Transport Required"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={studentData.scholarshipApplied}
                    onChange={(e) => handleChange('scholarshipApplied', e.target.checked)}
                  />
                }
                label="Scholarship Applied"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Scholarship Details"
                value={studentData.scholarshipDetails}
                onChange={(e) => handleChange('scholarshipDetails', e.target.value)}
                disabled={!studentData.scholarshipApplied}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Medical Conditions"
                value={studentData.medicalConditions}
                onChange={(e) => handleChange('medicalConditions', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                value={studentData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Relation"
                value={studentData.emergencyRelation}
                onChange={(e) => handleChange('emergencyRelation', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        );

      case 6:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => handleFileUpload('documents', e.target.files)}
                style={{ display: 'none' }}
                id="document-upload"
              />
              <label htmlFor="document-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Upload />}
                >
                  Upload Documents
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              {studentData.documents.map((doc, index) => (
                <Chip
                  key={index}
                  label={doc.name}
                  onDelete={() => {
                    const newDocs = studentData.documents.filter((_, i) => i !== index);
                    handleChange('documents', newDocs);
                  }}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <form>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentRegistration;