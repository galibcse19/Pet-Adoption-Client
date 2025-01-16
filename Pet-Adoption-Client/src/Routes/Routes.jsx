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
import AddAPet from "../UserDashboard/AddAPet";
import Myaddedpets from "../UserDashboard/Myaddedpets";
import AdoptionRequest from "../UserDashboard/AdoptionRequest";
import CreateDonationCampaign from "../UserDashboard/CreateDonationCampaign";
import MyDonationCampaigns from "../UserDashboard/MyDonationCampaigns";
import MyDonations from "../UserDashboard/MyDonations";
import PetDetails from "../Pages/PetListing/PetDetails";
import ErrorPage from "../ErrorPage/ErrorPage";
import DonateCampaignDetails from "../Pages/DonationCampaigns/DonateCampaignDetails";
import UpdateAPet from "../UserDashboard/UpdateAPet";
import UpdateCampaign from "../UserDashboard/UpdateCampaign";
 

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
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
          path:'/petDetails/:id',
          element:<PrivateRoutes><PetDetails></PetDetails></PrivateRoutes>
        },
        {
            path:'/donationCampaigns',
            element:<DonationCampaigns></DonationCampaigns>
        },
        {
          path:'/donateCampaignDetails/:id',
          element:<PrivateRoutes><DonateCampaignDetails></DonateCampaignDetails></PrivateRoutes>
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
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
          {
            path:'addAPet',
            element:<AddAPet></AddAPet>
          },
          {
            path:'myAddedPets',
            element:<Myaddedpets></Myaddedpets>
          },
          {
            path:'myAddedPets/updateAPet/:id',
            element:<UpdateAPet></UpdateAPet>
          },
          {
            path:'adoptionRequest',
            element:<AdoptionRequest></AdoptionRequest>
          },
          {
            path:'createDonationCampaign',
            element:<CreateDonationCampaign></CreateDonationCampaign>
          },
          {
            path:'MyDonationCamaigns',
            element:<MyDonationCampaigns></MyDonationCampaigns>
          },
          {
            path:'MyDonationCamaigns/updateCampaign/:id',
            element:<UpdateCampaign></UpdateCampaign>
          },
          {
            path:'myDonations',
            element:<MyDonations></MyDonations>
          }
        ]
    }
  ]);
  