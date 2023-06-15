import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Chip, Grid, Stack } from "@mui/material";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import Popup from "../ui/Popup";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { filterQuestions, getQuestions } from "../../services/questions";
import CreateQuestion from "./CreateQuestion";
import EditQuestion from "./EditForm";
import AssignExam from "./AssignExam";
import { getExams } from "../../services/exam";
import { CurrentUserContext } from "../../App";

const QuestionsList = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [assignExam, setAssignExam] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const role = currentUser.roles[0].role_name;

  const {
    isLoading,
    data: questions,
    isError,
    error,
  } = useQuery(
    ["questions-list", currentUser.id],
    getQuestions
    // : () => filterQuestions(`exam.lecturer=${currentUser.id}`)
  );

  const { data: exams } = useQuery(["exams-list"], getExams);

  const handleEditClicked = (question) => {
    setOpenPopup(true);
    setQuestion(question);
    console.log("question", question);
  };

  const handleCreateClicked = () => {
    setQuestion("");
    setAssignExam(false);
    setOpenPopup(true);
  };

  const handleAssignExamClicked = (id) => {
    setQuestionId(id);
    setQuestion("");
    setAssignExam(true);
    setOpenPopup(true);
    console.log("ID", id);
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
                    <Button
                      onClick={() => handleAssignExamClicked(question.id)}
                    >
                      <Chip
                        label={
                          question.exam
                            ? question.exam.exam_name
                            : "No exam assigned"
                        }
                        color={question.exam ? "success" : "error"}
                        variant="outlined"
                        size="small"
                        sx={{ mb: "10px" }}
                      />
                    </Button>
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
                      {question.answers &&
                        question.answers.map((answer) => (
                          <Stack
                            key={answer.id}
                            direction="row"
                            sx={{ alignItems: "center" }}
                          >
                            <IconButton>
                              <RadioButtonCheckedOutlinedIcon />
                            </IconButton>
                            {answer.answer_text}
                          </Stack>
                        ))}
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "flex-end",
                      alignItems: "stretch",
                      width: "100%",
                      ml: "10px",
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
            : assignExam
            ? "Assign Exam"
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
          <>
            {assignExam ? (
              <AssignExam
                exams={exams}
                questionId={questionId}
                setOpenPopup={setOpenPopup}
              />
            ) : (
              <CreateQuestion
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              />
            )}
          </>
        )}
      </Popup>
    </>
  );
};

export default QuestionsList;
