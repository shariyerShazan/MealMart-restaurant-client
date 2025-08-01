import React, { useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { MdOutlinePassword } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function Login() {

    const [isVisible , setIsVisible] = useState<boolean>(false)
  return (
   <div className='w-[90%] mx-auto flex justify-center min-h-[70vh] items-center'>
     <div className='w-96 border-myColor border-1 p-5 rounded-md '>
      <form action="">
            <h2 className='text-xl font-bold text-center'>Meal<span className='text-myColor'>Mart</span> Login</h2>
           <div className=' relative my-3'>
                <div className='flex items-center gap-2'>
                 <MdOutlineEmail size={20} /><Label >Email </Label>
                </div>
                <Input 
                    className=''
                    type='email'
                    placeholder='Enter your email'
                />
                
           </div>
           <div className=' relative my-3'>
                <div className='flex items-center gap-2'><MdOutlinePassword size={20}  /><Label >Password </Label>
                </div>
                <Input 
                    className=' '
                    type={isVisible? "text" : "password"}
                    placeholder='Enter your password'
                />
                
               {isVisible?<IoMdEyeOff onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-8 mr-2' />:<IoMdEye onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-8 mr-2' /> }  
                
           </div>
      </form>
    </div>
   </div>
  )
}

export default Login
