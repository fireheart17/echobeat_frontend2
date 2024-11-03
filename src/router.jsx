import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";
import Charts from "./pages/Charts"
import Chart from "./pages/Chart"
import Logout from "./pages/Logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
  {
    path: "/charts",
    element: <Charts />,
  },
  {
    path: "/chart/:id",
    element: <Chart />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);