import React, { useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { MdOutlinePassword } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';

function Register() {

    const [isVisible , setIsVisible] = useState<boolean>(false)
    const [isLoading , setIsLoading] = useState<boolean>(false)

  return (
   <div className='w-[90%] mx-auto flex justify-center min-h-[70vh] items-center'>
     <div className='w-96 border-myColor border-1 p-5 rounded-md '>
      <form action="">
            <h2 className='text-xl font-bold text-center'>Meal<span className='text-myColor'>Mart</span> Register</h2>
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
           <div className=''>
             {
                isLoading? <Button className='bg-myColor/80 hover:bg-myColor w-full mt-3' >
               <Loader2 className=' animate-spin'/> Please wait
              </Button> : <Button className='bg-myColor/80 hover:bg-myColor w-full mt-3' >
                Register
              </Button>
             }  
              <p className='mt-3 pt-2 border-t-2 border-gray-300'>
                Already have account <Link className='text-green-600' to={"/login"}>Login</Link>
              </p>
           </div>
      </form>
    </div>
   </div>
  )
}

export default Register
