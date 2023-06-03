import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// const CurrentUserContext = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {/* <CurrentUserContext.Provider> */}
      <App />
      {/* </CurrentUserContext.Provider> */}
    </QueryClientProvider>
  </BrowserRouter>
);
