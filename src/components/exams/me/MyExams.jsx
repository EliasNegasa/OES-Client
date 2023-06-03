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
import ParseDate from "../../../utils/parseDate";
import { getExams } from "../../../services/exam";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import {
  filterEnrollments,
  saveEnrollment,
} from "../../../services/enrollment";
import { Link } from "react-router-dom";

export default function MyExams({ userId }) {
  const {
    isLoading,
    data: enrollments,
    isError,
    error,
  } = useQuery(["user-exams-list", userId], () =>
    filterEnrollments(`user_id=${userId}`)
  );

  return (
    <>
      {console.log("MY Enrollments", enrollments?.data)}
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Assigned Exams
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
            <>
              {enrollment.course?.exams.map((ex) => {
                if (enrollment.exam_id === ex.id) {
                  return (
                    <>
                      <Grid item key={enrollment.id} xs={12} sm={6} md={3}>
                        <Card sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "97%",
                            }}
                          >
                            {" "}
                            <CardContent sx={{ flex: "1 0 auto" }}>
                              <Typography component="div" variant="h5">
                                {console.log("EEX", ex)}
                                {ex.exam_name}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="span"
                              >
                                Duration: {ex.duration_minutes} minutes
                              </Typography>
                            </CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                pl: 1,
                                pb: 1,
                              }}
                            >
                              <IconButton>
                                <AlarmOutlinedIcon />
                              </IconButton>
                              {ParseDate(ex.exam_start)} -{" "}
                              {ParseDate(ex.exam_end)}
                            </Box>
                            <Stack
                              direction="row"
                              sx={{
                                justifyContent: "end",
                                width: "98%",
                                margin: "8px auto",
                              }}
                            >
                              {enrollment.status == "pending" ? (
                                <Link
                                  to={`/enrollments/${enrollment.exam_id}/takequiz`}
                                >
                                  <Button variant="outlined">Take Exam</Button>
                                </Link>
                              ) : (
                                <Link
                                  to={`/enrollments/${enrollment.exam_id}/result`}
                                >
                                  <Button variant="outlined">
                                    View Result
                                  </Button>
                                </Link>
                              )}
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    </>
                  );
                }
              })}
            </>
          ))}
      </Grid>
    </>
  );
}
