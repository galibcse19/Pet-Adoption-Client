import React, { useEffect } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const PetCareTips = () => {
    useEffect(() => {
                    AOS.init({
                      duration: 1000, 
                      once: true, 
                    });
                  }, []);
    const tips = [
        {
          id: 1,
          title: "Top 5 Tips for New Pet Owners",
          description: "Learn essential tips to make your pet feel at home and keep them happy.",
          imageUrl: "https://i.ibb.co.com/Lzntw3H/tips1.jpg",
        },
        {
          id: 2,
          title: "How to Keep Your Pets Healthy",
          description: "Discover simple ways to maintain your pet's health and well-being.",
          imageUrl: "https://i.ibb.co.com/jMgJybc/tip2.webp",
        },
        {
          id: 3,
          title: "Training Your Pet Made Easy",
          description: "Explore effective techniques to train your pet and build a strong bond.",
          imageUrl: "https://i.ibb.co.com/QKZTmvk/tip3.webp",
        },
      ];
    return (
        <div className='my-10'>
            <DynamicTitle heading={'Pet Care Tips & Advice'}></DynamicTitle>
            <div className="bg-gray-100 py-10">
      <div  data-aos="zoom-in" className="grid lg:grid-cols-3  grid-cols-1 gap-6 lg:mx-32 md:mx-10 mx-4">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={tip.imageUrl}
              alt={tip.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-2">{tip.description}</p>
              <Link to={'/donationCampaigns'}><button className="mt-4 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 transition duration-200">
                Read More
              </button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default PetCareTips;