import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import FormSelect from "../ui/FormSelect";
import { useMutation } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { saveEnrollment } from "../../services/enrollment";
import { updateUser } from "../../services/user";
import EnrollmentSchema from "../../validations/enrollment";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateEnrollment({
  setOpenPopup,
  exams,
  users,
  courses,
}) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      enrollment_date: Date.now(),
      user_id: "",
      course_id: "",
      exam_id: "",
      status: "pending",
    },
    // resolver: yupResolver(EnrollmentSchema()),
  });

  const { errors } = formState;

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(saveEnrollment);

  const { mutate: mutateUser } = useMutation(updateUser);

  const onSubmit = (data) => {
    console.log("Data Enrollment", data);
    mutateUser({
      id: data.user_id,
      courses: [
        {
          id: data.course_id,
        },
      ],
    });
    mutate(data, {
      onSuccess: () => {
        setOpenPopup(false);
      },
    });
  };

  return (
    <>
      {console.log("Users", users)}
      {isLoading && <BackdropLoader />}

      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {isSuccess && (
        <NotificationSnackbars
          message="Enrollment created successfully"
          severity="success"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
        >
          <Stack direction="row">
            <FormSelect
              name="course_id"
              control={control}
              label="Select Course"
              options={
                courses &&
                courses?.data.map((course) => [course.id, course.course_name])
              }
              errors={errors}
              minWidth={350}
            />
          </Stack>
          <Stack direction="row">
            <FormSelect
              name="exam_id"
              control={control}
              label="Select Exam"
              options={
                exams && exams?.data.map((exam) => [exam.id, exam.exam_name])
              }
              errors={errors}
              minWidth={350}
            />
          </Stack>
          <Stack direction="row">
            <FormSelect
              name="user_id"
              control={control}
              label="Select Student"
              options={
                users &&
                users?.data.map((user) =>
                  user.roles[0].role_name === "student"
                    ? [user.id, `${user.firstname} ${user.lastname}`]
                    : []
                )
              }
              errors={errors}
              minWidth={350}
            />
          </Stack>

          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right", right: "5px" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
