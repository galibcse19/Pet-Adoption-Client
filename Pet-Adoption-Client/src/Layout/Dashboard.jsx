import React, { useState } from 'react';
import { useContext } from 'react';
import { IoBagAdd, IoCreate, IoHome } from 'react-icons/io5';
import { MdCampaign, MdDashboard } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import Lottie from 'lottie-react';
import dashboardImg from '../assets/dashboard.json'
import { FaBandcamp, FaListCheck, FaUsers } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';
import { SiMercadopago } from 'react-icons/si';
import { FaDonate } from 'react-icons/fa';

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [showOutlet, setShowOutlet] = useState(false);
    return (
        <div>
            <div className='flex items-center px-6 py-4 bg-black text-white'>
                <span className='mr-2 text-2xl'><MdDashboard /></span>
                <h2 className='text-2xl'>Dashboard</h2>
            </div>
            <div className='grid grid-cols-5'>
                <div className='bg-gray-800 text-white min-h-screen'>
                    <div className='px-6 py-4'>
                         
                         <div className='flex items-center my-4'>
                            <span className='mr-2'><FaUsers /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/users'}>All User</Link>
                            </div>



                           <div className='flex items-center my-4'>
                            <span className='mr-2'><IoIosAddCircle /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/addAPet'}>Add A Pet</Link>
                            </div>
                            <div className='flex items-center'>
                                <span className='mr-2'><IoBagAdd /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/myAddedPets'}>My Added Pets</Link>
                            </div>
                            <div className='flex items-center my-4'>
                                <span className='mr-2'><SiMercadopago /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/adoptionRequest'}>Adoption Request</Link>
                            </div>
                            <div className='flex items-center'>
                                <span className='mr-2'><IoCreate /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/createDonationCampaign'}>Create Donation Campaign </Link>
                            </div>
                            <div className='flex items-center my-4'>
                                <span className='mr-2'><FaBandcamp /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/MyDonationCamaigns'}>My Donation Campaigns </Link>
                            </div>
                            <div className='flex items-center mb-4'>
                                <span className='mr-2'><FaDonate /></span>
                                <Link onClick={() => setShowOutlet(true)} to={'/dashboard/myDonations'}>My Donations</Link>
                            </div>
                    </div>
                <hr />
                <div className='px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='mr-2'><IoHome /></span>
                            <Link to={'/'}>Home</Link>
                        </div>
                        <div className='flex items-center my-4'>
                            <span className='mr-2'><FaListCheck /></span>
                            <Link to={'/petListing'}>Pet Listing</Link>
                        </div>
                        <div className='flex items-center'>
                            <span className='mr-2'><MdCampaign /></span>
                            <Link to={'/donationCampaigns'}>Donation Campaigns</Link>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-50 text-black'>
                    <div className="container mx-auto p-4">
                        {!showOutlet ? (
                            <div className="text-center">
                             <h1 className="text-3xl font-bold">Welcome to Dashboard: {user.displayName}</h1>
                             <div className='w-1/3 mx-auto mt-20'>
                                <Lottie animationData={dashboardImg}></Lottie>
                             </div>
                            </div>
                        ) : (
                            <div className="col-span-4">
                            <Outlet />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;