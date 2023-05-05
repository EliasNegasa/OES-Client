import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import CoursesList from "../courses/CoursesList";
import UsersList from "../users/UsersList";
import Layout from "../Layout";
import QuestionsList from "../questions/QuestionsList";
import ExamsList from "../exams/ExamsList";
import AnswersList from "../answers/AnswersList";
import ResultsList from "../results/ResultsList";
import Dashboard from "../dashboard.jsx/dashboard";
import UserDetails from "../users/UserDetails";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route exact path="auth/signin" element={<Navigate to="/" />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="users/:userId" element={<UserDetails />} />
        <Route path="/exams" element={<ExamsList />} />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/answers" element={<AnswersList />} />
        <Route path="/results" element={<ResultsList />} />
      </Route>
    </Routes>
  );
};

export default Router;
