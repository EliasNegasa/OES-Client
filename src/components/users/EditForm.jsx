import React, { useState } from "react";
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
  Alert,
  Stack,
} from "@mui/material";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

const schema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  academic_year: yup
    .number("Academic Year must be a number")
    .max(10)
    .required("Academic Year is required")
    .positive()
    .integer(),
  isActive: yup.string().required("User Status is required"),
});

export default function EditForm({ users, setOpenPopup, singleUser }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: singleUser.id,
      firstname: singleUser.firstname,
      lastname: singleUser.lastname,
      email: singleUser.email,
      academic_year: singleUser.academic_year,
      roles: [{ role_name: singleUser.role_name || "" }],
      isActive: singleUser.isActive,
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Data", data);
    console.log("Users", users);
    // users.push(data);
    // users.map((user) => {
    //   user.id === data.id ? "T" : "F";
    // });
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
        >
          <Stack direction="row">
            <Stack direction="column">
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="firstname"
                    label="First Name"
                    {...field}
                    variant="outlined"
                  />
                )}
              />
              {errors.firstname && (
                <Alert severity="error" sx={{ m: 1 }}>
                  {errors.firstname?.message}
                </Alert>
              )}
            </Stack>

            <Stack direction="column">
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="lastname"
                    label="Last Name"
                    {...field}
                    variant="outlined"
                  />
                )}
              />
              {errors.lastname && (
                <Alert severity="error" sx={{ m: 1 }}>
                  {errors.lastname?.message}
                </Alert>
              )}
            </Stack>
          </Stack>

          <Stack direction="row">
            <Stack direction="column">
              <Controller
                name="email"
                control={control}
                rules={{
                  validate: {
                    EmailAvailable: (fieldValue) => {
                      const index = _.findIndex(users, (o) => {
                        return o.email == fieldValue;
                      });
                      return index == -1 || "Email already exists";
                    },
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email Address"
                    {...field}
                    variant="outlined"
                  />
                )}
              />
              {errors.email && (
                <Alert severity="error" sx={{ m: 1 }}>
                  {errors.email?.message}
                </Alert>
              )}
            </Stack>

            <Stack direction="column">
              <Controller
                name="academic_year"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="academic_year"
                    label="Academic year"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              {errors.academic_year && (
                <Alert severity="error" sx={{ m: 1 }}>
                  {errors.academic_year?.message}
                </Alert>
              )}
            </Stack>
          </Stack>

          <Stack direction="row">
            <Stack direction="column">
              <Controller
                name="roles[0].role_name"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      id="role"
                      label="Role"
                      {...field}
                      labelId="role-label"
                    >
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Lecturer">Lecturer</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Stack>
            <Stack direction="column">
              <Controller
                name="isActive"
                control={control}
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
              {errors.isActive && (
                <Alert severity="error" sx={{ m: 1 }}>
                  {errors.isActive?.message}
                </Alert>
              )}
            </Stack>
          </Stack>
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
