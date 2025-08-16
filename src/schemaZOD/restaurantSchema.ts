
import {z} from "zod"

export const restaurantFormSchema = z.object({
    restaurantName : z.string().nonempty({message : "Name is required"}) ,
    city : z.string().nonempty({message: "City is required"}) ,
    country: z.string().nonempty({message: "Country is required"}) ,
    deliveryTime : z.string().nonempty({message: "Delivery time is required"}) ,
    cuisines : z.array(z.string()) ,
})

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>