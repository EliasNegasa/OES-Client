import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CourseList from "./components/courses/CoursesList";
import UserList from "./components/users/UsersList";
import Layout from "./components/Layout";
import ExamsList from "./components/exams/ExamsList";
import QuestionsList from "./components/questions/QuestionsList";
import AnswersList from "./components/answers/AnswersList";
import ResultsList from "./components/results/ResultsList";
import Dashboard from "./components/dashboard.jsx/dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#2f45ff",
    },
    secondary: {
      main: "#303956",
    },
    grey: {
      main: "#f5f7fa",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#303840",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/exams" element={<ExamsList />} />
            <Route path="/questions" element={<QuestionsList />} />
            <Route path="/answers" element={<AnswersList />} />
            <Route path="/results" element={<ResultsList />} />
          </Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
