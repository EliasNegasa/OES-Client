import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Stack } from "@mui/material";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import ParseDate from "../../../utils/parseDate";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import { filterEnrollments } from "../../../services/enrollment";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import QuizResult from "../../quiz/QuizResult";
import { filterResults } from "../../../services/results";

export default function MyEnrollments({ userId }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [enrollment, setEnrollment] = useState("");
  const [resultId, setResultId] = useState(null);

  const {
    isLoading,
    data: enrollments,
    isError,
    error,
  } = useQuery(["user-enrollments-list", userId], () =>
    filterEnrollments(`user_id=${userId}`)
  );

  const { data: results, refetch } = useQuery(
    ["user-results-list", resultId],
    () => filterResults(`enrollment_id=${resultId}`)
  );

  const handleResultClicked = (id) => {
    setResultId(id);
    refetch();
    // console.log("Result Clicked", id);
    // setResult(true);
    setOpenPopup(true);
  };

  return (
    <>
      {console.log("RESULT VIEW", results?.data)}
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Enrolled Exams
        </Typography>
      </Stack>

      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>

      <Grid container spacing={4}>
        {enrollments &&
          enrollments?.data.map((enrollment) => (
            <Grid item key={enrollment.id} xs={12} sm={6} md={3}>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "97%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Chip
                      label={enrollment.status}
                      color={
                        enrollment.status == "pending" ? "warning" : "success"
                      }
                      size="small"
                      sx={{ float: "right" }}
                    />
                    <Typography component="div" variant="h5">
                      {enrollment?.course?.course_name}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="span"
                    >
                      Enrolled on: {ParseDate(enrollment.enrollment_date)}
                    </Typography>
                  </CardContent>

                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "end",
                      width: "98%",
                      margin: "8px auto",
                    }}
                  >
                    {enrollment.status == "pending" ? (
                      <Link to={`/enrollments/${enrollment.exam_id}/takequiz`}>
                        <Button variant="outlined">Take Exam</Button>
                      </Link>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleResultClicked(enrollment.id)}
                      >
                        View Result
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
      {resultId && (
        <QuizResult
          exam_name={enrollment?.course?.course_name}
          score={results?.data[0].score}
          amount={results?.data[0].status}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          status={false}
        />
      )}
    </>
  );
}
