import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DynamicTitle from '../../Shared/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';

const DonateCampaignDetails = () => {
    const location = useLocation();
    const { data } = location.state; // Extract data from state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [threeData, setThreeData] = useState([]);
    const [closestDateCampaign, setClosestDateCampaign] = useState(null);

    // Function to fetch donation campaigns
    const fetchDonationCampaigns = () => {
        fetch('https://pet-adoption-server-jade.vercel.app/donationCampaign')
            .then((res) => res.json())
            .then((data) => {
                // Sort by lastDateOfDonation in ascending order
                const sortedData = data.sort((a, b) => new Date(a.lastDateOfDonation) - new Date(b.lastDateOfDonation));
                const limitedData = sortedData.slice(0, 3); // Select the first three items
                setThreeData(limitedData);

                // Find the closest campaign
                const today = new Date();
                const closestCampaign = sortedData.find(
                    (campaign) => new Date(campaign.lastDateOfDonation) >= today
                );
                setClosestDateCampaign(closestCampaign || null);
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchDonationCampaigns();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const donatePetName = data.name;
        const donatePetID = data._id;
        const donatePetImage = data.imageUrl;
        const donerName = user.displayName;
        const donerEmail = user.email;
        const donateAmount = form.donateAmount.value;
        const donateData = { donatePetID, donerName, donerEmail, donateAmount,donatePetImage,donatePetName };

        fetch('https://pet-adoption-server-jade.vercel.app/donateData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donateData),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.insertedId) {
                    toast.success(`Donated ${donateAmount} Tk successfully!`, { position: "top-center" });
                    fetchDonationCampaigns(); // Reload campaigns
                }
            })
            .catch((error) => {
                setError(error.message);
            });

        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-5">
            <DynamicTitle heading={`Donation Campaign Details of ${data.name}`} />
            <div className="lg:mx-32 my-10">
                <div className="bg-white p-5 rounded-lg shadow-md grid lg:grid-cols-2 grid-cols-1">
                    <div>
                        <img
                            className="w-2/3 object-cover rounded-lg"
                            src={data.imageUrl}
                            alt={data.name}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold my-4">Name: {data.name}</h2>
                        <p className="mt-2">
                            <strong>Maximum Donation Amount:</strong> {data.maximumDonationAmount} Tk
                        </p>
                        <p className="mt-2">
                            <strong>Description:</strong> {data.longDescribption || 'No description available'}
                        </p>
                        <p className="mt-2">
                            <strong>Date:</strong> {data.date}
                        </p>
                        <p className="mt-2">
                            <strong>Last Date of Donation:</strong> {data.lastDateOfDonation}
                        </p>
                        <button
                            className="w-1/2 font-bold lg:p-4 md:p-4 p-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition duration-200 mt-4"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10">
                    {threeData.map((campaign) => (
                        <div key={campaign._id} className="bg-white p-4 shadow-md rounded-lg">
                            <img
                                src={campaign.imageUrl}
                                alt={campaign.name}
                                className=" object-cover rounded-md mb-2 "
                            />
                            <h3 className="text-xl font-bold">{campaign.name}</h3>
                            <p className="text-gray-600">Maximum Donation: {campaign.maximumDonationAmount} Tk</p>
                            <p className="text-gray-600">Ends on: {campaign.lastDateOfDonation}</p>
                        </div>
                    ))}
                </div>
                {closestDateCampaign && (
                <div className="mt-6 bg-blue-100 p-4 rounded-md">
                    <h3 className="text-xl font-bold">Campaign Ending Soon</h3>
                    <p>Name: {closestDateCampaign.name}</p>
                    <p>Ends on: {closestDateCampaign.lastDateOfDonation}</p>
                </div>
            )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-2">Donation Form:</h2>
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
                                    value={user?.displayName}
                                    disabled
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
                                    value={user?.email}
                                    disabled
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="donateAmount">
                                    Donation Amount
                                </label>
                                <input
                                    type="number"
                                    id="donateAmount"
                                    name="donateAmount"
                                    placeholder="Enter donation amount"
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Donate
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

export default DonateCampaignDetails;
