import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/js/bootstrap.js";
import { isAuthenticated } from "./utils/isAuthenticated.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPages from "./pages/MainPages.jsx";
import QuestionPages from "./pages/QuestionPages.jsx";
import ForumPages from "./pages/ForumPages.jsx";
import TopicPages from "./pages/TopicPages.jsx";
import RegisterPages from "./pages/RegisterPages.jsx";
import LoginPages from "./pages/LoginPages.jsx";
import SinglePostPages from "./pages/SinglePostPages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPages />,
  },
  {
    path: "/register",
    element: <RegisterPages />,
  },
  {
    path: "/login",
    element: <LoginPages />,
  },
  {
    path: "/question",
    element: <QuestionPages />,
  },
  {
    path: "/forum",
    element: <ForumPages />,
  },
  {
    path: "/topic",
    element: <TopicPages />,
  },
  {
    path: "/question/:id",
    element: <SinglePostPages />,
  },
]);

const App = () => {
  React.useEffect(() => {
    isAuthenticated();
  }, []);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
