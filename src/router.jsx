import { createBrowserRouter } from "react-router-dom";
import Artist from "./pages/Artist";
import Fyp from "./pages/Fyp";
import Playlist from "./pages/Playlist";
import Charts from "./pages/Charts"
import Chart from "./pages/Chart"
import Logout from "./pages/Logout";
import User from "./pages/User";
import Player from "./pages/Player";
import SpotifyAuth from "./pages/SpotifyLogin";
import Test from "./pages/Test";
import Likedsongs from "./pages/Likedsongs";
import Likedplaylists from "./pages/Likedplaylists";
import Likedalbums from "./pages/Likedalbums";
import Likedpodcasts from "./pages/Likedpodcasts";
import SearchSongs from "./components/SearchSongs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Demo from "./pages/Demo";
import Album from "./pages/Album";
import Myplaylists from "./pages/Myplaylists";
import Subscription from "./pages/Subscription";
import UploadTrack from "./pages/Upload";
import PodcastPlayer from "./pages/PodcastPlayer";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
  {
    path:"/home",
    element:<HomePage />
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
    path: "/likedsongs",
    element: <Likedsongs />,
  },
  {
    path: "/likedplaylists",
    element: <Likedplaylists />,
  },
  {
    path: "/likedalbums",
    element: <Likedalbums />,
  },
  {
    path: "/likedpodcasts",
    element: <Likedpodcasts />,
  },
  {
    path: "/search",
    element: <SearchSongs />,
  },
  // {
  //   path: "/spotify_auth",
  //   element: <SpotifyAuth />,
  // },
  {
    path: "/player/:id",
    element: <Player />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path : "/demo",
    element : <Demo />,
  },
  {
    path : "/album/:id",
    element : <Album />,
  },
  {
    path : "/user",
    element : <User />,
  },
  {
    path : "/subscribe",
    element : <Subscription />,
  },
  {
    path: "/myplaylists",
    element: <Myplaylists/>
  },
  {
    path: "/upload",
    element: <UploadTrack />
  },,
  {
    path: "/podcastplayer/:id",
    element: <PodcastPlayer />,
  },
]);
