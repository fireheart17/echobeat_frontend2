import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";
import Likedsongs from "./pages/Likedsongs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
  {
    path: "/likedsongs/userId/:userId",
    element: <Likedsongs />,
  },
]);
