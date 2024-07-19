import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure, 
          signInSuccess,
          signInStart  } 
from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
export default function SignIn() {

  const [formdata, setFormData] = useState({
    email: '',
    password: ''
  });  
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formdata);
  // Handles page Refreshing 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError(null);
    // // setSuccess(false);
    try {
       dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
          <input
          type="email" 
          placeholder='Enter your email'
            className='border p-3 rounded-lg'
            id='email' 
            value={formdata.email}
            onChange={handleChange} 
            />

          <input 
          type="password"
          placeholder='Password'
            className='border p-3 rounded-lg' 
            id='password'  
            value={formdata.password}
            onChange={handleChange}  
          />

        <button 
         type='submit'
         disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading? 'Loading...': 'Sign In'}
        </button>
         
         <OAuth></OAuth>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Dont Have an Account?</p>
        <Link to={'/sign-up' }>
           <span className='text-blue-700'>Sign UP</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
