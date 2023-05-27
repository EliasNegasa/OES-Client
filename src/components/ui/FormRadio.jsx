import React from "react";
import { Controller } from "react-hook-form";
import {
  Stack,
  Alert,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";

const FormRadio = ({ name, control, label, errors, options, ...rest }) => {
  return (
    <Stack direction="column">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <FormControl>
            <FormLabel id={label}>{label}</FormLabel>
            <RadioGroup onChange={onChange} {...rest}>
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio required={true} />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
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

export default FormRadio;
