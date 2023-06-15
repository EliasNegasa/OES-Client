import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { updateUser } from "../../services/user";
import { useMutation } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import UserSchema from "../../validations/user";

export default function EditForm({ setOpenPopup, user }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      academic_year: user.academic_year,
      roles: [{ role_name: user.role_name || "" }],
      isActive: user.isActive,
      password: user.password,
    },
    resolver: yupResolver(UserSchema()),
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
          message="User updated successfully"
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
              options={[
                ["Student", "Student"],
                ["Admin", "Admin"],
                ["Lecturer", "Lecturer"],
              ]}
              errors={errors}
            />

            <FormSelect
              name="isActive"
              control={control}
              label="Status"
              options={[
                ["Active", "Active"],
                ["Deactive", "Deactive"],
              ]}
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
    </>
  );
}
