import React from "react";
import { Controller } from "react-hook-form";
import { Stack, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormDate = ({ name, control, label, errors, ...rest }) => {
  return (
    <Stack direction="column">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker id={name} label={label} {...field} {...rest} />
          )}
        />
      </LocalizationProvider>
      {errors[name] && (
        <Alert severity="error" sx={{ m: 1, maxWidth: "36ch" }}>
          {errors[name]?.message}
        </Alert>
      )}
    </Stack>
  );
};

export default FormDate;
