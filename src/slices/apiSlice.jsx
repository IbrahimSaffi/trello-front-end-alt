import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
const API_URL = 'http://localhost:8000/';

export const getTasks = createAsyncThunk(
    "tasks / get",
    async (data ,{getState}) => {
        let state= getState()
        const res = await fetch(API_URL + "tasks",{
           method:"GET",
            headers:{
                Authorization:"Bearer " + state.apiSlice.accessToken,
            },
        })
        if (res.status!==200){
            let e = await res.json()
            throw new Error(e)
       }
       else{
         let resdata = await res.json()
         return resdata.data
       }
    }
)
export const updateTask = createAsyncThunk(
    "tasks / update",
    async (data ,{getState}) => {
        let state= getState()
        console.log(state.apiSlice.typeLocBePlaced)
        const res = await fetch(API_URL + `tasks/update/${state.apiSlice[state.apiSlice.typeToBePlaced][state.apiSlice.itemToBePlaced]._id}`,{
           method:"POST",
            headers:{
                Authorization:"Bearer " + state.apiSlice.accessToken,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({status:state.apiSlice.typeLocBePlaced}),
        })
        if (res.status!==200){
            let e = await res.json()
            throw new Error(e)
       }
       else{
         let resdata = await res.json()
         return resdata.data
       }
    }
)
export const getUsers = createAsyncThunk(
    "tasks / getUsers",
    async (data ,{getState}) => {
        let state= getState()
        const res = await fetch(API_URL + "tasks/get-all-user",{
           method:"GET",
            headers:{
                Authorization:"Bearer " + state.apiSlice.accessToken,
            },
        })
        if (res.status!==200){
            let e = await res.json()
            throw new Error(e)
       }
       else{
         let resdata = await res.json()
         return resdata.data
       }
    }
)
export const createTask = createAsyncThunk(
    "tasks / create",
    async (data,{getState}) => {
        console.log(data)
        let state= getState()

       let res= await fetch(API_URL + "tasks/add", {
            method: 'POST',
            headers:{
                Authorization:"Bearer " + state.apiSlice.accessToken,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        })
        if (res.status!==200){
            let e = await res.json()
            throw new Error(e.error)
       }
       else{
         let resdata = await res.json()
         return resdata
       }
    }
)

export const createAccount = createAsyncThunk(
    "account / create",
    async (data) => {
        let res = await fetch(API_URL + "auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            let resdata = await res.text()
            return resdata
        }
    }

)
export const login = createAsyncThunk(
    "account / login",
    async (data) => {
        console.log(data)
        let res = await fetch(API_URL + "auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log(res.status)
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            let resdata = await res.json()
            return resdata.data
        }
    }
)
const apiSlice = createSlice({
    name: "apiSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        error: null,
        loading: false,
        profile: JSON.parse(localStorage.getItem('PROFILE')),
        users:[],
        pending:[],
        progress:[],
        completed:[],
        itemToBePlaced:null,
        locToBePlaced:null,
        typeToBePlaced:null,
        typeLocBePlaced:null
    },
    reducers: {
        dragStart: (state, action) => {
            state.itemToBePlaced = action.payload.i
            state.typeToBePlaced = action.payload.type
          },
          dragOver: (state, action) => {
            state.locToBePlaced = action.payload.i
            state.typeLocBePlaced = action.payload.type

          },
          drop: (state, action) => {
            let task = state[state.typeToBePlaced].splice(state.itemToBePlaced, 1)
            state[state.typeLocBePlaced].splice(state.locToBePlaced, 0, task[0])
            state.itemToBePlaced = null
            state.locToBePlaced = null
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.pending=[]
            state.progress=[]
            state.completed=[]
            action.payload.forEach(ele=>{
                if(ele.status==="pending"){
                    state.pending.push(ele)
                }
                else if(ele.status==="progress"){
                  state.progress.push(ele)
                }
                else{
                    state.completed.push(ele)
                }
            })
            // console.log(current(state.pending))
        })
        builder.addCase(createTask.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(createTask.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
            console.log(state.error)
        })
        builder.addCase(login.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(login.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.error=null
            state.profile = action.payload.profile
            console.log(action.payload)
            localStorage.setItem('ACCESS_TOKEN', action.payload.accessToken);
             localStorage.setItem('REFRESH_TOKEN', action.payload.refreshToken);
             localStorage.setItem('PROFILE', JSON.stringify(action.payload.profile));
        })
        builder.addCase(createAccount.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(createAccount.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
        }) 
        builder.addCase(createAccount.fulfilled, (state, action) => {
            // state.loading =""
            state.error = null
        })
        builder.addCase(getUsers.pending, (state, action) => {
            //  state.loading = "pending"
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            // state.loading =""
            state.error = action.error.message
        }) 
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users=action.payload
            state.error = null
        })
    }
}
);
export default apiSlice.reducer
export const {dragStart,dragOver,drop } = apiSlice.actions