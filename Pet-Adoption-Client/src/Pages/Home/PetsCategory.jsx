import React from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { Link } from 'react-router-dom';

const PetsCategory = () => {
    return (
        <div className='my-10'>
            <DynamicTitle heading={'Pets Category'}></DynamicTitle>
            <div className='my-4 lg:mx-32 md:mx-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-6'>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Cats</button></Link>
                </div>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Dogs</button></Link>
                </div>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Birds</button></Link>
                </div>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Fish</button></Link>
                </div>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Rabbit</button></Link>
                </div>
                <div>
                   <Link to={'/petListing'}> <button className='text-white bg-red-600 hover:bg-red-700 font-bold text-xl w-full rounded-full p-4'>Tiger</button></Link>
                </div>
                 
            </div>
        </div>
    );
};

export default PetsCategory;