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
import DashboardPages from "./pages/DashboardPages.jsx";
import UserProfilePages from "./pages/UserProfilePages.jsx";
import CreateQuestionPages from "./pages/CreateQuestionPages.jsx";
import AuthAdminPages from "./pages/AuthAdminPages.jsx";
import SinglePostQuestionPages from "./pages/SinglePostQuestionPages.jsx";
import SinglePostForumPages from "./pages/SinglePostForumPages.jsx";
import SinglePostTopicPages from "./pages/SinglePostTopicPages.jsx";
import EditQuestionPages from "./pages/EditQuestionPages.jsx";
import AuthCreateForumFormPages from "./pages/AuthCreateForumFormPages.jsx";
import AuthEditForumFormPages from "./pages/AuthEditForumFormPages.jsx";
import AuthCreateTopicFormPages from "./pages/AuthCreateTopicFormPages.jsx";
import AuthEditTopicFormPages from "./pages/AuthEditTopicFormPages.jsx";
import UserUpdateProfilePages from "./pages/UserUpdateProfilePages.jsx";

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
    path: "/question/:id",
    element: <SinglePostQuestionPages />,
  },
  {
    path: "/forum",
    element: <ForumPages />,
  },
  {
    path: "/forum/:id",
    element: <SinglePostForumPages />,
  },
  {
    path: "/topic",
    element: <TopicPages />,
  },
  {
    path: "/topic/:id",
    element: <SinglePostTopicPages />,
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
    path: "/dashboard/edit-question/:id",
    element: <EditQuestionPages />,
  },
  {
    path: "/dashboard/admin",
    element: <AuthAdminPages />,
  },
  {
    path: "/dashboard/admin/create-forum",
    element: <AuthCreateForumFormPages />,
  },
  {
    path: "/dashboard/admin/edit-forum/:id",
    element: <AuthEditForumFormPages />,
  },
  {
    path: "/dashboard/admin/create-topic",
    element: <AuthCreateTopicFormPages />,
  },
  {
    path: "/dashboard/admin/edit-topic/:id",
    element: <AuthEditTopicFormPages />,
  },
  {
    path: "/profile/:id",
    element: <UserProfilePages />,
  },
  {
    path: "/profile/:id/edit",
    element: <UserUpdateProfilePages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
