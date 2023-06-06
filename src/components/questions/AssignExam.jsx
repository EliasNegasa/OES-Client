import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExams, updateExam } from "../../services/exam";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import FormSelect from "../ui/FormSelect";
import { Box, Button, Divider, Stack } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useForm } from "react-hook-form";
import { updateQuestion } from "../../services/questions";
import FormInput from "../ui/FormInput";

export default function AssignExam({ exams, setOpenPopup, questionId }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      exam_id: "",
      id: questionId,
    },
    // resolver: yupResolver(AnswerSchema()),
  });

  const { errors } = formState;

  const { mutate, isSuccess, isLoading, isError, error } =
    useMutation(updateQuestion);

  const onSubmit = (data) => {
    console.log("SUBMITTED DATA", data);
    mutate(data, {
      onSuccess: () => {
        setOpenPopup(false);
      },
    });
  };

  return (
    <>
      {console.log("EXAMS", exams)}
      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
        {isSuccess && (
          <NotificationSnackbars
            message="Question updated successfully"
            severity="success"
          />
        )}
      </>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
        >
          <Stack direction="row">
            <FormSelect
              name="exam_id"
              control={control}
              label="Exams"
              options={exams?.data.map((exam) => [exam.id, exam.exam_name])}
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
