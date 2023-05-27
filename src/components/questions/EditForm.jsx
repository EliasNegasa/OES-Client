import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { updateQuestion } from "../../services/questions";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormSelect from "../ui/FormSelect";
import FormCheckbox from "../ui/FormCheckbox";

export default function EditQuestion({ question, setOpenPopup }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: question.id,
      question_text: question.question_text,
      question_type: question.question_type || "",
      answers: [
        question.answers &&
          question.answers.map((answer) => {
            return {
              answer_text: answer.answer_text,
              is_correct: answer.is_correct,
            };
          }),
      ],
    },
    resolver: yupResolver(QuestionSchema()),
  });

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control,
  });

  const queryClient = useQueryClient();
  useMutation(updateQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(["questions-list"]);
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateQuestion);

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
          message="Question updated successfully"
          severity="success"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "40ch",

              position: "relative",
            },
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
              sx={{ minWidth: 400 }}
            />
          </Stack>

          {fields.map((field, index) => {
            return (
              <Stack>
                <Stack direction="row" key={field.id}>
                  <FormInput
                    name={`answers.${index}.answer_text`}
                    control={control}
                    label={`Answer ${index + 1}`}
                    errors={errors}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => remove(index)}
                    sx={{ minWidth: "10px" }}
                  >
                    <CloseOutlinedIcon
                      color="action"
                      sx={{ fontSize: "1rem" }}
                    />
                  </Button>
                </Stack>
                <FormCheckbox
                  name={`answers.${index}.is_correct`}
                  control={control}
                  label={"Correct Answer"}
                  errors={errors}
                  sx={{ ml: "10px" }}
                />
              </Stack>
            );
          })}

          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="text"
              startIcon={<AddOutlinedIcon />}
              onClick={() => append({ answer_text: "" })}
              sx={{ right: "40px" }}
            >
              Add Answer
            </Button>
          </Stack>

          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right", right: "40px" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
