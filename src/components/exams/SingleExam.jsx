import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { getExam } from "../../services/exam";
import QuizLoader from "../quiz/QuizLoader";

const SingleExam = () => {
  const { examId } = useParams();

  const {
    isLoading,
    data: exam,
    isError,
    error,
  } = useQuery(["single-exam", examId], () => getExam(examId));

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          {exam?.data.exam_name}
        </Typography>
      </Stack>
      {isLoading && <BackdropLoader />}
      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {exam && console.log("SINGLE EXAM", exam?.data)}
      <QuizLoader questions={exam?.data.questions} exam={exam?.data} />
    </>
  );
};

export default SingleExam;
