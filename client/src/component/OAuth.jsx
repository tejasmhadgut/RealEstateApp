import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { fetchSignInMethodsForEmail, linkWithCredential } from 'firebase/auth';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:result.user.displayName, email: result.user.email, photo: result.user.photoURL}),

            })
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        } catch(error){
            console.log('Could not sign in with google', error);
        }
    }

    const handleGithubClick = async () => {
        const auth = getAuth(app);
        try {
            const provider = new GithubAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/github',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            }) 
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        } catch(error){
            if (error.code === 'auth/account-exists-with-different-credential') {
                const email = error.customData.email;
                
                const pendingCredential = GithubAuthProvider.credentialFromError(error); 
                console.log(pendingCredential)
                console.log(email)
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);
                console.log(signInMethods)
                if (signInMethods.includes(GoogleAuthProvider.PROVIDER_ID)) {
                    const googleProvider = new GoogleAuthProvider();
                    console.log(googleProvider)
                    const googleResult = await signInWithRedirect(auth, googleProvider);
                    console.log("hello")
                    console.log(googleResult)
                    await linkWithCredential(googleResult.user, pendingCredential);
                    const res = await fetch('/api/auth/github',{
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({name:googleResult.user.displayName, email: googleResult.user.email, photo: googleResult.user.photoURL})
                    }) 
                    const data = await res.json()
                    dispatch(signInSuccess(data));
                    navigate('/');
                } else {
                    console.log('Could not sign in with github', error);
                }
            
        }
    }
}
    const handleLinkedinClick = async () => {
        
    }
    return (
        <div className='flex items-center justify-center gap-5'>
            <button type='button' onClick={handleGoogleClick}
              className="flex items-center justify-center w-11 h-11 bg-red-500 hover:bg-yellow-400 hover:text-gray-900 text-white-400 rounded-full transition"
            >
              <FaGoogle className="text-2xl" />
            </button>
            <button type='button' onClick={handleGithubClick}
              className="flex items-center justify-center w-11 h-11 bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white-400 rounded-full transition"
            >
              <FaGithub className="text-2xl" />
            </button>
            <button type='button' onClick={handleLinkedinClick}
              className="flex items-center justify-center w-11 h-11 bg-blue-600 hover:bg-yellow-400 hover:text-gray-900 text-white-400 rounded-full transition"
            >
              <FaLinkedin className="text-2xl" />
            </button>
        </div>
      );
}