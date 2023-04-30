import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function UserForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      academic_year: "",
      role_name: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Controller
            name="firstname"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                id="firstname"
                label="First Name"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                id="lastname"
                label="Last Name"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                id="email"
                label="Email Address"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="academic_year"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                id="academic_year"
                label="Academic year"
                variant="outlined"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                helperText="Please enter numbers only"
              />
            )}
          />
          <Controller
            name="role_name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  id="role"
                  value={value}
                  label="Role"
                  onChange={onChange}
                  labelId="role-label"
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Lecturer">Lecturer</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
}
