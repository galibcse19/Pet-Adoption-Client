import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
 

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/petListing',
            element:<PetListing></PetListing>
        },
        {
            path:'/donationCampaigns',
            element:<DonationCampaigns></DonationCampaigns>
        },
        {
            path:'/login',
            element:<LogIn></LogIn>
        },
        {
            path:'/register',
            element:<Register></Register>
        }
      ]
    },
    {
        path:'dashboard',
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
    }
  ]);
  