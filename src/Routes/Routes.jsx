import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Extra Components/Error";
import Home from "../Pages/Home pages/Home";
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
]);

export default router;