import UserDetail from "@/components/users/UserDetail";
import { Grid } from "@mui/material";

export default function Users() {
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <UserDetail />
    </Grid>
  );
}
