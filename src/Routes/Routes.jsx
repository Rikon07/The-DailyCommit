import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Extra Components/Error";
import Home from "../Pages/Home pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication Pages/Login";
import Register from "../Pages/Authentication Pages/Register";
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
    ],
    
  },
  {
    path: '/auth',
    Component: AuthLayout,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        Component: <Login />
      },
      {
        path: 'register',
        Component: <Register />
      }
    ]
  }
]);

export default router;