import * as yup from "yup";

const AnswerSchema = () => {
  return yup.object({
    answer_text: yup.string().required("Answer Text is required"),
    is_correct: yup.boolean(),
  });
};

export default AnswerSchema;
