import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { FiPlus } from 'react-icons/fi'

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
         <div>
              <Avatar className="cursor-pointer w-32 h-32 relative group"> 
                  <AvatarImage className=' ' src="https://github.com/shadcn.png" />
                  <AvatarFallback >CN</AvatarFallback>
                  <input ref={imageRef} type="file" className='hidden' accept='image/*' />
                  <div onClick={()=>{imageRef?.current?.click()}} className=' absolute bg-gray-500 w-full h-full opacity-0 group-hover:opacity-25'>
                    <FiPlus className='absolute opacity-0 group-hover:opacity-25' size={25}/>
                  </div>
                </Avatar>
                
               
         </div>
                
    </div>
  )
}

export default Profile
