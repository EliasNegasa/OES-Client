import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUser } from "../../services/user";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import UserSchema from "../../validations/user";

export default function UserForm({ setOpenPopup }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      academic_year: "",
      roles: [{ role_name: "" }],
      isActive: "",
    },
    resolver: yupResolver(UserSchema()),
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  useMutation(saveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(saveUser);

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

{
  /* <Stack direction="column">
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
            </Stack> */
}
