import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Extra Components/Error";
import Home from "../Pages/Home pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication Pages/Login";
import Register from "../Pages/Authentication Pages/Register";
import PrivateRoute from "../Providers/Private";
import Profile from "../Pages/Authentication Pages/Profile";
import Dashboard from "../Layouts/Dashboard";
import AddArticles from "../Pages/Home pages/AddArticles";
import Subscription from "../Pages/Home pages/Subscription";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DashboardHome from "../Pages/Dashboard Pages/DashboardHome";
import AllUsers from "../Pages/Dashboard Pages/AllUsers";
import AllArticles from "../Pages/Dashboard Pages/AllArticles";
import AddPublisher from "../Pages/Dashboard Pages/AddPublisher";
import AdminRoute from "../Providers/AdminRoute";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/profile",
        Component: () => (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-article",
        Component: () => (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Elements stripe={stripePromise}>
            <Subscription />
          </Elements>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
  path: "/dashboard",
  Component: () => (
    <PrivateRoute>
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    </PrivateRoute>
  ),
  children: [
    { index: true, Component: DashboardHome }, // charts
    { path: "users", Component: AllUsers },
    { path: "articles", Component: AllArticles },
    { path: "publishers", Component: AddPublisher },
  ],
}
]);

export default router;
