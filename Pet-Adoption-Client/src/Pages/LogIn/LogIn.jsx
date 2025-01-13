import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import animation from '../../assets/lotto2.json'

const LogIn = () => {
    const {signInWithGoogle,signIn} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error,setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location =useLocation();
    const from =location.state?.from?.pathname || "/";
    const onSubmit  = data =>{
        signIn(data.email,data.password)
        .then(result =>{
            const user = result.user;
            toast.success('Log in successful.',{position: "top-center"});
            navigate(from, {replace:true});
        })
        .catch((error) => {
            setError(error.message); 
          });
    } 

    const handelGoogleSignIn =()=>{
        signInWithGoogle()
        .then((result)=>{
            const user=result.user;
            console.log(user);
            toast.success('Log in successful.',{position: "top-center"});
            navigate(from, {replace:true});
        })
        .catch((error)=>{
            setError(error);
        })
    }    
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:px-20 md:px-16 px-2'>
                <div className='lg:w-2/3 w-1/3 py-10   mx-auto my-auto'>
                <Lottie className='rounderd-full' animationData={animation}></Lottie>
                </div>
                <div className='p-6 my-10 bg-gray-200 rounded-xl'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter your Email'
                        {...register("email",{ required: true })}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 lg:p-4 md:p-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent"
                        required
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter your Password'
                        {...register("password",{ required: true })}
                        className="mt-1 lg:p-4 md:p-4 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent"
                        required
                    />
                    {/* <p className="text-white my-2">
                        <Link onClick={handleForgetPassword}>Forget Password ?</Link>
                    </p> */}
                    {message && <p className="text-center text-red-600 text-sm mt-4">{message}</p>}
                    </div>
                    <button
                    type="submit"
                    className="w-full font-bold lg:p-4 md:p-4 p-2 bg-red-600 text-white rounded-md hover:bg-gray-800 transition duration-200"
                    >
                    LOG IN
                    </button>
                </form>
                {
                    error && <p className='text-red-600'>{error}</p>
                }
                <p className=" my-2">
                    Don't have an Account? <a className="font-bold" href="/register">Register</a>
                </p>
                <p className='my-4 text-center'>OR</p>
                <p><button onClick={handelGoogleSignIn} className="w-full font-bold lg:p-4 md:p-4 p-2 bg-red-600 text-white rounded-md hover:bg-gray-800">Log in with Google</button></p>
                </div>

            </div>
    );
};

export default LogIn;