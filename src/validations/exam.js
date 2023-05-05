import * as yup from "yup";

const ExamSchema = () => {
  return yup.object({
    exam_name: yup.string().required("Exam Name is required"),
    duration_minutes: yup
      .number("Duration must be a number")
      .required("Duration is required")
      .positive()
      .integer()
      .typeError("Enter a valid number"),
    exam_start: yup
      .date()
      .min(new Date(), "Date cannot be in the back")
      .required("Exam Start date is required")
      .typeError("Enter a valid date"),
    exam_end: yup
      .date()
      .min(new Date(), "Date cannot be in the back")
      .required("Exam End date is required")
      .typeError("Enter a valid date"),
  });
};

export default ExamSchema;
