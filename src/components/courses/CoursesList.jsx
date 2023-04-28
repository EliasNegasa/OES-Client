import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Stack } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function CoursesList() {
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Courses
      </Typography>

      <Grid container spacing={4}>
        {courseData.map((course) => (
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
                  <IconButton aria-label="edit">
                    <Button size="small">
                      <ModeEditOutlineOutlinedIcon
                        color="action"
                        sx={{ fontSize: "1rem", marginRight: 1 }}
                      />
                      Edit
                    </Button>
                  </IconButton>
                </CardActions>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const courseData = [
  {
    id: 2,
    course_name: "C++",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-14T20:10:30.005Z",
    updatedAt: "2023-04-14T20:10:30.005Z",
  },
  {
    id: 3,
    course_name: "HTML",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 1,
    createdAt: "2023-04-14T20:10:45.433Z",
    updatedAt: "2023-04-14T20:10:45.433Z",
  },
  {
    id: 4,
    course_name: "HTML",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 1,
    createdAt: "2023-04-14T20:49:08.557Z",
    updatedAt: "2023-04-14T20:49:08.557Z",
  },
  {
    id: 1,
    course_name: "Java",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-14T20:10:22.684Z",
    updatedAt: "2023-04-25T09:22:48.511Z",
  },
  {
    id: 5,
    course_name: "test",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-25T09:23:20.528Z",
    updatedAt: "2023-04-25T09:23:20.528Z",
  },
  {
    id: 23,
    course_name: "Java",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-14T20:10:22.684Z",
    updatedAt: "2023-04-25T09:22:48.511Z",
  },
  {
    id: 332,
    course_name: "test",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-25T09:23:20.528Z",
    updatedAt: "2023-04-25T09:23:20.528Z",
  },
  {
    id: 112,
    course_name: "Java",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-14T20:10:22.684Z",
    updatedAt: "2023-04-25T09:22:48.511Z",
  },
  {
    id: 5,
    course_name: "test",
    course_code:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus optio delectus unde, accusamus at hic harum saepe corrupti impedit necessitatibus corporis ex? Libero doloribus quod voluptatem aliquid facilis repellat.",
    course_year: 3,
    createdAt: "2023-04-25T09:23:20.528Z",
    updatedAt: "2023-04-25T09:23:20.528Z",
  },
];
