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
import PersonalInfo from "../users/me/PersonalInfo";
import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import MyCourses from "../courses/me/MyCourses";
import MyExams from "../exams/me/MyExams";
import MyEnrollments from "../enrollments/me/MyEnrollments";
import MyResults from "../results/me/MyResults";

const Router = () => {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser.id;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/me/dashboard" element={<Navigate to="/" />} />
        <Route exact path="auth/signin" element={<Navigate to="/" />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route
          path={`/me/courses/${userId}`}
          element={<MyCourses userId={userId} />}
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserDetails />} />
        <Route
          path={`/me/users/${userId}`}
          element={<PersonalInfo userId={userId} />}
        />
        <Route path="/exams" element={<ExamsList />} />
        <Route
          path={`/me/exams/${userId}`}
          element={<MyExams userId={userId} />}
        />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/answers" element={<AnswersList />} />
        <Route path="/enrollments" element={<EnrollmentsList />} />
        <Route
          path={`/me/enrollments/${userId}`}
          element={<MyEnrollments userId={userId} />}
        />
        <Route path="/enrollments/:examId/takequiz" element={<SingleExam />} />
        <Route
          path="/enrollments/:examId/your_results"
          element={<QuizResult />}
        />
        <Route path="/results" element={<ResultsList />} />
        <Route path="/me/results" element={<ResultsList />} />
        <Route path={`/me/results/${userId}`} element={<MyResults />} />
        <Route path="/monitor-live" element={<VideoStreaming />} />
      </Route>
    </Routes>
  );
};

export default Router;
