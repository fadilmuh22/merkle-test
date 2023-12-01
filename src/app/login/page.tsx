import { Grid } from "@mui/material";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <LoginForm />
    </Grid>
  );
}
