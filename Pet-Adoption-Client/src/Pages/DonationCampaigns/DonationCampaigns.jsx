import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTitle from '../../Shared/DynamicTitle';

const DonationCampaigns = () => {
    const [donationCampaignData, setDonationCampaignData] = useState([]); // Full data
    const [displayedData, setDisplayedData] = useState([]); // Data currently displayed
    const [page, setPage] = useState(1); // Pagination page
    const navigate = useNavigate(); // useNavigate hook for navigation

    // Fetch donation campaigns
    useEffect(() => {
        fetch('http://localhost:5000/donationCampaign')
            .then((res) => res.json())
            .then((data) => {
                // Sort by date in descending order
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setDonationCampaignData(sortedData);
                setDisplayedData(sortedData.slice(0, 6)); // Initial display of 6 items
            })
            .catch((err) => console.error('Error fetching donation campaigns:', err));
    }, []);

    // Infinite scrolling
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update displayed campaigns when the page changes
    useEffect(() => {
        const startIndex = (page - 1) * 6;
        const endIndex = page * 6;
        setDisplayedData((prevData) => [
            ...prevData,
            ...donationCampaignData.slice(startIndex, endIndex),
        ]);
    }, [page, donationCampaignData]);

    // Navigate to details page
    const handleDetails = (data) => {
        navigate(`/donateCampaignDetails/${data._id}`, { state: { data } });
    };

    return (
        <div>
            <DynamicTitle heading={'Donation Campaigns'}></DynamicTitle>
            <div className="my-10">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:mx-32 md:mx-10 mx-4 my-10">
                    {displayedData && displayedData.length > 0 ? (
                        displayedData.map((data, index) => (
                            <div key={index}>
                                <div className="card bg-slate-200 lg:w-96 md:w-84 w-76 rounded-lg">
                                    <div className="p-4">
                                        <img
                                            className="w-full h-48 border rounded-lg"
                                            src={data.imageUrl}
                                            alt="Donation Campaign"
                                        />
                                        <h2 className="my-2 font-bold text-2xl">
                                            Name: {data.name}
                                        </h2>
                                        <p>
                                            Maximum Donation Amount:{' '}
                                            <span className="font-bold my-1">
                                                {data.maximumDonationAmount}
                                            </span>{' '}
                                            Tk
                                        </p>
                                        <p>
                                            Description:{' '}
                                            <span className="font-bold my-1">
                                                {data.shortDescribption}
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDetails(data)}
                                        className="w-full font-bold lg:p-4 md:p-4 p-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition duration-200"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center font-bold text-xl text-gray-600">
                            No Donation Campaign available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationCampaigns;
