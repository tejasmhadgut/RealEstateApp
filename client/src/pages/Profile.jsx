import { useSelector } from "react-redux"

export default function Profile() {
    const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r via-gray-700 to-gray-800">
      <div className="w-full max-w-lg bg-gray-700 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-yellow-300">Profile</h1>
        <form className="space-y-4">
          <div className="flex justify-center">
            <img
              src={currentUser?.avatar}
              alt="profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
          <button className="w-full px-4 py-2 bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-400 transition">
            Update
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <button className="text-red-400 hover:underline">Delete Account</button>
          <button className="text-yellow-300 hover:underline">Sign Out</button>
        </div>
      </div>
    </div>
  )
}
