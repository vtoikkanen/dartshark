import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import FrontPage from "./pages/FrontPage/FrontPage";
import CreateGame from "./pages/CreateGame/CreateGame";
import Game from "./pages/Game/Game";
import Recap from "./pages/Recap/Recap";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />
  },
  {
    path: '/frontpage',
    element: <FrontPage />
  },
  {
    path: '/start',
    element: <CreateGame />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/recap',
    element: <Recap />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
