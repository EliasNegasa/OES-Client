import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginForm from "./components/login/LoginForm";
import { ReactNotifications } from "react-notifications-component";
import Router from "./components/routes/router";
import { getUsers } from "./services/user";
import auth from "./services/auth";

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
  const [user, setUser] = useState();
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      if (Date.now() >= user.exp * 1000) {
        console.log("EXPIRED");
        setExpired({ expired: true });
        localStorage.removeItem("token");
      }
      setUser(user);
    }
    // async function fetchUser() {
    //   const { data } = await getUsers();
    //   setUser(data);
    // }
    // fetchUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {console.log("uusrs", user)}
        <ReactNotifications />
        {!user && (
          <Routes>
            <Route path="*" element={<Navigate to="auth/signin" replace />} />
            <Route exact path="auth/signin" element={<LoginForm />} />
          </Routes>
        )}

        {user && (
          <>
            {console.log("USERR", user)}
            {expired ? (
              <>
                {console.log("EXP", expired)}
                <Routes>
                  <Route
                    path="*"
                    element={<Navigate to="auth/login" replace />}
                  />
                  <Route exact path="auth/signin" element={<LoginForm />} />
                </Routes>
              </>
            ) : (
              <>
                {console.log("ROUTER")}

                <Router />
              </>
            )}
          </>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
