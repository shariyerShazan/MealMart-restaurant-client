import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user" ,
    initialState : {
        user: null,
        // allCuisines: ["indian"] ,
    } ,
    reducers: {
        setUser: (state , action)=>{
            state.user = action.payload
        },
        // setAllCuisines: (state , action)=>{
        //     state.allCuisines = action.payload
        // }
    }
})


export const {setUser ,
    //  setAllCuisines
    }= userSlice.actions
export default userSlice.reducer