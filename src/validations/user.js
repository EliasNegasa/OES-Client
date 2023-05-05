import * as yup from "yup";

const UserSchema = () => {
  return yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    academic_year: yup
      .number("Academic Year must be a number")
      .max(10)
      .required("Academic Year is required")
      .positive()
      .integer()
      .typeError("Enter a valid Number"),
    isActive: yup.string().required("User Status is required"),
  });
};

export default UserSchema;
