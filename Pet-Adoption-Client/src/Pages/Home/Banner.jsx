import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, 
          once: true, 
        });
      }, []);
    return (
        <div
            className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center"
            style={{
                // backgroundImage: `url('https://i.ibb.co.com/XYhzJfB/1.png')`,  
                backgroundImage: `url('https://i.ibb.co.com/SJ1fBCp/3.png')`,  
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div> 
            <div data-aos="fade-up" className="z-10 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    Welcome to the Pet Adoption Platform
                </h1>
                <p className="my-4 text-xl md:text-2xl lg:text-3xl font-light">
                    Find your perfect furry friend today!
                </p>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-1/6 rounded-full p-4'>See More</button></Link>
            </div>
        </div>
    );
};

export default Banner;
