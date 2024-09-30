import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r via-gray-700 to-gray-800">
    <div className="w-full max-w-lg bg-gray-700 text-white rounded-lg shadow-lg p-6">
    <h1 className='text-2xl font-extrabold text-center mb-6'>Sign Up</h1>
    <form className="flex flex-col gap-4">
        <input type='text' placeholder="username" className="px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition" id='username' />
        <input type='text' placeholder="email" className="px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition" id='email' />
        <input type='text' placeholder="password" className="px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition" id='password' />
        <button className="bg-yellow-300 text-gray-900 py-2 rounded-full font-bold hover:bg-yellow-400 transition">Sign Up</button>
    </form>
    <div className="text-center mt-6">
        <p className="text-gray-300">Have an account?</p>
        <Link to={"/sign-in"}>
            <span className="text-yellow-300 hover:underline">Sign In</span>
        </Link>
    </div>
    </div>
    </div>
  )
}
