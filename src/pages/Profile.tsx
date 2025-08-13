import React, { useRef, useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { FiPlus } from 'react-icons/fi';
import { Input } from '../components/ui/input';

type ProfileDataState = {
  fullName : string ,
  email : string ,
  contact: string ,
  adress : string ,
  city: string ,
  country : string ,
  profilePicture : string
}

const Profile = () => {
  const [profileData , setProfileData] = useState<ProfileDataState>({
    fullName : "" ,
    email : "" ,
    contact: "" ,
    adress : "" ,
    city: "" ,
    country : "" ,
    profilePicture : ""
  })
  const imageRef = useRef<HTMLInputElement | null>(null);
  
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const dbImage = "https://github.com/shadcn.png"; 
    setPreview(dbImage);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setProfileData((prev)=> ({...prev , profilePicture: imageURL}))
    }
  };

  const changeHandler = (e: React.ChangeEvent <HTMLInputElement >)=>{
     const {name , value} = e.target 
     setProfileData({...profileData , [name]: value})
  }

  return (
    <form >
      <div className="flex justify-center items-center gap-8">
        <Avatar className="cursor-pointer w-32 h-32 relative group">
          <AvatarImage src={preview} />
          <AvatarFallback>CN</AvatarFallback>

          <input
            ref={imageRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <div
            onClick={() => imageRef?.current?.click()}
            className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-50 flex items-center justify-center transition-opacity"
          >
            <FiPlus className="text-white" size={35} />
          </div>
        </Avatar>
        <Input
           type='text'
           value={profileData?.fullName}
            onChange={changeHandler}
         className='w-96 focus:!ring-0 '/>
      </div>
    </form>
  );
};

export default Profile;
