import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

export type FormInputProps = TextFieldProps & {
  name: string;
  control: any;
  label: string;
  setValue?: any;
};

export const FormInputText = ({
  name,
  control,
  label,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};
