import { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNotifications } from "react-notifications-component";
import Router from "./components/routes/router";
import { getUser, getUsers } from "./services/user";
import auth, { getCurrentUser } from "./services/auth";
import LoginForm from "./components/login/LoginForm";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

export const CurrentUserContext = createContext(null);

function App() {
  const [user, setUser] = useState();
  const [expired, setExpired] = useState(false);

  const {
    isLoading,
    data: currentUser,
    isError,
    error,
  } = useQuery(["current-user", user?.id], () => getUser(user?.id));

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      console.log("CURRENT USER", user);
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
    <>
      <ThemeProvider theme={theme}>
        <>
          {!currentUser && (
            <Routes>
              <Route path="*" element={<Navigate to="auth/signin" replace />} />
              <Route exact path="auth/signin" element={<LoginForm />} />
            </Routes>
          )}
          {currentUser && (
            <>
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
                  {console.log("ROUTER", currentUser)}
                  <CurrentUserContext.Provider value={currentUser?.data}>
                    <Router />
                  </CurrentUserContext.Provider>
                </>
              )}
            </>
          )}
        </>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom right" />
    </>
  );
}

export default App;
