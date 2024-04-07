import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token:  localStorage.getItem('token')|| "",
    r_token:localStorage.getItem('r_token') || ""
}


const userSlice = createSlice({
    name:"UserSlice",
    initialState,
    reducers:{
        storeToken:(state,actions)=>{
            state.token=actions.payload.A_token;
            state.r_token=actions.payload.R_token;
            localStorage.setItem('token',actions.payload.A_token);
            localStorage.setItem('r_token',actions.payload.R_token);
        },
        logOut:(state)=>{
            state.token="";
            state.r_token="";
            localStorage.clear();
        }
    }
});


export const userReducer = userSlice.reducer;
export const UserActions = userSlice.actions;
