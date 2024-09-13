import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import SurveyStep from './SurveyStep';

const steps = ['Basic Information', 'Add Questions', 'Review & Save'];

const SurveyWizard: React.FC = () => {
  const router = useRouter();
  const { activeStep, saveSurvey, moveToStep, validateStep, validationErrors } = useSurveyBuilder();

  const handleNext = async () => {
    const errors = await validateStep();
    if (errors.length > 0) {
      return;
    }

    await saveSurvey();

    if (activeStep === steps.length - 1) {
      return router.push('/surveys/my-surveys');
    }

    moveToStep(activeStep + 1);
  };

  const handleBack = () => {
    const previousStep = activeStep - 1;
    moveToStep(previousStep);
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
