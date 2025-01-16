import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DynamicTitle from '../../Shared/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';

const PetDetails = () => {
    const location = useLocation();
    const { data } = location.state; // Extract data from location state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const {user} = useContext(AuthContext);
    const {error, setError} = useState('');
    //  console.log(data)
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const adoptID = data._id;
        const name = data.name;
        const image = data.imageUrl;
        const adptionUserName = user?.displayName;
        const adptionUserEmail = user?.email;
        const adptionUserNumber =form.number.value;
        const adptionUserAddress =form.address.value;
        const adoptData= {adoptID,name,image,adptionUserName,adptionUserEmail,adptionUserNumber,adptionUserAddress};
        // console.log(adoptData)
        fetch('http://localhost:5000/adoptRequest',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(adoptData)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                toast.success('Adopt data submited sucessfully',{position: "top-center"});
            }
        })
        // .catch(error => console.log(error.message));
        .catch(error =>{
            setError(error.message)
        });
        setIsModalOpen(false); // Close modal after submission
    };

    return (
        <div className="container mx-auto p-5">
            <DynamicTitle heading={`Details of ${data.name}`} />
            <div className="lg:mx-32 my-10">
                <div className="bg-white p-5 rounded-lg shadow-md grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                    <div>
                        <img className="w-2/3 object-cover rounded-lg" src={data.imageUrl} alt={data.name} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mt-5">Name of Pet: {data.name}</h1>
                        <p className="mt-2"><strong>Age:</strong> {data.age} year(s)</p>
                        <p className="mt-2"><strong>Location:</strong> {data.location}</p>
                        <p className="mt-2"><strong>Category:</strong> {data.category}</p>
                        <p className="mt-2"><strong>Description:</strong> {data.longDescribption || "No description available"}</p>
                        <p className="mt-2"><strong>Date:</strong> {data.date}</p>
                        <button
                            className="w-1/2 font-bold lg:p-4 md:p-4 p-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition duration-200 mt-4"
                            onClick={() => setIsModalOpen(true)} // Open modal
                        >
                            Adopt
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-2">Adoption Form:</h2>
                        <h1 className="text-xl font-bold mb-2">Name of Pet: {data.name}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="name">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                     value={user?.displayName} disabled
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="email">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user?.email} disabled
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="email">
                                    Your Phone Number
                                </label>
                                <input
                                    type="number"
                                    id="email"
                                    name="number"
                                    placeholder='Enter your phone number'
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="email">
                                    Your Address
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="address"
                                    placeholder='Enter your address'
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                             
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                                    onClick={() => setIsModalOpen(false)} // Close modal
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;
