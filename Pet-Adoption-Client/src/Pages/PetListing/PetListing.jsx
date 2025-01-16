import React, { useEffect, useState } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { useNavigate } from 'react-router-dom'; // Correct import

const PetListing = () => {
    const [pets, setPets] = useState([]); // Full list of pets
    const [displayedPets, setDisplayedPets] = useState([]); // Pets currently displayed
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category
    const [page, setPage] = useState(1); // Page for infinite scrolling
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Fetch all pets
    useEffect(() => {
        fetch('http://localhost:5000/pets')
            .then((res) => res.json())
            .then((data) => {
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort pets
                setPets(sortedData);
                setDisplayedPets(sortedData.slice(0, 10)); // Initial display
            })
            .catch((err) => console.error('Error fetching pets:', err));
    }, []);

    // Infinite scrolling
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update displayed pets when page changes
    useEffect(() => {
        const filteredPets = pets.filter((pet) => {
            const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || pet.category === selectedCategory;
            const notAdopted = pet.adoption === 'false'; // Check for string "false"
            return matchesSearch && matchesCategory && notAdopted;
        });
    
        setDisplayedPets(filteredPets.slice(0, page * 10));
    }, [page, searchTerm, selectedCategory, pets]);

    const handleDetails = (data) => {
        navigate(`/petDetails/${data._id}`, { state: { data } }); // Correct usage of navigate
    };

    return (
        <div className=''>
            <DynamicTitle heading={'Pet List'} />

            {/* Search and Filter Section */}
            <div className='flex flex-col lg:flex-row items-center justify-between lg:mx-32 md:mx-10 mx-4 mt-10 gap-4'>
                <input
                    type='text'
                    placeholder='Search by name...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='input input-bordered w-full lg:w-1/2 p-2 rounded bg-gray-300'
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='select select-bordered w-full lg:w-1/4 p-2 rounded bg-gray-300'
                >
                    <option value='All'>All Categories</option>
                    <option value='Rabbit'>Rabbit</option>
                    <option value='Cat'>Cat</option>
                    <option value='Dog'>Dog</option>
                    <option value='Fish'>Fish</option>
                    <option value='Bird'>Bird</option>
                </select>
            </div>

            {/* Pet Cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:mx-32 md:mx-10 mx-4 my-10'>
                {displayedPets && displayedPets.length > 0 ? (
                    displayedPets.map((data, index) => (
                        <div key={index}>
                            <div className="card bg-slate-200 lg:w-96 md:w-84 w-76 rounded-lg">
                                <div className='p-4'>
                                    <img className='w-full h-48 border rounded-lg' src={data.imageUrl} alt="Pet" />
                                    <h2 className='my-2 font-bold text-2xl'>Name: {data.name}</h2>
                                    <p>Age: <span className='font-bold my-1'>{data.age}</span> year</p>
                                    <p>Location: <span className='font-bold my-1'>{data.location}</span></p>
                                    <p>Describption: <span className='font-bold my-1'>{data.shortDescribption}</span></p>
                                </div>
                                <button
                                    onClick={() => handleDetails(data)} // Pass the entire data object
                                    className="w-full font-bold lg:p-4 md:p-4 p-2  bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center font-bold text-xl text-gray-600">No pets available</div>
                )}
            </div>
        </div>
    );
};

export default PetListing;
