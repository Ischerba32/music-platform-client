import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { PropsWithChildren } from "react";
// import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";

interface StepWrapperProps {
  activeStep: number;
  steps?: number;
}
const STEPSINFO = ["Tracks info", "Cover", "Track"];

const StepWrapper: React.FC<PropsWithChildren<StepWrapperProps>> = ({
  activeStep,
  steps,
  children,
}) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {STEPSINFO.slice(0, steps).map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0 ", height: 270 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
