import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = 'http://localhost:3000/';

export const getTasks = createAsyncThunk(
    "tasks / get",
    async () => {
        const data = await fetch(API_URL+"")
        return data.json()
    }
)
export const createAccount = createAsyncThunk(
    "account / create",
    async (data) => {
        console.log(data)
        await fetch("http://localhost:8000/auth/signUp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
)
export const login = createAsyncThunk(
    "account / login",
    async (data) => {
        console.log(data)
        let res = await fetch("http://localhost:8000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log(res.status)
      if (res.status!==200){
           throw new Error(res)
      }
      else{
        let resdata = await res.text()
        return resdata
      }
    }
)
const apiSlice = createSlice({
    name: "apiSlice",
    initialState: {
      tasks : [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            // state.loading =""
            // state.error = action.payload
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
           state.tasks = action.payload
        })
    }
}
);
export default apiSlice.reducer
export const { } = moviesSlice.actions