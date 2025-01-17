import React, { useContext, useEffect, useState } from 'react';
import DynamicTitle from '../Shared/DynamicTitle';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyDonationCampaigns = () => {
    const { user } = useContext(AuthContext); // Authenticated user context
    const [myCampaign, setMyCampaign] = useState([]); // User's campaigns
    const [selectedDonators, setSelectedDonators] = useState([]); // Donators for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [totalDonation, setTotalDonation] = useState(0);
    const navigate = useNavigate();

    // console.log(totalDonation)

    // Fetch campaigns for the logged-in user
    useEffect(() => {
        fetch('https://pet-adoption-server-jade.vercel.app/donationCampaign')
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.filter((campaign) => campaign.email === user.email);
                setMyCampaign(filteredData);
            });
    }, [user.email]);

    // Handle viewing donators for a specific campaign
    const handleViewDonators = (campaignId) => {
        fetch('https://pet-adoption-server-jade.vercel.app/donateData')
            .then((res) => res.json())
            .then((data) => {
                const filteredDonators = data.filter((donator) => donator.donatePetID === campaignId);
                const total = filteredDonators.reduce((sum, donation) => sum + Number(donation.donateAmount), 0);
                setTotalDonation(total);
                setSelectedDonators(filteredDonators);
                setIsModalOpen(true);
            });
    };

    // Handle pause/unpause functionality
    const handlePause = (id, status) => {
        toast.success('Pause This Campaign.', { position: 'top-center' });
        fetch(`https://pet-adoption-server-jade.vercel.app/donationCampaign/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paused: !status }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    // toast.success('Pause This Campaign.', { position: 'top-center' });
                    setMyCampaign((prev) =>
                        prev.map((campaign) =>
                            campaign._id === id ? { ...campaign, paused: !status } : campaign
                        )
                    );
                }
            });
    };

    // Close the donators modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDonators([]);
    };
    const handleUpdate =(campaign)=>{
        // console.log(campaign);
        navigate(`/dashboard/MyDonationCamaigns/updateCampaign/${campaign._id}`, { state: { campaign } });
    }

    return (
        <div className="my-10">
            <DynamicTitle heading="My Donation Campaigns" />

            {/* Campaign Table */}
            <div className="overflow-x-auto mx-10 mt-6">
                <table className="table-auto w-full border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Pet Name</th>
                            <th className="px-4 py-2">Max Donation Amount</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCampaign.map((campaign) => (
                            <tr key={campaign._id} className="border-t">
                                <td className="px-4 py-2">{campaign.name}</td>
                                <td className="px-4 py-2">${campaign.maximumDonationAmount}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handlePause(campaign._id, campaign.paused)}
                                        className={`px-4 py-2 rounded text-white ${
                                            campaign.paused ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                    >
                                        {campaign.paused ? 'Unpause' : 'Pause'}
                                    </button>
                                    <button
                                        onClick={() =>handleUpdate(campaign)
                                        }
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleViewDonators(campaign._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                    >
                                        View Donators
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Donators Modal */}
            {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-4">Donators List</h2>
                                <h2>Total Donation: <span className='font-bold'>${totalDonation}</span></h2>
                                <button
                                    onClick={closeModal}
                                    className="font-bold text-red-500 hover:text-black"
                                >
                                    Close
                                </button>
                            </div>
                            {selectedDonators.length === 0 ? (
                                <p className="text-center text-gray-500">No donations for this campaign.</p>
                            ) : (
                                <ul>
                                    {selectedDonators.map((donator, index) => (
                                        <li key={index} className="py-2 border-b">
                                            {donator.donerName} - ${donator.donateAmount}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

        </div>
    );
};

export default MyDonationCampaigns;
