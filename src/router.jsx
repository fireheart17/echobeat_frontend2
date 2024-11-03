import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
]);