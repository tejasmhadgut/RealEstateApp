import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector(state=>state.user)
    return (
      <header className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
          <h1 className="font-extrabold text-lg sm:text-3xl flex flex-wrap items-center space-x-3">
            <span className="animate-bounce text-yellow-300">Prime</span>
            <span className="italic transform rotate-6 text-gray-200">Estates</span>
          </h1>
          </Link>
          <form className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-4 py-2 w-64 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition pl-10 sm:w-64"
            />
            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600'/>
          </form>
          <ul className='flex gap-4'>
              <Link to='/'>
              <li className='hidden sm:inline text-gray-200 hover:underline'>Home</li>
              </Link>
              <Link to='/About'>
              <li className='hidden sm:inline text-yellow-200 hover:underline'>About</li>
              </Link>
              <Link to='/profile'>
              {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
              ): (
                <li className='sm:inline text-gray-200 hover:underline'>Sign in</li>
              
              )}
              </Link>
              
          </ul>
        </div>
      </header>
    )
  }
  
  