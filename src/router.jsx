import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";
import Playlist from "./pages/Playlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
  {
    path: "/playlist/:id",
    element: <Playlist />,
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
