import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormRadio from "../ui/FormRadio";
import { getResults, saveResult } from "../../services/results";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationSnackbars from "../ui/Snackbar";
import BackdropLoader from "../ui/Backdrop";
import { Link } from "react-router-dom";
import Popup from "../ui/Popup";
import _ from "lodash";
import Timer from "../ui/Timer";
import Instruction from "./Instruction";
import { updateEnrollment } from "../../services/enrollment";
import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import QuizResult from "./QuizResult";
import VideoStreaming from "../video/VideoStream";

const QuizLoader = ({ questions, exam }) => {
  const [openPopup, setOpenPopup] = useState(true);
  const [startTimer, setStartTimer] = useState(false);
  const [result, setResult] = useState({});
  const [amount, setAmount] = useState(0);
  const [correct, setCorrect] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const [timerIsUp, setTimerIsUp] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });

  const { errors, isDirty } = formState;

  useQuery(["result"], getResults);

  const queryClient = useQueryClient();

  const { data, mutate, isLoading, isError, isSuccess, error } = useMutation(
    saveResult,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["result"]);
        console.log("IN MUTATION", data);
        setResult(data.data);
        setOpenPopup(true);
      },
    }
  );

  const { data: enroll, mutate: mutateEnrollment } =
    useMutation(updateEnrollment);

  const handleStart = () => {
    setOpenPopup(false);
    setStartTimer(true);
  };

  const onSubmit = (data) => {
    let score = 0;
    let amount = 0;
    let correctUserAnswer = [];

    setAmount(0);

    // calculate score
    questions.forEach((question) => {
      amount++;
      const correctAnswer = question.answers.find(
        (answer) => answer.is_correct
      );
      if (data[`question_${question.id}`] === correctAnswer.answer_text) {
        score++;

        correctUserAnswer = _.concat(correctUserAnswer, question.id);
      }
    });

    mutate({
      score: score,
      exam_id: exam.id,
      enrollment_id: exam.enrollment_id,
      status: amount,
    });

    mutateEnrollment({
      id: exam.enrollment_id,
      status: "taken",
    });

    setAmount(amount);
    setCorrect(correctUserAnswer);
  };

  useEffect(() => {
    if (timerIsUp == true) {
      handleSubmit(onSubmit)();
    }
  }, [timerIsUp]);

  return (
    <>
      {isLoading && <BackdropLoader />}

      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {isSuccess && (
        <NotificationSnackbars
          message="Exam Submitted successfully"
          severity="success"
        />
      )}
      {exam && startTimer && !isSuccess && (
        <Timer
          duration={exam.duration_minutes}
          timerIsUp={timerIsUp}
          setTimerIsUp={setTimerIsUp}
        />
      )}
      <VideoStreaming />
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions?.map((question) => (
          <Grid
            container
            key={question.id}
            spacing={2}
            sx={{ margin: "10px 0" }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "97%",
                    margin: "20px",
                  }}
                >
                  <FormRadio
                    name={`question_${question.id}`}
                    control={control}
                    label={question.question_text}
                    errors={errors}
                    options={question.answers.map(
                      (answer) => answer.answer_text
                    )}
                  />

                  {!openPopup &&
                    isSuccess &&
                    question.answers.map(
                      (answer) =>
                        answer.is_correct && (
                          <Alert
                            severity={
                              _.indexOf(correct, question.id) === -1
                                ? "error"
                                : "success"
                            }
                          >
                            <b>Correct Answer:</b> {answer.answer_text}
                          </Alert>
                        )
                    )}
                </Box>
              </Card>
            </Grid>
          </Grid>
        ))}
        {!isSuccess && (
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty}
            sx={{ mt: 2, float: "right" }}
          >
            Submit Exam
          </Button>
        )}
        {isSuccess && (
          <Link to={`/me/enrollments/${currentUser.id}`}>
            <Button variant="contained" sx={{ mt: 2, float: "right" }}>
              Exit Exam
            </Button>
          </Link>
        )}
      </form>

      {!isSuccess && exam && (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Instructions"
        >
          <Instruction
            duration={exam.duration_minutes}
            number={questions.length}
          />
          <Stack>
            <Button
              variant="contained"
              onClick={handleStart}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              Start
            </Button>
          </Stack>
        </Popup>
      )}
      {isSuccess && (
        <QuizResult
          exam_name={exam?.exam_name}
          score={result.score}
          amount={amount}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      )}
    </>
  );
};

export default QuizLoader;
