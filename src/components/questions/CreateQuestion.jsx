import React, { useState } from "react";
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
import QuestionSchema from "../../validations/question";
import { saveQuestion } from "../../services/questions";
import FormSelect from "../ui/FormSelect";

export default function CreateQuestion({ setOpenPopup }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      question_text: "",
      question_type: "",
    },
    resolver: yupResolver(QuestionSchema()),
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  useMutation(saveQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(["questions-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(saveQuestion);

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
          message="Question added successfully"
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
              name="question_text"
              control={control}
              label="Question Text"
              errors={errors}
              multiline
              rows={6}
            />
          </Stack>

          <Stack direction="row">
            <FormSelect
              name="question_type"
              control={control}
              label="Question Type"
              errors={errors}
              options={["Single Choice", "True/False", "Multiple Choice"]}
              sx={{ minWidth: 320 }}
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
