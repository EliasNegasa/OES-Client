import * as yup from "yup";

const ResultSchema = () => {
  return yup.object({
    score: yup.number().required("Score is required"),
    status: yup.number().required("Number of Questions is required"),
  });
};

export default ResultSchema;
