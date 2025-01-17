import React, { useEffect, useState } from 'react';
import DynamicTitle from '../Shared/DynamicTitle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  // Fetch all pets
  useEffect(() => {
    fetch('http://localhost:5000/pets')
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  // Handle delete pet
  const handleDelete = (id) => {
        fetch(`http://localhost:5000/pets/${id}`, {
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

  // Handle toggle adoption status
  const handleToggleAdoption = (id, currentStatus) => {
    fetch(`http://localhost:5000/pets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adoption: !currentStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success('Chnage Adopted status.', { position: 'top-center' });
          setPets((prevPets) =>
            prevPets.map((pet) =>
              pet._id === id ? { ...pet, adoption: !currentStatus } : pet
            )
          );
        }
      });
  };
  const handleUpdate =(pet)=>{
    // console.log(pet);
    navigate(`/dashboard/myAddedPets/updateAPet/${pet._id}`, { state: { pet } });
}
  return (
    <div className="my-4">
      <DynamicTitle heading="All Pets" />
      <div className="my-4">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Adoption Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet._id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{pet.name}</td>
                  <td className="px-4 py-2">{pet.age}</td>
                  <td className="px-4 py-2">{pet.category}</td>
                  <td className="px-4 py-2">{pet.location}</td>
                  <td className="px-4 py-2">
                    {pet.adoption== true ? 'Adopted' : 'Not Adopted'}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleToggleAdoption(pet._id, pet.adoption)}
                      className={`px-4 py-2 text-white rounded ${
                        pet.adoption=='false' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {pet.adoption == 'false' ? 'Chnage Adopted status' : 'Chnage Adopted status'}
                    </button>
                    <button
                      onClick={() =>handleUpdate(pet)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(pet._id)}
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
    </div>
  );
};

export default AllPets;
