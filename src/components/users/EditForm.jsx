import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { updateUser } from "../../services/user";
import { useMutation } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";

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
      password: singleUser.password,
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateUser);

  const onSubmit = (data) => {
    console.log("Data", data);
    mutate(data, {
      onSuccess: () => {
        setOpenPopup(false);
      },
    });
  };

  return (
    <>
      {isLoading && <BackdropLoader />}

      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {isSuccess && (
        <NotificationSnackbars
          message="User added successfully"
          severity="success"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <Stack direction="row">
            <FormInput
              name="firstname"
              control={control}
              label="First Name"
              errors={errors}
            />

            <FormInput
              name="lastname"
              control={control}
              label="Last Name"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormInput
              name="email"
              control={control}
              label="Email Address"
              errors={errors}
            />

            <FormInput
              name="academic_year"
              control={control}
              label="Academic year"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormSelect
              name="roles[0].role_name"
              control={control}
              label="Role"
              options={["Student", "Admin", "Lecturer"]}
              errors={errors}
            />

            <FormSelect
              name="isActive"
              control={control}
              label="Status"
              options={["Active", "Deactive"]}
              errors={errors}
            />
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
    </>
  );
}
