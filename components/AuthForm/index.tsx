import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

export interface AuthFormParams {
  email: string;
  password: string;
  username?: string;
  isArtist?: boolean;
}

export interface AuthFormProps {
  onSubmit: SubmitHandler<AuthFormParams>;
  formAction: string;
  actionLink?: string;
  actionTitle?: string;
  successMsg?: string;
}

export const AuthForm = ({
  onSubmit,
  formAction,
  actionLink,
  actionTitle,
}: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    control,
  } = useForm<AuthFormParams>();

  return (
    <Container component="main" maxWidth="xs" style={{height: '100vh', display: "flex", alignItems: "center"}}>
      <Box>
        <Typography component="h1" variant="h5">
          {formAction}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: { value: true, message: "Enter the email" },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          {formAction === "SignUp" && (
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: { value: true, message: "Enter the username" },
              })}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
          )}
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            autoComplete="current-password"
            {...register("password", {
              required: { value: true, message: "Enter the password" },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          {formAction === "SignUp" && (
            <FormControlLabel
              control={
                <Checkbox
                  {...register("isArtist")}
                />
              }
              label="I'm an artist"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => clearErrors()}
          >
            {formAction}
          </Button>
          {actionLink && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={actionLink}>
                  <p onClick={() => reset()}>{actionTitle}</p>
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </Container>
  );
};
