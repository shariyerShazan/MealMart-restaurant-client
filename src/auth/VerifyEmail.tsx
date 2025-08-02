import React, { useRef, useState } from 'react'
import { Input } from '../components/ui/input'
import { useNavigate } from 'react-router'

function VerifyEmail() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRef = useRef<HTMLInputElement[]>([])
    const navigate = useNavigate()

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

    return (
        <div className='w-[90%] flex justify-center items-center min-h-[70vh]'>
            <div className='w-96 mx-auto'>
                <form action="" className='text-center border-1 border-myColor p-5 rounded-md'>
                    <h2 className='font-extrabold text-3xl '>Verify your email</h2>
                    <p className='text-sm text-gray-500 my-2'>Enter the 6 digit code sent to your email address</p>
                    <div className='flex justify-between'>
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
                                />
                            ))
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
