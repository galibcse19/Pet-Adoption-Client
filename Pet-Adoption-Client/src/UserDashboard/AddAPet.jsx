import React, { useContext, useState } from 'react';
import DynamicTitle from '../Shared/DynamicTitle';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';

const AddAPet = () => {
    const {user} = useContext(AuthContext);
    const {error, setError} = useState('');
    const adoption = false;
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const age = form.age.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const adoption = form.adoption.value;
        const time = form.time.value;
        const category = form.category.value;
        const location = form.location.value;
        const shortDescribption = form.shortDescribption.value;
        const longDescribption = form.longDescribption.value;
        const date = new Date().toISOString().split("T")[0];
      
        console.log(name, age, email, adoption, time, category, location, shortDescribption, longDescribption, date);
      
        // Ensure an image is selected
        // if (!image) {
        //   alert("Please select an image!");
        //   return;
        // }
      
        // Prepare the FormData object
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
            // console.log("Image uploaded successfully:", data.data.url);
      
            // Example: Construct the pet data object
            const petData = {
              name,
              age,
              email,
              adoption,
              time,
              category,
              location,
              shortDescribption,
              longDescribption,
              date,
              imageUrl: data.data.url,
            };
            fetch('http://localhost:5000/pets',{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(petData)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.insertedId){
                    toast.success('Pet data Uploded sucessfully',{position: "top-center"});
                }
            })
            // .catch(error => console.log(error.message));
            .catch(error =>{
                setError(error.message)
            });
            // console.log("Pet data:", petData);

            // alert("Pet added successfully!");
          } else {
            console.error("Image upload failed:", data);
            // alert("Failed to upload image.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        //   alert("An error occurred while uploading the image.");
        }
      };
      
    return (
        <div>
            <DynamicTitle heading={"Add A Pet"}></DynamicTitle>
            <form onSubmit={handleSubmit} className='grid lg:grid-cols-2 grid-cols-1 gap-5 p-10'>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-white">Pet Name:</span>
                        </div>
                        <input required name="name" type="text" placeholder="Enter Pet Name" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white ">Pet Image:</span>
                        </div>
                        <input type="file"  name="image" className="input input-bordered lg:w-[90%] w-full p-2 rounded" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Age:</span>
                        </div>
                        <input required name="age" type="number" placeholder="Enter Pet Age" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full my-2">
                        <div className="label mt-1">
                            <span className="label-text text-white">Your Email:</span>
                        </div>
                        <input required name="email" type="text" disabled value={user.email}  className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Adoption:</span>
                        </div>
                        <input required name="adoption" type="text" disabled value={adoption}  className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                    <label className="form-control w-full">
                <div className="labe mt-1l">
                    <span className="label-text text-white">Time (Bangladesh):</span>
                </div>
                <input
                    type="time"
                    name='time'
                    className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                    value={new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }))
                    .toISOString()
                    .substr(11, 5)} 
                    readOnly
                />
                </label>
                
                </div>
                <div>
                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text text-white">Pet Category:</span>
                                    </div>
                                    <select name="category" required className="select select-bordered lg:w-[90%] w-full p-2 rounded">
                                        <option>Rabbit</option>
                                        <option selected>Cat</option>
                                        <option>Dog</option>
                                        <option >Fish</option>
                                        <option>Bird</option>
                                    </select>
                     </label>
                     <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Location:</span>
                        </div>
                        <input required name="location" type="text" placeholder="Enter Pet Location" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Short Describption:</span>
                        </div>
                        <input required name="shortDescribption" type="text" placeholder="Enter Pet Describption" className="input input-bordered lg:w-[90%] w-full p-2 rounded"/>
                    </label>
                     <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Long Describption:</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered  lg:w-[90%] w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            name='longDescribption'
                            placeholder="Write describption here..."
                        ></textarea>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Date:</span>
                        </div>
                        <input
                            type="date"
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                            value={new Date().toISOString().split('T')[0]} // Default to today's date
                            readOnly
                            />
                    </label>
                </div>
                <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Now Submit</span>
                                </div>
                                <button
                                type="submit"
                                className="font-bold p-3 bg-blue-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]"
                                >
                                Add Pet
                               </button>
                 </label>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default AddAPet;