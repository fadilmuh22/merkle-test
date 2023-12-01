"use client";

import { FormInputText } from "@/components/common/FormInputControl";
import { User } from "@/lib/types";
import { Modal, Box, Typography, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "@/hooks/users";
import Button from "@/components/common/Button";
import BaseModal from "../common/BaseModal";
import { useSnackbar } from "../providers/SnackbarProvider";

type Props = {
  open: boolean;
  handleClose: () => void;
  user?: User;
};

export default function EditUserModal({ open, handleClose, user }: Props) {
  const { showSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm<User>({
    mode: "onChange",
    defaultValues: user,
  });

  const { mutateAsync: createUser, isLoading: isCreasteUserLoading } =
    useCreateUser({
      onSuccess: () => {
        showSnackbar("User created successfully");
      },
    });
  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useUpdateUser({
      onSuccess: () => {
        showSnackbar("User updated successfully");
      },
    });

  const isLoading = useMemo(
    () => isCreasteUserLoading || isUpdateUserLoading,
    [isCreasteUserLoading, isUpdateUserLoading]
  );

  useEffect(() => {
    if (open) {
      reset(user);
    }
  }, [open, reset, user]);

  const onSubmit = async (payload: User) => {
    if (user?.id) {
      await updateUser(payload);
    } else {
      await createUser(payload);
    }
    handleClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(onSubmit)();
        }
      }}
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {user?.id ? "Edit" : "Create"} User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div className="flex flex-col gap-4">
            <FormInputText
              name="name.firstname"
              control={control}
              label="First Name"
              required
            />
            <FormInputText
              name="name.lastname"
              control={control}
              label="Last Name"
              required
            />
            <FormInputText
              name="username"
              control={control}
              label="Username"
              required
            />
            <FormInputText
              name="email"
              control={control}
              label="Email"
              required
            />
            <FormInputText
              name="phone"
              control={control}
              label="Phone"
              required
            />
            <FormInputText
              name="address.city"
              control={control}
              label="City"
              required
            />
            <FormInputText
              name="address.street"
              control={control}
              label="Street"
              required
            />

            <Grid container justifyContent="end" spacing={1}>
              <Grid item>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  variant="outlined"
                  type="submit"
                  className="w-[120px]"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  className="w-[120px]"
                  loading={isLoading}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Box>
    </BaseModal>
  );
}
