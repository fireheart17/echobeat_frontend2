import { createBrowserRouter } from "react-router-dom";
import Artist from "./pages/Artist";
import Fyp from "./pages/Fyp";
import Playlist from "./pages/Playlist";
import Charts from "./pages/Charts"
import Chart from "./pages/Chart"
import Logout from "./pages/Logout";
import Likedsongs from "./pages/Likedsongs";

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
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/likedsongs/userId/:userId",
    element: <Likedsongs />,
  },
  {
    path: "/artist/:artistId",
    element: <Artist />,
  },
]);
