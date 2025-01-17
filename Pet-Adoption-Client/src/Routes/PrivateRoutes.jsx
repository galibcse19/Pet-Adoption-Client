import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    if(user){
        return children;
    }
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
                <span className="loading loading-spinner text-info my-4"></span> 
                <div>
                <Link to={'/login'}>
                 <button
                    className="font-bold p-3 bg-green-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]"
                    >
                     Log in First
                </button>
                 </Link>
                </div>
            </div>
        );
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoutes;