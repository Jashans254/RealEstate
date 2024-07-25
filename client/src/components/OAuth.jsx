import React,{ useState } from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    //Function handle Google Click
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const handleGoogleClick= async () => {
      setLoading(true);
        setError(null);
        try{
             const provider = new GoogleAuthProvider();
             const auth = getAuth(app);

             //create signup with popup
             const result = await  signInWithPopup(auth, provider);
             
             const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name : result.user.displayName, 
                  email: result.user.email, 
                  photo: result.user.photoURL}),

             });

             if (!res.ok) {
              throw new Error('Failed to authenticate with backend');
          }

             const data = await res.json();
             dispatch(signInSuccess(data));
             navigate('/');
        }
          catch(error){
              console.log("Couldn't Signin with Google", error);
              setError('Sign-in failed. Please try again.');
          }
          finally {
            setLoading(false);
        }
    };

    return (
      <div>
      <button 
          onClick={handleGoogleClick} 
          className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full' 
          disabled={loading}>
          {loading ? 'Signing in...' : 'Continue with Google'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
      
    );
}
