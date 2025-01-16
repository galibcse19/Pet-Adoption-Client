import React, { useEffect } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { Link } from 'react-router-dom';
import PetAdoption from '../../assets/PetAdoption.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const CallToAction = () => {
    useEffect(() => {
            AOS.init({
              duration: 1000, 
              once: true, 
            });
          }, []);
    return (
        <div className='my-10'>
            <DynamicTitle heading={'Call To Action'}></DynamicTitle>
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center bg-gray-100 py-10 px-4 lg:px-20 md:mx-10 gap-10 my-6 lg:mx-32 rounded-lg">
            {/* Left Side: Image */}
            <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">
                <img
                    src={PetAdoption} // Replace with an inspirational pet image
                    alt="Adopt a Pet"
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                />
            </div>

            {/* Right Side: Text */}
            <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="flex flex-col justify-center text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Adopt a Pet and Change a Life
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-6 text-justify">
                By adopting a pet, you're not just saving a life; you're giving an animal a chance to be part of a loving family. Pets bring joy, companionship, and unconditional love, making your life more fulfilling while giving them a better future. Every adoption creates room in shelters for another animal in need, spreading the impact of kindness. 
                </p>
                <Link to={'/petListing'}><button className="px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-md hover:bg-red-700 transition duration-300">
                    Start Your Adoption Journey
                </button></Link>
            </div>
        </div>
        </div>
    );
};

export default CallToAction;