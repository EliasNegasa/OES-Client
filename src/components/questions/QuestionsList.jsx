import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import { Grid, Stack } from "@mui/material";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ParseDate from "../../utils/parseDate";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import Popup from "../ui/Popup";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { getQuestions } from "../../services/questions";
import CreateQuestion from "./CreateQuestion";
import EditQuestion from "./EditForm";

const QuestionsList = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [question, setQuestion] = useState("");

  const {
    isLoading,
    data: questions,
    isError,
    error,
  } = useQuery(["questions-list"], getQuestions);

  const handleEditClicked = (question) => {
    setOpenPopup(true);
    setQuestion(question);
    console.log("question", question);
  };

  const handleCreateClicked = () => {
    setQuestion("");
    setOpenPopup(true);
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Questions
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateClicked}
          startIcon={<StickyNote2OutlinedIcon />}
        >
          Create Questions
        </Button>
      </Stack>

      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>

      <Grid container spacing={4}>
        {questions &&
          questions?.data.map((question) => (
            <Grid item key={question.id} xs={12} sm={6} md={6}>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "97%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="p">
                      {question.question_text}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="span"
                    ></Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Stack direction="column">
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <IconButton>
                          <RadioButtonCheckedOutlinedIcon />
                        </IconButton>
                        answer
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <IconButton>
                          <RadioButtonCheckedOutlinedIcon />
                        </IconButton>
                        answer
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <IconButton>
                          <RadioButtonCheckedOutlinedIcon />
                        </IconButton>
                        answer
                      </Stack>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "flex-end",
                      alignItems: "stretch",
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    <Button
                      variant="text"
                      onClick={() => handleEditClicked(question)}
                      startIcon={<ModeEditOutlineOutlinedIcon />}
                    >
                      Edit
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={
          question
            ? "Update Question Information"
            : "Enter Question Information"
        }
      >
        {question ? (
          <EditQuestion
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            question={question}
          />
        ) : (
          <CreateQuestion openPopup={openPopup} setOpenPopup={setOpenPopup} />
        )}
      </Popup>
    </>
  );
};

export default QuestionsList;

const questionData = [
  {
    id: 2,
    question_text:
      "An angular 2 project written in typescript is* transpiled to javascript duri*ng the build process. Which of the following additional features are provided to the developer while programming on typescript over javascript?",
    question_type: "choice",
    remarks: null,
    createdAt: "2023-05-05T21:56:44.822Z",
    updatedAt: "2023-05-05T21:56:44.822Z",
    exam_id: 1,
    exam: {
      id: 1,
      exam_name: "Java Exam",
      duration_minutes: 120,
      exam_start: "2023-04-12T20:26:44.755Z",
      exam_end: "2023-04-12T20:26:44.755Z",
      createdAt: "2023-05-05T15:29:15.540Z",
      updatedAt: "2023-05-05T15:29:15.540Z",
      course_id: null,
    },
    answers: [],
  },
  {
    id: 5,
    question_text: "typescript over javascript?",
    question_type: "choice",
    remarks: null,
    createdAt: "2023-05-05T21:58:06.401Z",
    updatedAt: "2023-05-05T21:58:06.401Z",
    exam_id: null,
    exam: null,
    answers: [],
  },
  {
    id: 4,
    question_text: "Which of the following additional features are provided",
    question_type: "choice",
    remarks: null,
    createdAt: "2023-05-05T21:57:42.605Z",
    updatedAt: "2023-05-05T21:57:42.605Z",
    exam_id: null,
    exam: null,
    answers: [],
  },
  {
    id: 1,
    question_text: "Package?",
    question_type: "choice",
    remarks: null,
    createdAt: "2023-05-05T21:56:03.874Z",
    updatedAt: "2023-05-05T21:56:03.874Z",
    exam_id: 1,
    exam: {
      id: 1,
      exam_name: "Java Exam",
      duration_minutes: 120,
      exam_start: "2023-04-12T20:26:44.755Z",
      exam_end: "2023-04-12T20:26:44.755Z",
      createdAt: "2023-05-05T15:29:15.540Z",
      updatedAt: "2023-05-05T15:29:15.540Z",
      course_id: null,
    },
    answers: [],
  },
  {
    id: 3,
    question_text: "An angular 2 project written in typescript",
    question_type: "choice",
    remarks: null,
    createdAt: "2023-05-05T21:57:24.295Z",
    updatedAt: "2023-05-05T21:57:24.295Z",
    exam_id: 1,
    exam: {
      id: 1,
      exam_name: "Java Exam",
      duration_minutes: 120,
      exam_start: "2023-04-12T20:26:44.755Z",
      exam_end: "2023-04-12T20:26:44.755Z",
      createdAt: "2023-05-05T15:29:15.540Z",
      updatedAt: "2023-05-05T15:29:15.540Z",
      course_id: null,
    },
    answers: [],
  },
];
