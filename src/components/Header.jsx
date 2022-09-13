import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import apiSlice, { logout } from '../slices/apiSlice';

export default function Header() {
  let dispatch=useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
  console.log(state.profile)
  let goTo = useNavigate()
  return (
    <div className='header' >
      <div className='row' >
       <h1>Thullo</h1>
          {state.profile!==null?<button onClick={()=>{
          goTo("/login")
          dispatch(logout())
       }} >Logout</button>:null}
       
      </div>
      <hr />
    </div>
  )
}
