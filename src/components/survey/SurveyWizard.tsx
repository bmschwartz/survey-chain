import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';

import SurveyPreview from './SurveyPreview';
import SurveyStep from './SurveyStep';

const steps = ['Basic Information', 'Add Questions', 'Preview & Publish'];

const SurveyWizard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    questions: [],
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSurveyData({
      title: '',
      description: '',
      questions: [],
    });
  };

  const handleSurveyDataChange = (newData: any) => {
    setSurveyData({ ...surveyData, ...newData });
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        Create a New Survey
      </Typography>
      <Stepper activeStep={activeStep} sx={{ marginBottom: '2rem' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            All steps completed - you&apos;re finished!
          </Typography>
          <Button
            onClick={handleReset}
            variant="outlined"
            color="secondary"
            sx={{ display: 'block', margin: '0 auto' }}
          >
            Reset
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <SurveyStep step={activeStep} surveyData={surveyData} onSurveyDataChange={handleSurveyDataChange} />
          <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </Box>
          {isLastStep && <SurveyPreview surveyData={surveyData} />}
        </React.Fragment>
      )}
    </Container>
  );
};

export default SurveyWizard;
