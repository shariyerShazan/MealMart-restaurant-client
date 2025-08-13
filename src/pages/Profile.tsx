import React, { useRef, useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { FiPlus } from 'react-icons/fi';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

type ProfileDataState = {
  fullName: string;
  email: string;
  contact: string;
  adress: string;
  city: string;
  country: string;
  profilePicture: string;
};

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileDataState>({
    fullName: '',
    email: '',
    contact: '',
    adress: '',
    city: '',
    country: '',
    profilePicture: '',
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    // ধর ডাটাবেস থেকে আসছে
    const dbImage = 'https://github.com/shadcn.png';
    setPreview(dbImage);
    setProfileData((prev) => ({ ...prev, profilePicture: dbImage }));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setProfileData((prev) => ({ ...prev, profilePicture: imageURL }));
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(profileData);
    // এখানে সার্ভারে পাঠানোর API কল হবে
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="cursor-pointer w-32 h-32 group">
            <AvatarImage src={preview} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

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
            <FiPlus className="text-white" size={35} />
          </div>
        </div>

        {/* Full Name */}
        <div className="flex-1">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={profileData.fullName}
            onChange={changeHandler}
            className="mt-1"
          />
        </div>
      </div>

      {/* More Fields */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={profileData.email}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            name="contact"
            type="text"
            placeholder="Enter contact number"
            value={profileData.contact}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label htmlFor="adress">Address</Label>
          <Input
            id="adress"
            name="adress"
            type="text"
            placeholder="Enter your address"
            value={profileData.adress}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="Enter your city"
            value={profileData.city}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            type="text"
            placeholder="Enter your country"
            value={profileData.country}
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <Button type="submit" className="bg-myColor hover:bg-myColor">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default Profile;
