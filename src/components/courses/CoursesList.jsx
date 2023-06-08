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
import { filterCourses, getCourses } from "../../services/course";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import Popup from "../ui/Popup";
import CourseForm from "./CourseForm";
import EditCourse from "./EditCourse";
import { CurrentUserContext } from "../../App";
import { getUsers } from "../../services/user";

export default function CoursesList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [course, setCourse] = useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const role = currentUser.roles[0].role_name;

  const {
    isLoading,
    data: courses,
    isError,
    error,
  } = useQuery(
    ["courses-list", currentUser.id],
    role == "admin"
      ? getCourses
      : () => filterCourses(`lecturer=${currentUser.id}`)
  );

  const { data: users } = useQuery(["users-list"], getUsers);

  const handleEditClicked = (course) => {
    setOpenPopup(true);
    setCourse(course);
    console.log("Course", course);
  };

  const handleCreateClicked = () => {
    setCourse("");
    setOpenPopup(true);
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Courses
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateClicked}
          startIcon={<MenuBookOutlinedIcon />}
        >
          Create Course
        </Button>
      </Stack>

      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>

      <Grid container spacing={4}>
        {courses &&
          courses?.data.map((course) => (
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
                    <Button size="small">Exams</Button>
                    <Button size="small">Students</Button>
                  </CardActions>
                  <CardActions>
                    <Button
                      variant="text"
                      onClick={() => handleEditClicked(course)}
                      startIcon={<ModeEditOutlineOutlinedIcon />}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Stack>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={
          course ? "Update Course Information" : "Enter Course Information"
        }
      >
        {course ? (
          <EditCourse
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            course={course}
          />
        ) : (
          <CourseForm
            users={users}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />
        )}
      </Popup>
    </>
  );
}
