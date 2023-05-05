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
import { getExams } from "../../services/exam";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import Popup from "../ui/Popup";
import CreateExam from "./CreateExam";
import EditExam from "./EditExam";

export default function ExamsList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [exam, setExam] = useState("");

  const {
    isLoading,
    data: exams,
    isError,
    error,
  } = useQuery(["exams-list"], getExams);

  const handleEditClicked = (exam) => {
    setOpenPopup(true);
    setExam(exam);
    console.log("exam", exam);
  };

  const handleCreateClicked = () => {
    setExam("");
    setOpenPopup(true);
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Exams
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateClicked}
          startIcon={<StickyNote2OutlinedIcon />}
        >
          Create Exam
        </Button>
      </Stack>

      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>

      <Grid container spacing={4}>
        {exams &&
          exams?.data.map((exam) => (
            <Grid item key={exam.id} xs={12} sm={6} md={3}>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "97%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {exam.exam_name}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="span"
                    >
                      Duration: {exam.duration_minutes} minutes
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <IconButton>
                      <AlarmOutlinedIcon />
                    </IconButton>
                    {ParseDate(exam.exam_start)} - {ParseDate(exam.exam_end)}
                  </Box>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "flex-end", width: "100%" }}
                  >
                    <Button
                      variant="text"
                      onClick={() => handleEditClicked(exam)}
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
        title={exam ? "Update Exam Information" : "Enter Exam Information"}
      >
        {exam ? (
          <EditExam
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            exam={exam}
          />
        ) : (
          <CreateExam openPopup={openPopup} setOpenPopup={setOpenPopup} />
        )}
      </Popup>
    </>
  );
}
