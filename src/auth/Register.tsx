import  { useState, type ChangeEvent, type FormEvent } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from '../components/ui/button';
import { Link, useNavigate, type NavigateFunction } from 'react-router';
import { Loader2 } from 'lucide-react';
import { FiUser } from "react-icons/fi";
import { MdAddIcCall } from "react-icons/md";
import { userRegisterSchema, type registerInputState } from '../schemaZOD/userSchem';
import { MdLockOutline } from "react-icons/md";
import axios from "axios"
import { USER_API_END_POINT } from '../utils/apiEndPoint';
import { toast } from 'react-toastify';

function Register() {


    const navigate : NavigateFunction = useNavigate()

    const [isVisible , setIsVisible] = useState<boolean>(false)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [input , setInput] = useState<registerInputState >({
        fullName: "",
        email: "" ,
        password: "" ,
        contact: ""
    })
    const [error , setError] = useState<Partial<registerInputState>>({})
   
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>)=>{
       const {name , value} = e.target
       setInput({...input , [name]: value})
    }

    const registerSubmitHandler = async (e: FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        const result = userRegisterSchema.safeParse(input)
        if(!result.success){
            setError(result.error.flatten().fieldErrors as Partial<registerInputState>)
            setIsLoading(false)
            return;
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register` , input , {withCredentials: true})
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/verify-email")
                setIsLoading(false)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log(error)
            setIsLoading(false)
        }finally{
            setIsLoading(false)
        }
       
    }

  return (
   <div className='w-[90%] mx-auto flex justify-center min-h-[70vh] items-center mt-12'>
     <div className='w-96 border-myColor border-1 p-5 rounded-md '>
      <form onSubmit={registerSubmitHandler} action="">
            <h2 className='text-xl font-bold text-center'>Meal<span className='text-myColor'>Mart</span> Register</h2>
           
            <div className=' relative my-3'>
                <div className='flex items-center gap-2'>
                 <FiUser size={20} /><Label >Full Name: </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1 mt-1'
                    value={input.fullName}
                    name='fullName'
                    onChange={changeEventHandler}
                    type='text'
                    // placeholder='Enter your name '
                />
                
           </div>
        {error && <span className='text-sm text-red-500'>{error.fullName}</span>}

           <div className=' relative my-3'>
                <div className='flex items-center gap-2'>
                 <MdAddIcCall size={20} /><Label >Contact no: </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1 mt-1'
                    value={input.contact}
                    name='contact'
                    onChange={changeEventHandler}
                    type='number'
                    // placeholder='Enter your contact no'
                />
                
           </div>
           {error && <span className='text-sm text-red-500'>{error.contact}</span>}

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
              Register
              </Button>
             }  
              <p className='mt-3 pt-2 border-t-2 border-gray-300'>
                Already have account? <Link className='text-green-600' to={"/login"}>Login</Link>
              </p>
           </div>
      </form>
      <Link to={"/"}><Button className='bg-green-500 hover:bg-green-500 cursor-pointer mt-5'>Back Home</Button></Link>
    </div>
   </div>
  )
}

export default Register
