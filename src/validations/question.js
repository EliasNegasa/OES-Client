import * as yup from "yup";

const QuestionSchema = () => {
  return yup.object({
    question_text: yup.string().required("Question Text is required"),
    question_type: yup.string().required("Question Type is required"),
  });
};

export default QuestionSchema;
