import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../components/';
export default function SignUp() {

  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        type="text" 
        placeholder='Enter your username' 
        className='border p-3 rounded-lg' 
        id='username' 
        value={formdata.username}
        onChange={handleChange}
        />

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
         onClick={handleSubmit}
         disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading? 'Loading...': 'Sign-Up'}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'}>
           <span className='text-blue-700'>Sign IN</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
