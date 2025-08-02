import React, { useRef, useState, type FormEvent } from 'react'
import { Input } from '../components/ui/input'
// import { useNavigate } from 'react-router'
import { Button } from '../components/ui/button'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/apiEndPoint'
import { useNavigate, type NavigateFunction } from 'react-router'
import { toast } from 'react-toastify'

function VerifyEmail() {

    const navigate :  NavigateFunction = useNavigate()
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRef = useRef<HTMLInputElement[]>([])
    // const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const handleChange = (index: number, value: string) => {
        if (/^[A-Za-z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            if (value && index < 5) {
                inputRef.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text').slice(0, 6) 
        if (/^[A-Za-z0-9]+$/.test(pasteData)) {
            const newOtp = pasteData.split("")
            setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")].slice(0, 6))
            inputRef.current[Math.min(pasteData.length - 1, 5)]?.focus()
        }
    }
    const handleVerify = async (e:FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
           try {
            const verificationCode = otp.join("")
            const res = await axios.post(`${USER_API_END_POINT}/verify-email` , {verificationCode} , {withCredentials: true})
            if(res.data.success){
                navigate("/login")
                setIsLoading(false)
                toast.success(res.data.message)
            }
           } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log(error)
            setIsLoading(false)
           }
    }

    return (
        <div className='w-[90%] flex justify-center items-center min-h-[70vh]'>
            <div className='w-96 mx-auto'>
                <form onSubmit={handleVerify} action="" className='text-center border-1 border-myColor p-5 rounded-md'>
                    <h2 className='font-extrabold text-3xl '>Verify your email</h2>
                    <p className='text-sm text-gray-500 my-2'>Enter the 6 digit code sent to your email address</p>
                    <div className='flex justify-between my-5'>
                        {
                            otp.map((letter: string, index: number) => (
                                <Input
                                    key={index}
                                    className='w-10 h-10 text-center rounded-md focus:outline-none focus:ring-2'
                                    value={letter}
                                    type='text'
                                    ref={(element) => { if (element) inputRef.current[index] = element }}
                                    maxLength={1}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste} 
                                />
                            ))
                        }
                    </div>
                    {
            isLoading ? <Button disabled className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
             <Loader2 className='animate-spin' /> Please Wait
           </Button> : <Button type='submit' className='bg-myColor/90 hover:bg-myColor w-full cursor-pointer my-2'>
            Submit
           </Button>
           }
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
