import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTitle from '../../Shared/DynamicTitle';

const DonationCampaigns = () => {
    const [donationCampaignData, setDonationCampaignData] = useState([]); // Full data
    const [displayedData, setDisplayedData] = useState([]); // Data currently displayed
    const [page, setPage] = useState(1); // Pagination page
    const [loading, setLoading] = useState(true); // Loading state
    const [fetchingMore, setFetchingMore] = useState(false); // For loading more data
    const navigate = useNavigate(); // useNavigate hook for navigation

    // Fetch donation campaigns
    useEffect(() => {
        fetch('https://pet-adoption-server-jade.vercel.app/donationCampaign')
            .then((res) => res.json())
            .then((data) => {
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setDonationCampaignData(sortedData);
                setDisplayedData(sortedData.slice(0, 6)); // Show initial 6 items
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching donation campaigns:', err);
                setLoading(false);
            });
    }, []);

    // Infinite scrolling logic
    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !fetchingMore
        ) {
            setFetchingMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update displayed campaigns when page changes
    useEffect(() => {
        if (page > 1) {
            const startIndex = (page - 1) * 6;
            const endIndex = page * 6;
            setDisplayedData((prevData) => [
                ...prevData,
                ...donationCampaignData.slice(startIndex, endIndex),
            ]);
            setFetchingMore(false);
        }
    }, [page, donationCampaignData]);

    // Navigate to details page
    const handleDetails = (data) => {
        navigate(`/donateCampaignDetails/${data._id}`, { state: { data } });
    };

    return (
        <div>
            <DynamicTitle heading={'Donation Campaigns'} />
            
            {/* Loading Spinner */}
            {loading && (
                <div className="w-8 h-8 border-4 border-red-500 border-dashed rounded-full animate-spin mx-auto my-10"></div>
            )}

            {/* Donation Campaign List */}
            {!loading && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:mx-32 md:mx-10 mx-4 my-10">
                    {displayedData.length > 0 ? (
                        displayedData.map((data, index) => (
                            <div key={index} className="bg-slate-200 p-4 rounded-lg shadow-lg">
                                <img
                                    className="w-full h-48 border rounded-lg object-cover"
                                    src={data.imageUrl}
                                    alt="Donation Campaign"
                                />
                                <h2 className="my-2 font-bold text-2xl">Name: {data.name}</h2>
                                <p>
                                    Maximum Donation Amount:{' '}
                                    <span className="font-bold">{data.maximumDonationAmount}</span> Tk
                                </p>
                                <p>
                                    Description:{' '}
                                    <span className="font-bold">{data.shortDescribption}</span>
                                </p>
                                <button
                                    onClick={() => handleDetails(data)}
                                    className="w-full font-bold p-3 mt-3 text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center font-bold text-xl text-gray-600">
                            No Donation Campaign available
                        </div>
                    )}
                </div>
            )}

            {/* Infinite Scroll Loading */}
            {fetchingMore && (
                <div className="flex justify-center items-center my-10">
                    <div className="w-8 h-8 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default DonationCampaigns;
