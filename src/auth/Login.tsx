import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
// import { MdOutlinePassword } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import { userLoginSchema, type loginInputState } from '../schemaZOD/userSchem';
// import { CiLock } from "react-icons/ci";

function Login() {

    const [isVisible , setIsVisible] = useState<boolean>(false)
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const [input , setInput] = useState<loginInputState >({
        email: "" ,
        password: ""
    })
   
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>)=>{
       const {name , value} = e.target
       setInput({...input , [name]: value})
    }
     const [error , setError] = useState<Partial<loginInputState>>({})

    const loginSubmitHandler = async (e: FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        const result = userLoginSchema.safeParse(input)
                if(!result.success){
                    setError(result.error.flatten().fieldErrors as Partial<loginInputState>)
                    return;
                }
        try {
            // api
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
       
    }

  return (
   <div className='w-[90%] mx-auto flex justify-center min-h-[70vh] items-center mt-12'>
     <div className='w-96 border-myColor border-1 p-5 rounded-md '>
      <form onSubmit={loginSubmitHandler} action="">
            <h2 className='text-xl font-bold text-center'>Meal<span className='text-myColor'>Mart</span> Login</h2>
           <div className=' relative my-3'>
                <div className='flex items-center gap-2'>
                 <MdOutlineEmail size={20} /><Label >Email: </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1 mt-1'
                    value={input.email}
                    name='email'
                    onChange={changeEventHandler}
                    type='email'
                    // placeholder='Enter your email'
                />
                
           </div>
           {error && <span className='text-sm text-red-500'>{error.email}</span>}

           <div className=' relative my-3'>
                <div className='flex items-center gap-2'><MdLockOutline size={20}  /><Label >Password: </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1 mt-1'
                    value={input.password}
                    name='password'
                    onChange={changeEventHandler}
                    type={isVisible? "text" : "password"}
                    // placeholder='Enter your password'
                />
                
               {isVisible?<IoMdEyeOff onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-9 mr-2 cursor-pointer' />:<IoMdEye onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-9 mr-2 cursor-pointer' /> }  
                
           </div>
           {error && <span className='text-sm text-red-500'>{error.password}</span>}

           <div className=''>
             {
                isLoading? <Button disabled className='bg-myColor/80 hover:bg-myColor w-full mt-3' >
               <Loader2 className=' animate-spin'/> Please wait
              </Button> : <Button type='submit' className='bg-myColor/90 hover:bg-myColor w-full mt-3 cursor-pointer' >
                Login
              </Button>
             }  
            <div className='text-center my-2 underline hover:text-green-500'>
            <Link  to={"/forgot-password"}>
             Forgot password
             </Link>
            </div>
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
