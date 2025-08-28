import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { FiFlag, FiGlobe, FiMail, FiMapPin, FiPhone, FiPlus, FiUser } from 'react-icons/fi';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypeHooks';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/apiEndPoint';
import { toast } from 'react-toastify';
import { setUser } from '../redux/userSlice';
import { Loader2 } from 'lucide-react';

type ProfileDataState = {
  fullName: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
};

const Profile = () => {
  const {user} = useAppSelector((state)=>state.user)
  const dispatch = useAppDispatch()

  const [btnLoading , setBtnLoading] = useState<boolean>(false)
  
  const [profileData, setProfileData] = useState<ProfileDataState>({
    fullName: user?.fullName || "" ,
    email: user?.email || "" ,
    contact: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(user?.profilePicture || 'https://github.com/shadcn.png');


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBtnLoading(true)
        const formData = new FormData();
        formData.append("fullName", profileData.fullName);
        formData.append("email", profileData.email);
        formData.append("contact", profileData.contact);
        formData.append("address", profileData.address);
        formData.append("city", profileData.city);
        formData.append("country", profileData.country);

        const fileInput = imageRef.current?.files?.[0];
        if (fileInput && fileInput.size > 5*1024*1024) {
          toast.error("File size should be less than 5MB");
          return;
        }
        if (fileInput) {
            formData.append("profilePicture", fileInput);
        }

        const res = await axios.patch(`${USER_API_END_POINT}/update-profile`, formData, {
          withCredentials: true,
      });
      

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
            setBtnLoading(false)
        }
    } catch (error: any) {
      setBtnLoading(false)
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
};

  return (
    <form 
    onSubmit={handleSubmit} 
    className="max-w-3xl mt-22 mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 min-h-[70vh]"
  >
    {/* Avatar + Name */}
    <div className="flex flex-col sm:flex-row items-center gap-6  ">
      <div className="relative w-32 h-32">
        <Avatar className="w-full h-full cursor-pointer group">
          <AvatarImage className="object-cover w-full h-full rounded-full" src={preview} />
          <AvatarFallback>DP</AvatarFallback>
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* Overlay */}
          <div
            onClick={() => imageRef?.current?.click()}
            className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-50 flex items-center justify-center transition-opacity rounded-full"
          >
            <FiPlus className="text-white" size={28} />
          </div>
        </Avatar>
      </div>
  
      {/* Full Name */}
      <div className="flex-1 w-full">
        <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
          <FiUser /> Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={profileData.fullName}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0"
        />
      </div>
    </div>
  
    {/* Other Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
          <FiMail /> Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profileData.email}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0"
        />
      </div>
  
      <div>
        <Label htmlFor="contact" className="flex items-center gap-2 text-sm font-medium">
          <FiPhone /> Contact
        </Label>
        <Input
          id="contact"
          name="contact"
          type="text"
          value={profileData.contact}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0"
        />
      </div>
  
      <div>
        <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
          <FiMapPin /> Address
        </Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={profileData.address}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0"
        />
      </div>
  
      <div>
        <Label htmlFor="city" className="flex items-center gap-2 text-sm font-medium">
          <FiGlobe /> City
        </Label>
        <Input
          id="city"
          name="city"
          type="text"
          value={profileData.city}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0"
        />
      </div>
  
      <div>
        <Label htmlFor="country" className="flex items-center gap-2 text-sm font-medium">
          <FiFlag /> Country
        </Label>
        <Input
          id="country"
          name="country"
          type="text"
          value={profileData.country}
          onChange={changeHandler}
          className="mt-1 w-full focus-visible:ring-0 "
        />
      </div>
    </div>
  
    {/* Submit Button */}
    <div className="flex justify-end">
      <Button 
        type="submit" 
        className="bg-myColor cursor-pointer hover:bg-myColor/90 text-white flex items-center gap-2 px-6 py-2 rounded-md"
        disabled={btnLoading}
      >
        {btnLoading ? <><Loader2 className='animate-spin' /> Please wait</> : "Save Changes"}
      </Button>
    </div>
  </form>
  

  );
};

export default Profile;
