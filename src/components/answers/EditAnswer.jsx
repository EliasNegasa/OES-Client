import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { useMutation } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import AnswerSchema from "../../validations/answer";
import { updateAnswer } from "../../services/answer";

export default function EditAnswer({ setOpenPopup, answer }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: answer.id,
      answer_text: answer.answer_text,
      is_correct: answer.is_correct,
    },
    resolver: yupResolver(AnswerSchema()),
  });

  const { errors } = formState;

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateAnswer);

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
          message="Answer updated successfully"
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
            <FormInput
              name="answer_text"
              control={control}
              label="Answer Text"
              errors={errors}
              multiline
              rows={6}
            />
          </Stack>
          <Stack direction="row">
            <FormSelect
              name="is_correct"
              control={control}
              label="Correct Answer"
              options={[
                ["True", "True"],
                ["False", "False"],
              ]}
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
