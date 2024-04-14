import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ExplorePlans from './pages/plan-explore/ExplorePlans.jsx'
import UserPlans from './pages/plan-user/UserPlans.jsx'
import PlanDetails from './pages/plan-user/PlanDetails.jsx'
import CityDetails from './pages/place-explore/CityDetails.jsx'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Signup from './pages/login/Signup.jsx'
import Login from './pages/login/Login.jsx'
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
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "myplans",
        element: <UserPlans />,
      },
      {
        path: "myplans/:planid",
        element: <PlanDetails />,
      },
      {
        path: "explorecity/:cityid",
        element: <CityDetails />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
