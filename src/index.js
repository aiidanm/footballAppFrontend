import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerAdminPage from "./components/Pages/PlayerAdminPage";
import HomePage from "./components/Pages/HomePage";
import StatsPage from "./components/Pages/StatsPage";
import RecordGame from "./components/RecordGame";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/Pages/playerList";
import RecentGames from "./components/Pages/RecentGames";
import GameStats from "./components/Pages/gameStats";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Players",
    element: <PlayerAdminPage />,
  },
  { path: "/RecordGame", element: <RecordGame /> },
  {
    path: "/add-player",
    element: <AddPlayer />,
  },
  {
    path: "/playerList",
    element: <PlayerList />,
  },
  {
    path: "/games",
    element: <RecentGames />,
  },
  {
    path: "/games/:gameid",
    element: <GameStats />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
