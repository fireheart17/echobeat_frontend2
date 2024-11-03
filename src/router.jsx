import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";
import Charts from "./pages/Charts"
import Chart from "./pages/Chart"

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
  }
]);