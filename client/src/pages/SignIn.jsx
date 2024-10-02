import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFaliure, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state)=> state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]:e.target.value,
            }
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
            dispatch(signInFaliure(data.message));
            return;
        }
        dispatch(signInSuccess(data.message));
        navigate('/');
        } catch(error){
            dispatch(signInFaliure(error.message));
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r via-gray-700 to-gray-800">
    <div className="w-full max-w-lg bg-gray-700 text-white rounded-lg shadow-lg p-6">
    <h1 className='text-2xl font-extrabold text-center mb-6'>Sign In</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type='email' 
        placeholder="email" 
        className="px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition" 
        id='email' onChange={handleChange}/>
        <input type='password' 
        placeholder="password" 
        className="px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition" 
        id='password' onChange={handleChange}/>
        <button disabled={loading}
        className="bg-yellow-300 text-gray-900 py-2 rounded-full font-bold hover:bg-yellow-400 transition">{loading ? 'Loading...':'Sign In'}</button>
    </form>
    <div className="text-center mt-6">
        <p className="text-gray-300">Dont have an account?</p>
        <Link to={"/sign-up"}>
            <span className="text-yellow-300 hover:underline">Sign Up</span>
        </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    </div>
  )
}
