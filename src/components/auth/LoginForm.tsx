"use client";

import { FormInputText } from "@/components/common/FormInputControl";
import { useLogin } from "@/hooks/session";
import { LoginPayload } from "@/lib/types";
import { Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { useSnackbar } from "../providers/SnackbarProvider";

export default function LoginForm() {
  const router = useRouter();

  const { showSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<LoginPayload>({
    mode: "onChange",
  });

  const { mutateAsync, isLoading } = useLogin({
    onSuccess: () => {
      showSnackbar("Login successfully");
    },
    onError: (error: any) => {
      showSnackbar(error as string);
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    return mutateAsync(data).then(() => {
      router.push("/users");
    });
  };

  return (
    <Paper className="p-5 min-w-[768px]">
      <Grid container justifyContent="center" marginBottom={2}>
        <Typography variant="h4" component="h2">
          Login
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={2}>
          <FormInputText name="username" control={control} label="Username" />
          <FormInputText
            name="password"
            control={control}
            label="Password"
            type="password"
          />

          <Grid container justifyContent="end">
            <Button
              loading={isLoading}
              variant="contained"
              type="submit"
              className="w-[120px]"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
