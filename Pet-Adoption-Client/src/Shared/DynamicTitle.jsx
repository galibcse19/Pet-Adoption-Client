import React from 'react';

const DynamicTitle = ({heading}) => {
    return (
        <div>
            <h3 className='lg:text-3xl md:text-2xl text-xl text-center uppercase py-4'>{heading}</h3>
            <hr />
        </div>
    );
};

export default DynamicTitle;