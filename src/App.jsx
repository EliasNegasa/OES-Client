import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CourseList from "./components/courses/CoursesList";
import UserList from "./components/users/UsersList";
import Layout from "./components/Layout";

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
            {/* <Route index element={<Dashboard />} /> */}
            <Route path="/courses" element={<CourseList />} />
            <Route path="/users" element={<UserList />} />
          </Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
