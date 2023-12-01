"use client";

import { Grid, Toolbar, AppBar } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "@/hooks/session";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Navbar() {
  const router = useRouter();
  const {
    session: { data: session, isLoading: isSessionLoading },
    logout: { mutateAsync: logout, isLoading: isLogoutLoading },
  } = useSession();

  return (
    <AppBar>
      <Toolbar>
        <Grid container justifyContent="end">
          <Grid item>
            <Button color="inherit" href="/">
              Home
            </Button>
          </Grid>
          <Grid item>
            {!isSessionLoading && session?.isLoggedIn && (
              <Button
                color="inherit"
                onClick={async () => {
                  await logout().then(() => {
                    router.push("/login");
                  });
                }}
                loading={isLogoutLoading}
              >
                Logout
              </Button>
            )}

            {!isSessionLoading && !session?.isLoggedIn && (
              <Button color="inherit" href="/login">
                Login
              </Button>
            )}
          </Grid>
          <Grid item>
            <ThemeToggle />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
