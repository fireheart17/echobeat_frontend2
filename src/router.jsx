import { createBrowserRouter } from "react-router-dom";
import Artist from "./pages/Artist";
import Fyp from "./pages/Fyp";
import Playlist from "./pages/Playlist";
import Charts from "./pages/Charts"
import Chart from "./pages/Chart"
import Logout from "./pages/Logout";
import Likedsongs from "./pages/Likedsongs";
import User from "./pages/User";
import Player from "./pages/Player";
import SpotifyAuth from "./pages/SpotifyLogin";
import Test from "./pages/Test";
import Likedplaylists from "./pages/Likedplaylists";
import Likedalbums from "./pages/Likedalbums";
import Likedpodcasts from "./pages/Likedpodcasts";
import SearchSongs from "./components/SearchSongs";

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
    path: "/artist/:artistId",
    element: <Artist />,
  },
  {
    path: "/test/:userId",
    element: <Test />,
  },
  {
    path: "/user/:id",
    element: <User />,
  },
  {
    path: "/likedsongs/userId/:userId",
    element: <Likedsongs />,
  },
  {
    path: "/likedplaylists/userId/:userId",
    element: <Likedplaylists />,
  },
  {
    path: "/likedalbums/userId/:userId",
    element: <Likedalbums />,
  },
  {
    path: "/likedpodcasts/userId/:userId",
    element: <Likedpodcasts />,
  },
  {
    path: "/search",
    element: <SearchSongs />,
  }
  // {
  //   path: "/spotify_auth",
  //   element: <SpotifyAuth />,
  // },
  {
    path: "/player/:id",
    element: <Player />,
  },
]);
