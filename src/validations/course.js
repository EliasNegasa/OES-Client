import * as yup from "yup";

export default function CourseSchema() {
  return yup.object({
    course_name: yup.string().required("Course Name is required"),
    course_year: yup
      .number("Course Year must be a number")
      .max(10)
      .required("Course Year is required")
      .positive()
      .integer()
      .typeError("Enter a number"),
    course_code: yup.string().required("Course Code is required"),
  });
}
