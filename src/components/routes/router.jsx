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
import EnrollmentsList from "../enrollments/EnrollmentsList";
import SingleExam from "../exams/SingleExam";
import QuizResult from "../quiz/QuizResult";
import VideoStreaming from "../video/VideoStream";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/me/dashboard" element={<Navigate to="/" />} />
        <Route exact path="auth/signin" element={<Navigate to="/" />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/me/courses" element={<CoursesList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="users/:userId" element={<UserDetails />} />
        <Route path="/me/users/:userId" element={<UserDetails />} />
        <Route path="/exams" element={<ExamsList />} />
        <Route path="/me/exams" element={<ExamsList />} />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/answers" element={<AnswersList />} />
        <Route path="/enrollments" element={<EnrollmentsList />} />
        <Route path="/me/enrollments" element={<EnrollmentsList />} />
        <Route path="/enrollments/:examId/takequiz" element={<SingleExam />} />
        <Route
          path="/enrollments/:examId/your_results"
          element={<QuizResult />}
        />
        <Route path="/results" element={<ResultsList />} />
        <Route path="/me/results" element={<ResultsList />} />
        <Route path="/monitor-live" element={<VideoStreaming />} />
      </Route>
    </Routes>
  );
};

export default Router;
