import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import App from "./App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthProvider from "./Provider/AuthProvider";
import Courses from "./Pages/Courses";
import CourseUpload from "./Pages/CourseUpload";
import MyCourses from "./Pages/MyCourses";
import MyEnrolled from "./Pages/MyEnrolled";
import AssignmentQuestionUpload from "./Pages/AssignmentQuestionUpload";
import AssignmentQuestions from "./Pages/AssignmentQuestions";
import PrivateRouter from "./Router/PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/courses",
        element: <Courses/>
      },
      {
        path: "/courses-upload",
        element: <PrivateRouter><CourseUpload/></PrivateRouter>
      },
      {
        path: "/myCourses",
        element: <PrivateRouter><MyCourses/></PrivateRouter>
      },
      {
        path: "/myEnrolled",
        element: <PrivateRouter><MyEnrolled/></PrivateRouter>
      },
      {
        path: "/assignment",
        element: <PrivateRouter><AssignmentQuestionUpload/></PrivateRouter>
      },
      {
        path: "/assignment-question",
        element: <AssignmentQuestions/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);