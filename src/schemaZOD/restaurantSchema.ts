
import {z} from "zod"

export const restaurantFromSchema = z.object({
    restaurantName : z.string().nonempty({message : "Name is required"}) ,
    city : z.string().nonempty({message: "City is required"}) ,
    country: z.string().nonempty({message: "Country is required"}) ,
    deliveryTime : z.number().min(0 , {message: "Delivery time cant be negetive"}) ,
    cuisines : z.array(z.string()) ,
    coverImage: z.instanceof(File).optional().refine((file)=> file?.size !== 0 , {message: "CoverImage is required"})
})

export type RestaurantFromSchema = z.infer<typeof restaurantFromSchema>