import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerAdminPage from "./components/Pages/Players/PlayerAdminPage";
import HomePage from "./components/Pages/HomePage";
import StatsPage from "./components/Pages/StatsPage";
import RecordGame from "./components/Pages/RecordGame/RecordGame";
import AddPlayer from "./components/Pages/Players/AddPlayer";
import PlayerList from "./components/Pages/Players/playerList";
import RecentGames from "./components/Pages/Recent Games/RecentGames";
import GameStats from "./components/Pages/Recent Games/gameStats";
import Login from "./components/Pages/Accounts/Login";
import PlayerStats from "./components/Pages/Players/PlayerInfo";
import BulkEntry from "./components/Pages/bulkEntry";
import Signup from "./components/Pages/Accounts/signup";
import Landing from "./components/Pages/Accounts/login-signup";
import JoinLeague from "./components/Pages/Accounts/joinLeague";
import { UserProvider } from "./contexts/userContext";
import { RoleRoute } from "./components/roleWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Players",
    element: <PlayerAdminPage />,
  },
  { path: "/RecordGame", element: <RoleRoute requiredRole="admin"><RecordGame /></RoleRoute>},
  {
    path: "/add-player",
    element: <RoleRoute requiredRole="admin"><AddPlayer/></RoleRoute>,
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
    element: <GameStats />,
  },
  {
    path: "/players/:playerid",
    element: <PlayerStats />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/bulkEntry",
    element: <BulkEntry />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/joinLeague",
    element: <JoinLeague />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
