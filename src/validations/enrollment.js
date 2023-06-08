import * as yup from "yup";

const EnrollmentSchema = () => {
  return yup.object({
    user_id: yup.string().required("Student is required"),
    course_id: yup.string().required("Course Name is required"),
    exam_id: yup.string().required("Exam Name is required"),
  });
};

export default EnrollmentSchema;
