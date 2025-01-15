import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the homepage
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white shadow-lg p-10 rounded-md border">
                {/* Error Image */}
                <img
                    src="https://i.ibb.co.com/hWGYtXx/error-Page.jpg"
                    alt="Error Illustration"
                    className="w-2/3 mx-auto mb-6"
                />
                {/* Error Message */}
                <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
                <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>

                {/* Back to Home Button */}
                <button
                    onClick={handleBackToHome}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
