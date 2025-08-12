import React, { useState } from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '../components/ui/button'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router'

function ForgotPassword() {
    const [email , setEmail] = useState<string>("")
    const [isLoading , setIsLoading] = useState<boolean>(false)

  return (
    <div className='w-[90%] mx-auto  min-h-[70vh] flex items-center '>
      <form action="" className='w-96 mx-auto border-1 border-myColor p-5 rounded-md'>
        <div className='text-center'> 
            <h2 className='font-extrabold text-3xl '>Forgot Password</h2>
            <p className='text-sm text-gray-500 my-2'>Enter your email adress to reset your password</p>
        </div>
        <div className=' relative my-3'>
                <div className='flex items-center gap-2 justify-center '>
                 <MdOutlineEmail size={20} /><Label >Email: </Label>
                </div>
                <Input 
                    className=' focus-visible:ring-1 mt-1'
                    value={email}
                    name='email'
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}
                    type='email'
                    placeholder='Enter your email'
                />
                
           </div>
           {
            isLoading ? <Button disabled className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
             <Loader2 className='animate-spin' /> Please Wait
           </Button> : <Button type='submit' className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
            Send Reset Link
           </Button>
           }
           
           <p className='text-sm my-1 text-center'>Back to <Link to={"/login"} className='text-green-500'>Login</Link></p>
      </form>
    </div>
  )
}

export default ForgotPassword
