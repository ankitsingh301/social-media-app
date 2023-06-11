import { createBrowserRouter } from "react-router-dom";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Profile from "Pages/Profile";
import UserProfile from "Pages/UserProfile";
import Protected from "./protected";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROFILE = "/profile";
export const USERPROFILE = "/user/:id";

export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: PROFILE,
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
  {
    path: USERPROFILE,
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
]);
