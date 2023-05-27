import React from "react";
import { Controller } from "react-hook-form";
import { Stack, Alert, Checkbox, FormControlLabel } from "@mui/material";

const FormCheckbox = ({ name, control, label, errors, ...rest }) => {
  return (
    <Stack direction="column">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...label} id={name} {...field} {...rest} />}
            label={label}
          />
        )}
      />
      {errors[name] && (
        <Alert severity="error" sx={{ m: 1, maxWidth: "36ch" }}>
          {errors[name]?.message}
        </Alert>
      )}
    </Stack>
  );
};

export default FormCheckbox;
