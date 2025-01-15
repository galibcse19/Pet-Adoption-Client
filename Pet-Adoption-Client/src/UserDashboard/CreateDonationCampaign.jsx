import React, { useContext, useState } from 'react';
import DynamicTitle from '../Shared/DynamicTitle';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';

const CreateDonationCampaign = () => {
    const {user} = useContext(AuthContext);
    const {error, setError} = useState('');
    const handleSubmit = async (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value;
            const email = form.email.value;
            const image = form.image.files[0];
            const time = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })).toISOString().substr(11, 5);
            const date = new Date().toISOString().split("T")[0];
            const shortDescribption = form.shortDescribption.value;
            const longDescribption = form.longDescribption.value;
            const maximumDonationAmount = form.maximumDonationAmount.value;
            const lastDateOfDonation = form.lastDateOfDonation.value;
           
        //    console.log(image)
        //     console.log( email, time, shortDescribption, longDescribption, date,maximumDonationAmount,lastDateOfDonation);
           

            const formData = new FormData();
            formData.append("image", image);
          
            try {
              const response = await fetch("https://api.imgbb.com/1/upload?key=eaa82e6257572ebecf5dc0fa1ea74890", {
                method: "POST",
                body: formData,
              });
          
              if (!response.ok) {
                throw new Error("Failed to upload image");
              }
          
              const data = await response.json();
          
              if (data.success) {

                const donationCampaignData = {
                  name,
                  email,
                  date,
                  time,
                  shortDescribption,
                  longDescribption,
                  maximumDonationAmount,
                  lastDateOfDonation,
                  imageUrl: data.data.url,
                };
                fetch('http://localhost:5000/donationCampaign',{
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(donationCampaignData)
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.insertedId){
                        toast.success('Donation campaign data Uploded sucessfully',{position: "top-center"});
                    }
                })
                // .catch(error => console.log(error.message));
                .catch(error =>{
                    setError(error.message);
                });
                 
              } else {
                setError("Image upload failed:", data);
               
              }
            } catch (error) {
                setError("Error uploading image:", error);
            
            }
          };
    return (
        <div>
            <DynamicTitle heading={'Create Donation Campaign'}></DynamicTitle>
             <div className='my-10'>
             <form onSubmit={handleSubmit} className='grid lg:grid-cols-2 grid-cols-1 gap-5 p-10'>
                <div>
                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span className="label-text text-white ">Pet Image:</span>
                        </div>
                        <input type="file"  name="image" className="input input-bordered lg:w-[90%] w-full p-2 rounded" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Name:</span>
                        </div>
                        <input required name="name" type="text" placeholder='Enter Pet Name'  className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
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
                        <input required name="maximumDonationAmount" type="number" placeholder="Enter Amount" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Last Date of Donation:</span>
                        </div>
                        <input required name="lastDateOfDonation" type="date" placeholder="Enter Expire date" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     
                </div>
                <div>
                 
                     <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-white">Short Describption:</span>
                        </div>
                        <input required name="shortDescribption" type="text" placeholder="Enter Pet Describption" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     <label className="form-control w-full">
                        <div className="label mt-4">
                            <span className="label-text text-white">Long Describption:</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered  lg:w-[90%] w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            name='longDescribption'
                            placeholder="Write describption here..."
                        ></textarea>
                    </label>
                    <label className="form-control w-full text-white">
                    <div className="label mt-2">
                        <span className="label-text text-white">Now Submit</span>
                    </div>
                    <button  type="submit" className="font-bold p-3 bg-blue-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]" >Create Campaign</button>
                   </label>
                </div>
                
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
             </div>
        </div>
    );
};

export default CreateDonationCampaign;