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
import { UserProvider } from './contexts/UserContext.jsx'
import { ItineraryProvider } from './contexts/ItineraryContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><App /></UserProvider>,
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
        element: <CityDetails />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItineraryProvider>
      <RouterProvider router={router} />
    </ItineraryProvider>
  </React.StrictMode>,
)
