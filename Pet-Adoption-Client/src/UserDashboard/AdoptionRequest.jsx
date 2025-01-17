import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';
import DynamicTitle from '../Shared/DynamicTitle';

const AdoptionRequest = () => {
    const { user } = useContext(AuthContext);
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        fetch('https://pet-adoption-server-jade.vercel.app/adoptRequest')
            .then((res) => res.json())
            .then((data) => {
                // Filter requests by petAddedPersonEmail matching the logged-in user's email
                const filteredData = data.filter(
                    (request) => request.petAddedPersonEmail === user.email
                );
                setRequestData(filteredData);
            })
            .catch((err) => console.error('Error fetching adoption requests:', err));
    }, [user.email]);

    const handleAccept = (id) => {
        // Handle accept logic here
        console.log(`Accepted request with ID: ${id}`);
        toast.success(`Accepted adopt request`, { position: "top-center" });
        // Update the status in the database or perform additional actions
    };

    const handleReject = (id) => {
        // Perform DELETE request directly
        fetch(`https://pet-adoption-server-jade.vercel.app/adoptRequest/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    toast.warn(`Rejected adopt request`, { position: "top-center" });
                    // Optionally update the state to remove the rejected request from the list
                    setRequestData((prev) => prev.filter((request) => request._id !== id));
                }
            })
            .catch((err) => console.error('Error rejecting adoption request:', err));
    };
    
    return (
        <div className="container mx-auto p-5">
             <DynamicTitle heading={'Adoption Requests'}></DynamicTitle>
            {requestData.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 mt-6">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Pet Image</th>
                            <th className="border border-gray-300 px-4 py-2">Pet Name</th>
                            <th className="border border-gray-300 px-4 py-2">Requester Name</th>
                            <th className="border border-gray-300 px-4 py-2">Requester Email</th>
                            <th className="border border-gray-300 px-4 py-2">Requester Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Requester Address</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestData.map((request) => (
                            <tr key={request._id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={request.image}
                                        alt={request.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.adptionUserName}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.adptionUserEmail}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.adptionUserNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.adptionUserAddress}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                        onClick={() => handleAccept(request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No adoption requests available.</p>
            )}
        </div>
    );
};

export default AdoptionRequest;
