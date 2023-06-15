import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../ui/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { saveCourse } from "../../services/course";
import CourseSchema from "../../validations/course";
import FormSelect from "../ui/FormSelect";

export default function CourseForm({ users, setOpenPopup }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      course_name: "",
      course_year: "",
      course_code: "",
      status: "active",
      lecturer: "",
    },
    resolver: yupResolver(CourseSchema()),
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  useMutation(saveCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(saveCourse);

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
          message="Course added successfully"
          severity="success"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "32ch" },
          }}
        >
          <Stack direction="row">
            <FormInput
              name="course_name"
              control={control}
              label="Course Name"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormInput
              name="course_year"
              control={control}
              label="Course Year"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormInput
              name="course_code"
              control={control}
              label="Course Code"
              errors={errors}
            />
          </Stack>
          <Stack direction="row">
            <FormSelect
              name="lecturer"
              control={control}
              label="Assign Lecturer"
              options={
                users &&
                users?.data.map((user) =>
                  user.roles[0].role_name === "lecturer"
                    ? [user.id, `${user.firstname} ${user.lastname}`]
                    : []
                )
              }
              errors={errors}
              minWidth={320}
            />
          </Stack>
          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right", right: "10px" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
