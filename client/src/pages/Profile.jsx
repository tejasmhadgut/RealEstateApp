import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"

import { app } from "../firebase"
export default function Profile() {
    const {currentUser, loading, error} = useSelector((state)=> state.user)
    const fileRef = useRef(null)
    const [file,setFile] = useState(undefined)
    const [filePercentage, setFilePercentage] = useState(0)
    const [fileError, setFileError] = useState(false)
    const [form,setFormData] = useState({})
    const [updateSuccess,setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(file) {
            handleFileUpload(file);
        }
    }, [file])
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                setFileError(true);
                console.error('File upload error:', error); // Log the error to the console
            },
            () => {
                // Handle successful upload completion
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...form, avatar: downloadURL }); // Update form data with the file URL
                });
            }
        );
    }

    const handleChange = (e) => {
        setFormData({...form, [e.target.id]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',

                },
                body: JSON.stringify(form),
            })
            const data = await res.json();
            if(data.success == false){
                dispatch(updateUserFailure(data.message))
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error){
            dispatch(updateUserFailure(error.message));
        }
    }
    const handleDeleteUser = async (e) => {
        try{
            dispatch(deleteUserStart)
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',

            });
            const data = await res.json();
            if(data.success == false){
                dispatch(deleteUserFailure(data.message));
                return
            }
            dispatch(deleteUserSuccess(data))
        } catch(error){
            dispatch(deleteUserFailure(error.message))
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r via-gray-700 to-gray-800">
      <div className="w-full max-w-lg bg-gray-700 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-yellow-300">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
            <img
              onClick={  ()=>fileRef.current.click() }
              src={form.avatar || currentUser?.avatar}
              alt="profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
            
          </div>
          <p className="text-sm self-center">
                {fileError ? 
                <span className='text-red-700'>
                    Error loading image
                </span> : filePercentage > 0 && filePercentage<100 ? 
                <span className='text-yellow-700'>{`Uploading ${filePercentage}%`}</span> 
                : filePercentage === 100 ? <span className='text-green-700'>successfully Uploaded!</span>:"" }
            </p>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            id="username"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={currentUser.email}
            id="email"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full px-4 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
          <button disabled={loading} className="w-full px-4 py-2 bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-400 transition">
            {loading? 'loading....':'Update'}
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <span onClick={handleDeleteUser} className="text-red-400 hover:underline">Delete Account</span>
          <span className="text-yellow-300 hover:underline">Sign Out</span>
        </div>
        <p className="text-red-400 mt-5 text-center">{error?error:''}</p>
        <p className="text-green-400 mt-5 text-center">{updateSuccess? 'User is updated successfully': ''}</p>
      </div>
      
    </div>
    
  )
}
