"use client";

import { useSession } from "@/hooks/session";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const {
    session: { data: session, isLoading },
  } = useSession();

  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography variant="h4" component="h2">
        Next.js 13 + Material + Tailwind
      </Typography>
      <Stack direction="row" columnGap={1}>
        {!isLoading && !session?.isLoggedIn && (
          <Link href="/login">
            <Button variant="text">Login</Button>
          </Link>
        )}
        {session?.isLoggedIn && (
          <Link href="/users">
            <Button variant="contained">Users</Button>
          </Link>
        )}

        <Link href="https://github.com/fadilmuh22" target="_blank">
          <Button variant="outlined">Github</Button>
        </Link>
      </Stack>
    </Grid>
  );
}
