import { z } from "zod";

export const userRegisterSchema = z.object({
    fullName: z.string().min(1 , "Fullname is required"),
    email : z.string().email("Invalid email adress") ,
    password : z.string().min(6 , "Password must be 6 characters") ,
    contact: z.string().min(10 , "Contact number must be 10 digit")
})

export type registerInputState = z.infer<typeof userRegisterSchema>