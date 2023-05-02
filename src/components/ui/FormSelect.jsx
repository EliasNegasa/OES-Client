import React from "react";
import { Controller } from "react-hook-form";
import {
  Stack,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

const FormSelect = ({ name, control, label, options, ...rest }) => {
  return (
    <Stack direction="column">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              id={label}
              label={label}
              {...field}
              labelId={label}
              {...rest}
            >
              {options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Stack>
  );
};

export default FormSelect;
