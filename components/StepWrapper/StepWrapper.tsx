import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { ReactNode } from 'react'

export interface IStepWrapperProps {
  activeStep: number;
  children: ReactNode;

}

const steps: string[] = ['Track Info', 'Load a track cover', 'Load a track']


const StepWrapper = ({activeStep, children}: IStepWrapperProps): JSX.Element => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            key={index}
            completed={activeStep > index}
          >
            <StepLabel>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent='center' style={{margin: '70px 0', height: 270}}>
          <Card style={{width: 600}}>
            {children}
          </Card>
      </Grid>
    </Container>
  )
}

export default StepWrapper