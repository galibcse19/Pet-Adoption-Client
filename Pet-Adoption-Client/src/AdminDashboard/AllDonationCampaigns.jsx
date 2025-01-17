import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllDonationCampaigns = () => {
  const [donationCampaigns, setDonationCampaigns] = useState([]);
  const navigate = useNavigate();

  // Fetch all donation campaigns
  useEffect(() => {
    fetch('http://localhost:5000/donationCampaign')
      .then((res) => res.json())
      .then((data) => setDonationCampaigns(data));
  }, []);

  // Handle campaign deletion
  const handleDeleteCampaign = (id) => {
    fetch(`http://localhost:5000/donationCampaign/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setDonationCampaigns((prev) =>
            prev.filter((campaign) => campaign._id !== id)
          );
          toast.success('Campaign deleted successfully!', { position: 'top-center' });
        } else {
          toast.error('Failed to delete campaign.', { position: 'top-center' });
        }
      })
      .catch(() => {
        toast.error('An error occurred while deleting the campaign.', { position: 'top-center' });
      });
  };

  // Handle campaign pause/unpause
  const handleTogglePause = (id, currentStatus) => {
    toast.success(
        `Campaign ${!currentStatus ? 'paused' : 'unpaused'} successfully!`,
        { position: 'top-center' }
      );
    fetch(`http://localhost:5000/donationCampaign/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paused: !currentStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setDonationCampaigns((prev) =>
            prev.map((campaign) =>
              campaign._id === id ? { ...campaign, paused: !currentStatus } : campaign
            )
          );
          
        } 
      })
  };
  const handleUpdate =(campaign)=>{
    // console.log(campaign);
    navigate(`/dashboard/MyDonationCamaigns/updateCampaign/${campaign._id}`, { state: { campaign } });
}

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-4">All Donation Campaigns</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Maximum Donation Amount</th>
              <th className="px-4 py-2">Last Date of Donation</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationCampaigns.map((campaign) => (
              <tr key={campaign._id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.name}
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td className="px-4 py-2">{campaign.name}</td>
                <td className="px-4 py-2">{campaign.maximumDonationAmount}</td>
                <td className="px-4 py-2">{campaign.lastDateOfDonation}</td>
                <td className="px-4 py-2">
                  {campaign.paused ? 'Paused' : 'Active'}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleTogglePause(campaign._id, campaign.paused)}
                    className={`px-4 py-2 text-white rounded ${
                      campaign.paused ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  >
                    {campaign.paused ? 'Unpause' : 'Pause'}
                  </button>
                  <button
                    onClick={() =>handleUpdate(campaign)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonationCampaigns;
