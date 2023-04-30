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
import { DevTool } from "@hookform/devtools";

export default function UserForm({ users, setUsers, setOpenPopup }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      academic_year: "",
      roles: [{ role_name: "" }],
      isActive: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Data", data);
    users.push(data);
    setUsers(users);
    setOpenPopup(false);
  };

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
            rules={{ required: { value: true, message: "yasfelgal" } }}
            render={({ field }) => (
              <TextField
                id="firstname"
                label="First Name"
                {...field}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="lastname"
                label="Last Name"
                {...field}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="email"
                label="Email Address"
                {...field}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="academic_year"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="academic_year"
                label="Academic year"
                variant="outlined"
                {...field}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            )}
          />
          <Controller
            name="roles[0].role_name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select id="role" label="Role" {...field} labelId="role-label">
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Lecturer">Lecturer</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="isActive"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="isActive-label">Status</InputLabel>
                <Select
                  id="isActive"
                  label="Status"
                  {...field}
                  labelId="isActive-label"
                >
                  <MenuItem value="Yes">Active</MenuItem>
                  <MenuItem value="No">Deactive</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right", right: "25px" }}
          >
            Save
          </Button>
        </Box>
      </form>
      <DevTool control={control} placement="top-left" />
    </div>
  );
}
