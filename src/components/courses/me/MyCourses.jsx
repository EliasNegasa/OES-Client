import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Stack } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useQuery } from "@tanstack/react-query";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { getUser } from "../../../services/user";

export default function MyCourses({ userId }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [course, setCourse] = useState("");

  const {
    isLoading,
    data: user,
    isError,
    error,
  } = useQuery(["user-courses-list", userId], () => getUser(userId));

  return (
    <>
      {console.log("LOG", user)}
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          My Courses
        </Typography>
      </Stack>

      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>

      <Grid container spacing={4}>
        {user &&
          user.data?.courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://images.unsplash.com/photo-1508830524289-0adcbe822b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1125&q=80"
                  title="Course"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.course_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", fontSize: "12px" }}
                  >
                    Academic Year: {course.course_year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.course_code}
                  </Typography>
                </CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <CardActions>
                    <Button size="small">Show Exams</Button>
                  </CardActions>
                </Stack>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
