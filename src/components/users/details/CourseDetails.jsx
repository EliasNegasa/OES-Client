import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/user";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const CourseDetails = ({ userId }) => {
  const { isLoading, data, isError, error } = useQuery(["user", userId], () =>
    getUser(userId)
  );

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          My Courses
        </Typography>
      </Stack>
      {isLoading && <BackdropLoader />}
      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {data && console.log("Data", data.data.courses)}
      <Grid container spacing={4}>
        {data &&
          data?.data?.courses.map((course) => (
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
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CourseDetails;
