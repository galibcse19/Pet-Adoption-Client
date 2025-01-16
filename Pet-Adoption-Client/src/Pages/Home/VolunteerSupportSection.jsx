import React, { useState } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';

const VolunteerSupportSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, such as sending data to the server
        console.log("Form submitted:", { name, email, message });
    };
    return (
        <div className='my-10'>
            <DynamicTitle heading={'Volunteer & Support Us'}></DynamicTitle>
            <div className="bg-gray-100 py-12">
            <div className="lg:flex lg:justify-between lg:mx-32 md:mx-10 mx-4">
                {/* Left Column */}
                <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">How You Can Help</h3>
                    <p className="text-gray-700 mb-4 text-justify">
                        There are many ways you can make a difference in the lives of pets in need. Whether it's volunteering your time, donating items, or simply spreading the word, your support is invaluable to us!
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Volunteer at adoption events</li>
                        <li>Donate pet supplies or food</li>
                        <li>Share our mission with your friends and family</li>
                    </ul>
                    <p className="text-gray-700">We greatly appreciate any help you can provide!</p>
                </div>

                {/* Right Column */}
                <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-md mt-6 lg:mt-0">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Sign Up to Volunteer</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 mt-2 bg-gray-200 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-2 bg-gray-200 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700">Why do you want to help?</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 mt-2 bg-gray-200 rounded-md"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default VolunteerSupportSection;