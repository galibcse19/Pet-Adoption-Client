import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Swal from 'sweetalert2';
import DynamicTitle from '../Shared/DynamicTitle';

const MyDonations = () => {
    const { user } = useContext(AuthContext);
    const [userDonations, setUserDonations] = useState([]);
    const [totalDonation, setTotalDonation] = useState(0);

    useEffect(() => {
        fetch('https://pet-adoption-server-jade.vercel.app/donateData')
            .then((res) => res.json())
            .then((data) => {

                // Filter donations by the logged-in user's email
                const filteredData = data.filter(donation => donation.donerEmail === user.email);
                setUserDonations(filteredData);

                // Calculate the total donation amount
                const total = filteredData.reduce((sum, donation) => sum + Number(donation.donateAmount), 0);
                setTotalDonation(total);
            })
            .catch((err) => console.error('Error fetching donation data:', err));
    }, [user.email]);

    const handleDelete =(_id)=>{
        // console.log(_id)
        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, refund it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`https://pet-adoption-server-jade.vercel.app/donateData/${_id}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                    Swal.fire(
                                        "Redund!",
                                        "Your donation has been refunded.",
                                        "success"
                                    );
                                } else {
                                    Swal.fire(
                                        "Failed!",
                                        "Something went wrong while refunding.",
                                        "error"
                                    );
                                }
                            })
                    }
                });
    }

    return (
        <div className="container mx-auto p-5">
            <DynamicTitle heading={'My Donations'}></DynamicTitle>
            <p className="text-lg font-semibold my-6">
                Total Donation Amount: <span className="text-red-600">{totalDonation} Tk</span>
            </p>
            {userDonations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userDonations.map((donation) => (
                        <div key={donation._id} className="bg-white p-4 shadow-md rounded-lg">
                            <img
                                src={donation.donatePetImage}
                                alt={donation.donatePetName}
                                className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-xl font-bold">{donation.donatePetName}</h3>
                            <p className="text-gray-600">
                                <strong>Amount Donated:</strong> {donation.donateAmount} Tk
                            </p>
                            <p className="text-gray-600">
                                <strong>Donated By:</strong> {donation.donerName}
                            </p>
                            <button onClick={()=>handleDelete(donation._id)} className="bg-red-500 text-white px-6 py-3 mt-2 rounded-md font-bold hover:bg-red-600 transition duration-200">
                            Refund Donation
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">You haven't made any donations yet.</p>
            )}
        </div>
    );
};

export default MyDonations;
