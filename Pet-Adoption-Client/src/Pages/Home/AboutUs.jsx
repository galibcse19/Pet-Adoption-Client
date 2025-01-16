import React, { useEffect } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { Link } from 'react-router-dom';
import image from '../../assets/puppy-kitten-heart.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(() => {
                AOS.init({
                  duration: 1000, 
                  once: true, 
                });
              }, []);
    return (
        <div className='my-10'>
            <DynamicTitle heading={'About Us'}> </DynamicTitle>
             
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center bg-gray-100 py-10 px-4 lg:px-20 md:mx-10 gap-10 my-6 lg:mx-32 rounded-lg">
                <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        About Us
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                        Welcome to our pet adoption platform, where compassion meets purpose. Our mission is simple: to connect loving families with pets in need of a forever home. 
                        <br /><br />
                        Our website streamlines the adoption process, allowing you to explore pets by category, learn about their stories, and find your perfect companion. 
                        Whether you're looking for a playful puppy or a cuddly kitten, we're here to make the journey of adoption easy and meaningful.
                    </p>
                    <Link to={'/'}><button className="bg-red-500 text-white px-6 py-3 rounded-md font-bold hover:bg-red-600 transition duration-200">
                        Learn More
                    </button></Link>
                </div>
                <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className=" ">
                    <img
                        src={image} 
                        alt="Happy pets and owners"
                        className="rounded-lg shadow-lg w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
           
    );
};

export default AboutUs;