"use client";

import { Box, Typography, Grid } from "@mui/material";
import { useDeleteUser } from "@/hooks/users";
import Button from "@/components/common/Button";
import { useSnackbar } from "@/components/providers/SnackbarProvider";
import BaseModal from "../common/BaseModal";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  handleClose: () => void;
  id: number;
};

export default function DeleteUserModal({ open, handleClose, id }: Props) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { mutateAsync, isLoading } = useDeleteUser({
    onSuccess: () => {
      handleClose();
      showSnackbar("User deleted successfully");
      router.push("/users");
    },
  });

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Grid container spacing={2}>
        <Grid container item justifyContent="start">
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to delete this user?
          </Typography>
        </Grid>
        <Grid container item justifyContent="end" spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                await mutateAsync(id);
              }}
              loading={isLoading}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </BaseModal>
  );
}
