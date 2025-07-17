import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Extra Components/Error";
import Home from "../Pages/Home pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from '../Pages/Authentication Pages/Login';
import Register from "../Pages/Authentication Pages/Register";
import PrivateRoute from "../Providers/Private";
import Profile from "../Pages/Authentication Pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/profile",
        Component: () => (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);

export default router;