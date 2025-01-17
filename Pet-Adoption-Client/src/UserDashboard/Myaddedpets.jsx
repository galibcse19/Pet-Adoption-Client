import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { toast } from 'react-toastify';
import DynamicTitle from '../Shared/DynamicTitle';
import { useNavigate } from 'react-router-dom';

const MyAddedPets = () => {
    const { user } = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://pet-adoption-server-jade.vercel.app/pets')
            .then((res) => res.json())
            .then((data) => {
                // Filter pets by user email
                const userPets = data.filter((pet) => pet.email === user.email);
                setPets(userPets);
            });
    }, [user.email]);

    const handleDelete = (id) => {
         
            fetch(`https://pet-adoption-server-jade.vercel.app/pets/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        setPets(pets.filter((pet) => pet._id !== id));
                        toast.error('Pet deleted successfully.', { position: 'top-center' });
                    }
                });
    };

    const handleAdopted = (id) => {
        fetch(`https://pet-adoption-server-jade.vercel.app/pets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adoption: true }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setPets(pets.map((pet) => (pet._id === id ? { ...pet, adoption: true } : pet)));
                    toast.success('Pet marked as adopted.', { position: 'top-center' });
                }
            });
    };

    const handleUpdate =(pet)=>{
        // console.log(pet);
        navigate(`/dashboard/myAddedPets/updateAPet/${pet._id}`, { state: { pet } });
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * petsPerPage;
    const paginatedPets = pets.slice(startIndex, startIndex + petsPerPage);

    return (
        <div className="container mx-auto p-5">
            <DynamicTitle heading={'My Added Pets'}></DynamicTitle>
            {pets.length === 0 ? (
                <p>No pets added yet.</p>
            ) : (
                <div className='mt-6'>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">#</th>
                                <th className="border border-gray-200 px-4 py-2">Pet Name</th>
                                <th className="border border-gray-200 px-4 py-2">Category</th>
                                <th className="border border-gray-200 px-4 py-2">Image</th>
                                <th className="border border-gray-200 px-4 py-2">Adoption Status</th>
                                <th className="border border-gray-200 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPets.map((pet, index) => (
                                <tr key={pet._id} className="">
                                    <td className="border border-gray-200 px-4 py-2">{startIndex + index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{pet.name}</td>
                                    <td className="border border-gray-200 px-4 py-2">{pet.category}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <img src={pet.imageUrl} alt={pet.name} className="w-20 h-20 object-cover" />
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {pet.adoption =='true'? 'Adopted' : 'Not Adopted'}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 space-x-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() =>handleUpdate(pet)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(pet._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className={`${
                                                pet.adoption== true
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                            } text-white px-4 py-2 rounded`}
                                            onClick={() => handleAdopted(pet._id)}                                        >
                                            Mark as Adopted
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pets.length > petsPerPage && (
                        <div className="mt-4 flex justify-center space-x-2">
                            {Array.from({ length: Math.ceil(pets.length / petsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === i + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200'
                                    }`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAddedPets;
