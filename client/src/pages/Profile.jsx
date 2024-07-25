import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, err } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formdata, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
    avatar: currentUser.avatar
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Assuming token is stored in auth slice
  const [showlistingsError, setShowListingsError] = useState(false);
  const [userlistings, setuserlistings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formdata, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, 
      [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      if ( data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const handleSignout = async()=> {
        try{
           dispatch(signoutUserStart());
          const res = await fetch("/api/auth/signout");
          const data = await res.json();
          if(data.success === false){
            dispatch(signoutUserFailure(data.message));
            return;
          }
          dispatch(signoutUserSuccess(data));
        }catch(error){
          dispatch(signoutUserFailure(data.message));
        }
  }


  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        console.log("done");
        return;
      }
      setuserlistings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
        />

        <img
          src={formdata.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className='border-black rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${filePerc}%`}
            </span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder='username'
          value={formdata.username}
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />

        <input
          type="email"
          value={formdata.email}
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button disabled={loading}
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        <Link className='bg-green-700 uppercase  text-white  p-3
        rounded-lg text-center hover: opacity-95'  to={"/create-listing"}>
        Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign-Out</span>
      </div>

      <p className='text-red-700 mt-5'> {err ? err : ""}</p>
      <p className='text-green-700 mt-5'> {updateSuccess ? "User is updated Successfully" : ""} </p>

      <button onClick={handleShowListings}
      className='text-green-700 w-full '>Show Listings</button>
      <p className='text-red-700 mt-5'
      >{showlistingsError? 'Error showing listings' : ''}</p>
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
      {userlistings && userlistings.length>0 &&
      
      userlistings.map((listing)=> (
       <div key={listing._id} className='border rounded-lg p-3 
       flex justify-between items-center gap-4 '>
           <Link to={`/listing/${listing._id}`}>
           <img src={listing.imageUrl[0]} alt="listing cover"
           className=' mb-2 h-16 w-18 object-contain ' />
           </Link>
           <Link className='flex-1 text-slate-700 font-semibold
           hover:underline truncate'
           to={`/listing/${listing._id}`}>
            <p className='text-slate-700 font-semibold
             flex-1 hover:underline truncate '>{listing.name}</p>

           </Link>

           <div className=' flex flex-col items-center '>
              <button className='text-red-700 uppercase'>Delete</button>
              <button className='text-green-700 uppercase'>Edit</button>
           </div>
           
       </div>
      ))}
    </div>
    </div>
  );
}
