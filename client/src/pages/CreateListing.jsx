import React, { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
export default function CreateListing() {
  
  const {currentUser}= useSelector(state => state.user);
  const token = useSelector((state)=> state.user.token);
  const [files,setFiles] =useState([]);
  const Navigate = useNavigate();
  const [formdata, setFormData]= useState({
    imageUrl: [],
    name : "",
    description: "",
    address: "", 
    type:" rent",
    bedrooms:1,
    bathrooms : 1,
    regularPrice:50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });
  
  const [imageuploaderror , setimageuploaderror]= useState(false);
  const [uploading, setuploading] = useState(false);
  const [error,setError] = useState(false);
  const [loading, setloading] = useState(false);
 
  useEffect(() => {
    console.log("Token:", token);
  }, [token]);
    console.log(formdata);
  

  const handleImageSubmit = (e)=> {
    if(files.length>0 && files.length + formdata.imageUrl.length <7){
      setuploading(true);
      setimageuploaderror(false);
        const promises = [];

        for(let  i= 0; i< files.length ; i++){
          promises.push(storeImage(files[i]));

        }
        Promise.all(promises).then((urls)=> {
          setFormData({...formdata, imageUrl:formdata.imageUrl.concat(urls)});
          setimageuploaderror(false);
          setuploading(false);
        }).catch((err)=> {
          setimageuploaderror("Image upload failed (2 mb max per image)");
          setuploading(false);
        });
    }
    else{
      setimageuploaderror("You can only upload 6 images per listing");
      setuploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject)=> {
      const storage= getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot)=> {
          const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error)=>{
          reject(error);
        },
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then((downoadURL)=> {
           resolve(downoadURL);
          })
        
        },
      );
    });
  }


  const handleRemoveImage= (index) =>  {
    setFormData({
      ...formdata,
      imageUrl: formdata.imageUrl.filter((_,i )=> i !== index)
    });
  }

   const handleChange = (e)=> {
       if(e.target.id === 'sell'|| e.target.id === 'rent'){
        setFormData({
          ...formdata,
          type: e.target.id,
        });
       }

       if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        setFormData({
          ...formdata,
          [e.target.id]:e.target.checked,
        });
       }

       if(e.target.type ===  'number'|| e.target.type === 'text' || e.target.type === 'textarea'){
        setFormData({
          ...formdata,
          [e.target.id]: e.target.value,
        });
       }
   };

   const handleSubmit = async(e)=> {
    e.preventDefault();
    try{
      if(formdata.imageUrl.length <1  ){
        return  setError("You must upload atleast 1 image");
      }
      if(+formdata.regularPrice < +formdata.discountPrice)
        return setError("Discount price must be lower than regular price");
       setloading(true);
       setError(false);
       const res = await fetch("/api/listing/create",{
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
       },
       body: JSON.stringify({
        ...formdata,
        userRef : currentUser._id
       }),
       });
       const data = await res.json();
       setloading(false);
       if(data.success === false){
        setError(data.message);
       }
       Navigate(`/listing/${data._id}`);
    }catch(error){
     setError(error.message);
     setloading(false);
    }

   }
  return (
   <main className='p-4 max-w-4xl mx-auto'> 
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>

    <form onSubmit={handleSubmit}
    className='flex flex-col sm:flex-row gap-4' action="">
         <div className=' flex flex-col gap-4 flex-1 '>

              <input onChange={handleChange}
              value={formdata.name}
               type="text" placeholder='Name' className='border p-3 rounded-lg'
              id='name' maxLength={62} minLength={10} required />
 
              <textarea  onChange={handleChange}
              value={formdata.description}
              type="text" placeholder='description' className='border p-3 rounded-lg'
              id='description' required />

              <input  onChange={handleChange}
              value={formdata.address}
              type="text" placeholder='Address' className='border p-3 rounded-lg'
              id='address' required />
 
              <div className='flex flex-wrap gap-6'>
                <div className='flex gap-2'>
                  <input onChange={handleChange} checked= {formdata.type === "sell"}
                   type="checkbox" id='sell'  className='w-5' />
                  <span>Sell</span>
                  <input onChange={handleChange} checked= {formdata.type === "rent"}
                   type="checkbox" id='rent'  className='w-5' />
                  <span>Rent</span>
                  <input onChange={handleChange} checked= {formdata.parking}
                  type="checkbox" id='parking'  className='w-5' />
                  <span>Parking Spot</span>
                  <input onChange={handleChange} checked= {formdata.furnished}
                   type="checkbox" id='furnished'  className='w-5' />
                  <span>furnished</span>
                  <input onChange={handleChange} checked= {formdata.offer}
                  type="checkbox" id='offer'  className='w-5' />
                  <span>Offer</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <input onChange={handleChange} value={formdata.bedrooms}
                   type="number" id='bedrooms' min={1} max={10} required 
                  className='p-3 border border-gray-300 rounded-lg'/>
                  <p>Beds</p>
                </div>

                <div className='flex items-center gap-2'>
                  <input onChange={handleChange} value={formdata.bathrooms}
                  type="number" id='bathrooms' min={1} max={10} required 
                  className='p-3 border border-gray-300 rounded-lg'/>
                  <p>Baths</p>
                </div>

                <div className='flex items-center gap-2'>
                    <input onChange={handleChange} value={formdata.regularPrice}
                    type="number" id='regularPrice' min={50} max={10000000} required 
                    className='p-3 border border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>
                    <p>Regular Price</p>
                    <span className='text-xs'>($/month)</span>
                    </div>
                  
                </div>

               {formdata.offer && (
                 <div className='flex items-center gap-2'>
                 <input onChange={handleChange} 
                 value={formdata.discountPrice}
                  type="number" id='discountPrice' 
                  min={0} max={1000000} required 
                 className='p-3 border border-gray-300 rounded-lg'/>
                 <div className='flex flex-col items-center '>
                 <p>Discount Price</p>
                 <span className='text-xs'>($/month)</span>
                 </div>
                
               </div>
               )}
                
              </div>
         </div>

         <div className='flex flex-col flex-1 gap-4'>
             <p className='font-semibold '>Images:</p>
             <span className='font-normal text-gray-600 ml-2'
             >The first image will be the cover (max 6)</span>

             <div className='flex gap-4 '>
                <input onChange={(e)=> setFiles(e.target.files)}
                type="file" id='images' accept='image/*' multiple
                  className='p-3 border-gray-300 rounded w-full'/>

                 <button type='button' disabled= {uploading}
                  onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700
                 rounded upppercase hover:shadow-lg disabled:opacity-80'>
                  {uploading ? 'Uploading...' : "Upload"}
                 </button>
                 
             </div>
             <p className='text-red-700 text-sm'>{imageuploaderror && imageuploaderror}</p>
             {
              formdata.imageUrl.length > 0 && formdata.imageUrl.map((url,index)=>(
                 <div key={url} className='flex justify-between p-3 border 
                 items-center '>
                  <img src={url} alt="listingimage" className=' w-20 h-20 
                   object-contain  text-white rounded-lg uppercase 
                hover:opacity-95 disabled:opacity-80' />
                <button onClick={()=> handleRemoveImage(index)}
                type='button' className='p-3 text-red-700 rounded-lg
                uppercase hover: opacity-75'>Delete</button>
                 </div>
                
              ))
             }
             <button   disabled= {loading|| uploading }
             className='p-3 bg-slate-700 text-white rounded-lg 
         uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Creating..' : 'Create -Listing'}
         </button>
         
         </div>
        {error && <p className='text-red-700 text-sm'>{error}</p>}
    </form>
    </main>
  )
}
