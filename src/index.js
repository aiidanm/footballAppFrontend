import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlayerAdminPage from './components/Pages/PlayerAdminPage';
import HomePage from './components/Pages/HomePage';
import StatsPage from './components/Pages/StatsPage';
import RecordGame from './components/RecordGame';
import AddPlayer from './components/AddPlayer';
import PlayerList from './components/Pages/playerList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/Players",
    element: <PlayerAdminPage />,
  },
  {
    path: "/Stats",
    element: <StatsPage/>
  },
  {path: "/RecordGame",
    element: <RecordGame/>
  },
  {
    path: "/add-player",
    element: <AddPlayer />,
  },
  {
    path:"/playerList",
    element: <PlayerList/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
