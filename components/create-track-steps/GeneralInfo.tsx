import React from "react";
import { UseInputReturnType } from "../../hooks/useInput";
import { Grid, TextField } from "@mui/material";

interface GeneralInfoProps {
  name: UseInputReturnType;
  artist?: UseInputReturnType;
  text?: UseInputReturnType;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ name, artist, text }) => {
  return (
    <Grid container direction={"column"} style={{ padding: 20 }}>
      <TextField {...name} style={{ marginTop: 10 }} label={"Title"} />
      {artist && (
        <TextField
          {...artist}
          style={{ marginTop: 10 }}
          label={"Имя исполнителя"}
        />
      )}
      {text && (
        <TextField
          {...text}
          style={{ marginTop: 10 }}
          label={"Lyrics"}
          multiline
          rows={3}
        />
      )}
    </Grid>
  );
};

export default GeneralInfo;
