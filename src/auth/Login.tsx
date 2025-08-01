import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { MdOutlinePassword } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';

function Login() {

    const [isVisible , setIsVisible] = useState<boolean>(false)
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const [input , setInput] = useState({
        email: "" ,
        password: ""
    })
   
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>)=>{
       const {name , value} = e.target
       setInput({...input , [name]: value})
    }

    const loginSubmitHandler = async (e: FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = ""
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
       
    }

  return (
   <div className='w-[90%] mx-auto flex justify-center min-h-[70vh] items-center'>
     <div className='w-96 border-myColor border-1 p-5 rounded-md '>
      <form onSubmit={loginSubmitHandler} action="">
            <h2 className='text-xl font-bold text-center'>Meal<span className='text-myColor'>Mart</span> Login</h2>
           <div className=' relative my-3'>
                <div className='flex items-center gap-2'>
                 <MdOutlineEmail size={20} /><Label >Email </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1'
                    value={input.email}
                    name='email'
                    onChange={changeEventHandler}
                    type='email'
                    placeholder='Enter your email'
                />
                
           </div>
           <div className=' relative my-3'>
                <div className='flex items-center gap-2'><MdOutlinePassword size={20}  /><Label >Password </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1'
                    value={input.password}
                    name='password'
                    onChange={changeEventHandler}
                    type={isVisible? "text" : "password"}
                    placeholder='Enter your password'
                />
                
               {isVisible?<IoMdEyeOff onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-8 mr-2' />:<IoMdEye onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-8 mr-2' /> }  
                
           </div>
           <div className=''>
             {
                isLoading? <Button className='bg-myColor/80 hover:bg-myColor w-full mt-3' >
               <Loader2 className=' animate-spin'/> Please wait
              </Button> : <Button type='submit' className='bg-myColor/80 hover:bg-myColor w-full mt-3' >
                Login
              </Button>
             }  
              <p className='mt-3 pt-2 border-t-2 border-gray-300'>
                Don't have account? <Link className='text-green-600' to={"/register"}>Register</Link>
              </p>
           </div>
      </form>
       <Link to={"/"}><Button className='bg-green-500 hover:bg-green-500 cursor-pointer mt-5'>Back Home</Button></Link>
    </div>
   </div>
  )
}

export default Login
