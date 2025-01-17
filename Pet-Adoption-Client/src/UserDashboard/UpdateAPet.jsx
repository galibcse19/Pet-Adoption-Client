import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DynamicTitle from '../Shared/DynamicTitle';
import { toast } from 'react-toastify';

const UpdateAPet = () => {
    const { state } = useLocation();
    const pet = state?.pet;
    const {error, setError} = useState('');
    const image = pet.imageUrl;
    const email =pet.email;
    const date = new Date().toISOString().split("T")[0];
    const adoption = false;

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const bangladeshTime = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
        )
        .toISOString()
        .substr(11, 5);
        setCurrentTime(bangladeshTime);
    }, []);

    if (!pet) {
        return <p>Pet details not found. Please go back and try again.</p>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const updatedPet = {
            name: form.name.value,
            age: form.age.value,
            image:image,
            email:email,
            date:date,
            adoption:adoption,
            time:currentTime,
            category: form.category.value,
            location: form.location.value,
            shortDescribption: form.shortDescribption.value,
            longDescribption: form.longDescribption.value,
        };
        // console.log(updatedPet);

        fetch(`https://pet-adoption-server-jade.vercel.app/pets/${pet._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPet),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0) {
                toast.success('Pet data Updated sucessfully',{position: "top-center"});
            } else {
                toast.warn('Not Changes',{position: "top-center"});
            }
        })
        .catch((err) =>  setError(err));
    };

    return (
        <div>
            <DynamicTitle heading="Update A Pet" />
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 gap-5 p-10">
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-white">Pet Name:</span>
                        </div>
                        <input
                            required
                            name="name"
                            type="text"
                            defaultValue={pet.name}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Image:</span>
                        </div>
                        <img
                            src={pet.imageUrl}
                            alt={pet.name}
                            className="w-32 h-32 object-cover mb-2"
                        />
                        <input
                            type="file"
                            name="image" disabled
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Age:</span>
                        </div>
                        <input
                            required
                            name="age"
                            type="number"
                            defaultValue={pet.age}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full my-2">
                        <div className="label mt-1">
                            <span className="label-text text-white">Your Email:</span>
                        </div>
                        <input
                            required
                            name="email"
                            type="text"
                            disabled
                            defaultValue={pet.email}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Adoption:</span>
                        </div>
                        <input
                            required
                            name="adoption"
                            type="text"
                            disabled
                            defaultValue={pet.adoption}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Time (Bangladesh):</span>
                        </div>
                        <input
                            type="time"
                            name="time"
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                            value={currentTime}
                            readOnly
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-white">Pet Category:</span>
                        </div>
                        <select
                            name="category"
                            required
                            defaultValue={pet.category}
                            className="select select-bordered lg:w-[90%] w-full p-2 rounded"
                        >
                            <option>Rabbit</option>
                            <option>Cat</option>
                            <option>Dog</option>
                            <option>Fish</option>
                            <option>Bird</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Pet Location:</span>
                        </div>
                        <input
                            required
                            name="location"
                            type="text"
                            defaultValue={pet.location}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Short Description:</span>
                        </div>
                        <input
                            required
                            name="shortDescribption"
                            type="text"
                            defaultValue={pet.shortDescribption}
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Long Description:</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered lg:w-[90%] w-full p-2 rounded"
                            rows="4"
                            name="longDescribption"
                            defaultValue={pet.longDescribption}
                        ></textarea>
                    </label>
                    <label className="form-control w-full">
                        <div className="label mt-1">
                            <span className="label-text text-white">Date:</span>
                        </div>
                        <input
                            type="date"
                            className="input input-bordered lg:w-[90%] w-full p-2 rounded"
                            value={new Date().toISOString().split("T")[0]}
                            readOnly
                        />
                    </label>
                </div>
                <label className="form-control w-full text-white">
                    <div className="label">
                        <span className="label-text text-white">Submit Changes</span>
                    </div>
                    <button
                        type="submit"
                        className="font-bold p-3 bg-blue-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]"
                    >
                        Update Pet
                    </button>
                </label>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default UpdateAPet;
