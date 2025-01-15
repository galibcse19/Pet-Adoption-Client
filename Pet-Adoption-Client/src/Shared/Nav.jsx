 import React, { useContext } from 'react';
 import {
   Navbar,
   MobileNav,
   Typography,
   Button,
   IconButton,
   Card,
 } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';
 
 const Nav = () => {
    const [openNav, setOpenNav] = React.useState(false);
    const {user,logOut} = useContext(AuthContext)

    const handleLogOut = () =>{
      logOut()
      .then(()=>{
        toast.warn('Successfully LogOut.',{position: "top-center"});
      })
      .catch(error =>console.log(error))
  }
 
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);
     
    const navList = (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <Link to={'/'}>Home</Link>
          <Link to={'/petListing'}>Pet Listing</Link>
          <Link to={'/donationCampaigns'}>Donation Campaigns</Link>
        {
          user ? <>
          <li>
         <div className="relative group">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  {user && user?.email ? (
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-700 font-bold">
                      ?
                    </div>
                  )}
                </div>
              {user && (
                <span className="absolute lg:left-100 lg:-right-10  top-12 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <Link to={'/dashboard'}> <p className='text-xl p-2'>Dashboard</p> </Link>
                   <button onClick={handleLogOut} className='btn btn-ghost p-2 font-bold'>LOGOUT</button>
                </span>
              )}
          </div>
         </li>
          </> : <>
          <Link to={'/login'}>Log In</Link>
          <Link to={'/register'}>Register</Link>
          </>
        }
         
      </ul>
    );
    return (
      <div className="">
      <Navbar className="sticky top-0 z-10  rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-black text-white">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer lg:text-3xl md:text-2xl text-xl py-1.5 font-bold"
          >
            PET<span className='text-red-600'>ADOPTION</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
             
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
        </MobileNav>
      </Navbar>
       
    </div>
    );
 };
 
 export default Nav;