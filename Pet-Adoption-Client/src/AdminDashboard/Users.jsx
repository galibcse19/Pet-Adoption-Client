import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DynamicTitle from '../Shared/DynamicTitle';

const Users = () => {
    const [userData, setUserData] = useState([]);

    // Fetch user data
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then((res) => res.json())
            .then((data) => setUserData(data))
            .catch((err) => console.error('Error fetching users:', err));
    }, []);

    // Handle Make Admin
    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: 'admin' }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUserData((prev) =>
                        prev.map((user) =>
                            user._id === id ? { ...user, role: 'admin' } : user
                        )
                    );
                    toast.success('User has been promoted to admin.', { position: 'top-center' });
                }
            })
            .catch((err) => console.error('Error updating user role:', err));
    };

    return (
        <div className="my-4">
            <DynamicTitle heading={'User List'}></DynamicTitle>
            <div className="overflow-x-auto mx-10 mt-6">
                <table className="table-auto w-full border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Profile Picture</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="px-4 py-2">
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full mx-auto"
                                    />
                                </td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-3 py-1 rounded ${
                                            user.role === 'admin' ? 'bg-green-200' : 'bg-blue-200'
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {user.role === 'user' ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="px-4 py-2 bg-purple-500 text-white rounded"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">Already Admin</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
