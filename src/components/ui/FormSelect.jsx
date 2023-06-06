import React from "react";
import { Controller } from "react-hook-form";
import {
  Stack,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

const FormSelect = ({ name, control, label, options, minWidth, ...rest }) => {
  return (
    <Stack direction="column">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl sx={{ m: 1, minWidth: minWidth ? minWidth : 250 }}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              id={label}
              label={label}
              {...field}
              labelId={label}
              {...rest}
            >
              {console.log("OPTIONS", options)}
              {options.map((option) => (
                <MenuItem value={option[0]} key={option[0]}>
                  {option[1]}
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
