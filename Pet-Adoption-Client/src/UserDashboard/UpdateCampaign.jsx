import React, { useContext, useState } from 'react';
import DynamicTitle from '../Shared/DynamicTitle';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';

const UpdateCampaign = () => {
    const { state } = useLocation();
    const {user} =useContext(AuthContext);
    const {error, setError} = useState('');
    const campaign = state?.campaign;
    const imageUrl = campaign.imageUrl;
    const email = user.email;
    const time = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })).toISOString().substr(11, 5);
    const date = new Date().toISOString().split("T")[0];
    // console.log(campaign)
  
    const handleSubmit=(event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const maximumDonationAmount= form.maximumDonationAmount.value;
        const lastDateOfDonation = form.lastDateOfDonation.value;
        const shortDescribption= form.shortDescribption.value;
        const longDescribption = form.longDescribption.value;
    const updateCampign={
        name:name,
        email:email,
        date:date,
        time:time,
        shortDescribption:shortDescribption,
        longDescribption:longDescribption,
        maximumDonationAmount:maximumDonationAmount,
        lastDateOfDonation:lastDateOfDonation,
        imageUrl:imageUrl
    }
    fetch(`http://localhost:5000/donationCampaign/${campaign._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateCampign),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success('Campign data Updated sucessfully',{position: "top-center"});
                } else {
                    toast.warn('Not Changes',{position: "top-center"});
                }
            })
            .catch((err) =>  setError(err));

    }
    return (
        <div className='my-10'>
            <DynamicTitle heading={'Update Campaign'}></DynamicTitle>
            <div className='my-10'>
             <form onSubmit={handleSubmit} className='grid lg:grid-cols-2 grid-cols-1 gap-5 p-10'>
                <div>
                    <label className="form-control w-full my-2">
                        <div className="label">
                         <img className='w-24' src={campaign.imageUrl} alt="" />
                        </div>
                        <input type="file" disabled name="image" className="input input-bordered lg:w-[90%] w-full p-2 rounded" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Name:</span>
                        </div>
                        <input required name="name" type="text" defaultValue={campaign.name}  className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full ">
                        <div className="label mt-1">
                            <span className="label-text text-white">Your Email:</span>
                        </div>
                        <input required name="email" type="text" disabled value={user.email}  className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Maximum Donation Amount:</span>
                        </div>
                        <input required name="maximumDonationAmount" type="number" defaultValue={campaign.maximumDonationAmount} className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Last Date of Donation:</span>
                        </div>
                        <input required name="lastDateOfDonation" type="date" defaultValue={campaign.lastDateOfDonation} className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     
                </div>
                <div>
                 
                     <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-white">Short Describption:</span>
                        </div>
                        <input required name="shortDescribption" type="text" defaultValue={campaign.shortDescribption} className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     <label className="form-control w-full">
                        <div className="label mt-4">
                            <span className="label-text text-white">Long Describption:</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered  lg:w-[90%] w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            name='longDescribption'
                             defaultValue={campaign.longDescribption}
                        ></textarea>
                    </label>
                    <label className="form-control w-full text-white">
                    <div className="label mt-2">
                        <span className="label-text text-white">Now Submit</span>
                    </div>
                    <button  type="submit" className="font-bold p-3 bg-blue-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]" >Update Campaign</button>
                   </label>
                </div>
                
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
             </div>
        </div>
    );
};

export default UpdateCampaign;