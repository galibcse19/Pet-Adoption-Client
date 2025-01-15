import React from 'react';
import { useLocation } from 'react-router-dom';
import DynamicTitle from '../../Shared/DynamicTitle';

const PetDetails = () => {
    const location = useLocation();
    const { data } = location.state; // Extract data from location state

    return (
        <div className="container mx-auto p-5">
            <DynamicTitle heading={`Details of ${data.name}`} />
            <div className='lg:mx-32 my-10'>
            <div className="bg-white p-5 rounded-lg shadow-md grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                <div>
                 <img className="w-2/3 object-cover rounded-lg" src={data.imageUrl} alt={data.name}/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mt-5">Name of Pet: {data.name}</h1>
                    <p className="mt-2"><strong>Age:</strong> {data.age} year(s)</p>
                    <p className="mt-2"><strong>Location:</strong> {data.location}</p>
                    <p className="mt-2"><strong>Category:</strong> {data.category}</p>
                    <p className="mt-2"><strong>Description:</strong> {data.longDescribption || "No description available"}</p>
                    <p className="mt-2"><strong>Date:</strong> {data.date}</p>
                    <button className="w-1/2 font-bold lg:p-4 md:p-4 p-2 bg-black text-white rounded-md hover:bg-red-600 transition duration-200 mt-4 " > Adopt </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default PetDetails;
