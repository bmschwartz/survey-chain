import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import SurveyStep from './SurveyStep';

const steps = ['Basic Information', 'Add Questions', 'Review & Save'];

const SurveyWizard: React.FC = () => {
  const { activeStep, saveSurvey, setActiveStep, resetSurvey, validateStep, validationErrors } = useSurveyBuilder();
  // const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleNext = async () => {
    const errors = await validateStep();
    console.log('Debug errors', errors);
    if (errors.length > 0) {
      console.log('Debug errors', errors);
      return;
    }
    // if (activeStep === steps.length - 1) {
    //   await saveSurvey();
    //   return;
    // }
    await saveSurvey();
    console.log('Debug activeStep', activeStep);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: '2rem' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            All steps completed - you&apos;re finished!
          </Typography>
          <Button
            onClick={resetSurvey}
            variant="outlined"
            color="secondary"
            sx={{ display: 'block', margin: '0 auto' }}
          >
            Reset
          </Button>
        </>
      ) : (
        <>
          <SurveyStep />
          {validationErrors.length > 0 && (
            <Box sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
              {validationErrors.map((error, index) => (
                <Typography key={index} sx={{ color: 'red' }}>
                  {error}
                </Typography>
              ))}
            </Box>
          )}

          <Box
            sx={{
              marginTop: '2rem',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {isLastStep ? 'Save' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SurveyWizard;
