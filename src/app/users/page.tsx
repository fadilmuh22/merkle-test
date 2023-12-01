import { Grid } from "@mui/material";
import UserTable from "@/components/users/UserTable";

export default function Users() {
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <UserTable />
    </Grid>
  );
}
