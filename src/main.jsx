import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import ExplorePlans from './pages/plan-explore/ExplorePlans.jsx'
import UserPlans from './pages/plan-user/UserPlans.jsx'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "exploreplans",
        element: <ExplorePlans />,
      },
      {
        path: "myplans",
        element: <UserPlans />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
