import React, { useState } from 'react'
import { MdLockOutline } from 'react-icons/md'
import { Input } from '../components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '../components/ui/button'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

function ResetPassword() {
    const [newPassword , setNewPassword] = useState<string>("")
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isVisible , setIsVisible] = useState<boolean>(false)

  return (
    <div className='w-[90%] mx-auto min-h-[70vh] flex items-center'>
      <form action="" className='w-96 mx-auto border-1 border-myColor p-5 rounded-md'>
        <div className='text-center'> 
            <h2 className='font-extrabold text-3xl '>Reset Password</h2>
            <p className='text-sm text-gray-500 my-2'>Enter your new password to reset your old password</p>
        </div>
        <div className=' relative my-3'>
                        <div className='flex items-center justify-center gap-2'><MdLockOutline size={20}  /><Label >Password: </Label>
                        </div>
                        <Input 
                            className=' focus-visible:ring-1 mt-1'
                            value={newPassword}
                            name='password'
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setNewPassword(e.target.value)}}
                            type={isVisible? "text" : "password"}
                            placeholder='Enter your new password'
                        />
                        
                       {isVisible?<IoMdEyeOff onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-9 mr-2 cursor-pointer' />:<IoMdEye onClick={()=>setIsVisible(!isVisible)} size={20}  className=' absolute right-0 inset-y-9 mr-2 cursor-pointer' /> }  
                        
                   </div>
           {
            isLoading ? <Button disabled className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
             <Loader2 className='animate-spin' /> Please Wait
           </Button> : <Button type='submit' className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
            Reset
           </Button>
           }
           
           <p className='text-sm my-1 text-center'>Back to <Link to={"/login"} className='text-green-500'>Login</Link></p>
      </form>
    </div>
  )
}

export default ResetPassword
