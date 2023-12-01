"use client";

import { useUser } from "@/hooks/users";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { FunctionComponent } from "react";
import UserActionMenu from "./UserActionMenu";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const UserField: FunctionComponent<{ label: string; value?: string }> = ({
  label,
  value,
}) => {
  return (
    <Grid container item flexDirection="column">
      <Typography variant="caption" component="p" autoCapitalize="true">
        {label}
      </Typography>
      <Typography variant="body1" component="p" autoCapitalize="true">
        {value}
      </Typography>
    </Grid>
  );
};

export default function UserDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: user } = useUser(id);

  if (!user) {
    return (
      <Paper className="p-5 min-w-[768px] flex justify-center items-center">
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper className="p-5 min-w-[768px]">
      <Grid container flexDirection="column" spacing={1}>
        <Grid container item justifyContent="space-between">
          <Grid
            container
            flexDirection="row"
            justifyContent="start"
            alignContent="center"
            width="fit-content"
            item
            spacing={1}
          >
            <Grid>
              <IconButton
                onClick={() => {
                  router.back();
                }}
              >
                <ArrowBack />
              </IconButton>
            </Grid>
            <Grid>
              <Typography variant="h5" component="h2">
                User details
              </Typography>
            </Grid>
          </Grid>
          <UserActionMenu
            user={user}
            hideView
            onDelete={() => {
              router.back();
            }}
          />
        </Grid>
        <Grid container item flexDirection="row" marginLeft={4}>
          <Grid container item xs={12} md={6} spacing={1}>
            <UserField
              label="Name"
              value={`${user?.name.firstname} ${user?.name.lastname}`}
            />
            <UserField label="Username" value={user?.username} />
            <UserField label="Email" value={user?.email} />
          </Grid>
          <Grid container item xs={12} md={6} spacing={1}>
            <UserField label="Phone" value={user?.phone} />
            <UserField label="City" value={user?.address.city} />
            <UserField label="Street" value={user?.address.street} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
