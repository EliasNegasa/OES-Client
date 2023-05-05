import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import FormInput from "../ui/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { updateCourse } from "../../services/course";
import CourseSchema from "../../validations/course";

export default function EditCourse({ setOpenPopup, course }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: course.id,
      course_name: course.course_name,
      course_year: course.course_year,
      course_code: course.course_code,
    },
    resolver: yupResolver(CourseSchema()),
  });

  const { errors } = formState;

  const queryClient = useQueryClient();

  useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateCourse);

  const onSubmit = (data) => {
    console.log("Course", data);
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
          message="Course updated successfully"
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
      <DevTool control={control} placement="top-left" />
    </>
  );
}
