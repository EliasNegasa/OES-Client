import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack, TextField, useRadioGroup } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import FormInput from "../ui/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { updateExam } from "../../services/exam";
import FormDate from "../ui/FormDate";
import ExamSchema from "../../validations/exam";
import ParseDate from "../../utils/parseDate";

export default function EditExam({ exam, setOpenPopup }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: exam.id,
      exam_name: exam.exam_name,
      duration_minutes: exam.duration_minutes,
      exam_start: ParseDate(exam.exam_start),
      exam_end: "",
    },
    resolver: yupResolver(ExamSchema()),
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  useMutation(updateExam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["exams-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateExam);

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
          message="Exam updated successfully"
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
              name="exam_name"
              control={control}
              label="Exam Name"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormInput
              name="duration_minutes"
              control={control}
              label="Exam Duration"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormDate
              name="exam_start"
              control={control}
              label="Start Date"
              errors={errors}
            />
          </Stack>

          <Stack direction="row">
            <FormDate
              name="exam_end"
              control={control}
              label="End Date"
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
