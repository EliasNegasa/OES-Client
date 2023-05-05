import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNotifications } from "react-notifications-component";
import Router from "./components/routes/router";
import { getUsers } from "./services/user";
import auth from "./services/auth";
import LoginForm from "./components/login/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <ReactNotifications />
          {!user && (
            <Routes>
              <Route path="*" element={<Navigate to="auth/signin" replace />} />
              <Route exact path="auth/signin" element={<LoginForm />} />
            </Routes>
          )}

          {user && (
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
                  {console.log("ROUTER")}

                  <Router />
                </>
              )}
            </>
          )}
        </>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom right" />
    </QueryClientProvider>
  );
}

export default App;
