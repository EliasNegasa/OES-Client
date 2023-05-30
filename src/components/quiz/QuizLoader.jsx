import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormRadio from "../ui/FormRadio";
import { getResults, saveResult } from "../../services/results";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationSnackbars from "../ui/Snackbar";
import BackdropLoader from "../ui/Backdrop";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../ui/Popup";
import _ from "lodash";
import Timer from "../ui/Timer";
import Instruction from "./Instruction";

const QuizLoader = ({ questions, exam }) => {
  const [openPopup, setOpenPopup] = useState(true);
  const [startTimer, setStartTimer] = useState(false);
  const [result, setResult] = useState({});
  const [amount, setAmount] = useState(0);
  const [correct, setCorrect] = useState([]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
    // resolver: yupResolver(QuestionSchema()),
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
        // navigate(`enrollments/${exam.enrollment_id}/your_results`);
      },
    }
  );

  const handleStart = () => {
    setOpenPopup(false);
    setStartTimer(true);
  };

  const onSubmit = (data) => {
    let score = 0;
    let amount = 0;
    let correctUserAnswer = [];

    setAmount(0);
    console.log("DATAA", data);

    // calculate score
    questions.forEach((question) => {
      amount++;
      const correctAnswer = question.answers.find(
        (answer) => answer.is_correct
      );
      console.log("CORRECT ANSWERS", correctAnswer);
      if (data[`question_${question.id}`] === correctAnswer.answer_text) {
        score++;

        correctUserAnswer = _.concat(correctUserAnswer, question.id);
      }
    });
    mutate({
      score: score,
      exam_id: exam.id,
      enrollment_id: exam.enrollment_id,
    });
    setAmount(amount);
    setCorrect(correctUserAnswer);
  };

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
      {exam && startTimer && <Timer duration={exam.duration_minutes} />}

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
          <Link to={`/enrollments`}>
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
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Result">
          <Container component="main">
            <Grid container alignItems="flex-end">
              <Grid item sx={{ minWidth: "400px" }}>
                <Card>
                  <CardHeader
                    subheader={exam?.exam_name}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{
                      align: "center",
                      color: "#fff",
                    }}
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#fff",
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        {result.score}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /{amount}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      onClick={() => {
                        setOpenPopup(false);
                      }}
                    >
                      View Answers
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Popup>
      )}
    </>
  );
};

export default QuizLoader;
