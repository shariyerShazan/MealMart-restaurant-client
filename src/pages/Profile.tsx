import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiPlus, FiUser, FiMail, FiPhone, FiMapPin, FiGlobe, FiFlag } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    fullName: "",
    email: "",
    contact: "",
    adress: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    // ধর ডাটাবেস থেকে আসছে
    const dbImage = "https://github.com/shadcn.png";
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
  };

  // Reusable form field with icon
  const FormField = ({
    id,
    label,
    icon: Icon,
    ...props
  }: {
    id: string;
    label: string;
    icon: React.ElementType;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="space-y-1">
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
        <Icon className="text-gray-500" size={16} />
        {label}
      </Label>
      <Input
        id={id}
        className="focus-visible:ring-0"
        {...props}
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm space-y-6"
    >
      {/* Avatar + Name */}
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative group">
          <Avatar className="w-32 h-32 rounded-full overflow-hidden">
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

          <div
            onClick={() => imageRef?.current?.click()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full cursor-pointer"
          >
            <FiPlus className="text-white" size={30} />
          </div>
        </div>

        <div className="flex-1 w-full">
          <FormField
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            icon={FiUser}
            placeholder="Enter your full name"
            value={profileData.fullName}
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* Other Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={FiMail}
          placeholder="Enter your email"
          value={profileData.email}
          onChange={changeHandler}
        />

        <FormField
          id="contact"
          name="contact"
          type="text"
          label="Contact"
          icon={FiPhone}
          placeholder="Enter contact number"
          value={profileData.contact}
          onChange={changeHandler}
        />

        <FormField
          id="adress"
          name="adress"
          type="text"
          label="Address"
          icon={FiMapPin}
          placeholder="Enter your address"
          value={profileData.adress}
          onChange={changeHandler}
        />

        <FormField
          id="city"
          name="city"
          type="text"
          label="City"
          icon={FiGlobe}
          placeholder="Enter your city"
          value={profileData.city}
          onChange={changeHandler}
        />

        <FormField
          id="country"
          name="country"
          type="text"
          label="Country"
          icon={FiFlag}
          placeholder="Enter your country"
          value={profileData.country}
          onChange={changeHandler}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-myColor hover:bg-myColor">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default Profile;
