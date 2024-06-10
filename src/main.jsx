import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/js/bootstrap.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPages from "./pages/MainPages.jsx";
import QuestionPages from "./pages/QuestionPages.jsx";
import ForumPages from "./pages/ForumPages.jsx";
import TopicPages from "./pages/TopicPages.jsx";
import RegisterPages from "./pages/RegisterPages.jsx";
import LoginPages from "./pages/LoginPages.jsx";
import SinglePostPages from "./pages/SinglePostPages.jsx";
import DashboardPages from "./pages/DashboardPages.jsx";
import UserProfilePages from "./pages/UserProfilePages.jsx";
import CreateQuestionPages from "./pages/CreateQuestionPages.jsx";
import AuthAdminPages from "./pages/AuthAdminPages.jsx";

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
    path: "/dashboard",
    element: <DashboardPages />,
  },
  {
    path: "/dashboard/create-question",
    element: <CreateQuestionPages />,
  },
  {
    path: "/dashboard/admin/create-topic",
    element: <AuthAdminPages />,
  },
  {
    path: "/question/:id",
    element: <SinglePostPages />,
  },
  {
    path: "/profile/:id",
    element: <UserProfilePages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
