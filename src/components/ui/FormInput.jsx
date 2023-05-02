import React from "react";
import { Controller } from "react-hook-form";
import { Stack, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";

const FormInput = ({ name, control, label, errors, ...rest }) => {
  return (
    <Stack direction="column">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={name}
            label={label}
            variant="outlined"
            {...field}
            {...rest}
          />
        )}
      />
      {errors[name] && (
        <Alert severity="error" sx={{ m: 1 }}>
          {errors[name]?.message}
        </Alert>
      )}
    </Stack>
  );
};

export default FormInput;
