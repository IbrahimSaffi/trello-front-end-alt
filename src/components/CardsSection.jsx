import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { getTasks } from '../slices/apiSlice'
import {useNavigate} from 'react-router-dom';
import Card from './Card';

export default function CardsSection() {
  let dispatch = useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
  let goTo = useNavigate()
  
  useEffect(()=>{
    if(state.profile===null){
      goTo("/login")
    }
    else{
      dispatch(getTasks())
    }
  },[])
  return (
    <div className='main' >
     <div className="container">
        <div className='pending' >
          <div className='row' >
          <h1>Todo</h1>
          <button onClick={()=>goTo("/addcard")} >New Task</button>

          </div>
          <div className="cards">
            {state.pending.map((ele,i)=>{
              return <Card key={i} index ={i} type="pending" task ={ele} />
            })}
          </div>
        </div>
      <div className='progress' >
      <h1>In Progress</h1>
          <div className="cards">
          {state.progress.map((ele,i)=>{
              return <Card key={i} index ={i} type="progress" task ={ele} />
            })}
          </div>
      </div>
      <div className='completed' >
      <h1>Completed</h1>
          <div className="cards">
          {state.completed.map((ele,i)=>{
              return <Card key={i} index ={i} type="completed" task ={ele} />
            })}
          </div>
      </div>
      <div></div>
     </div>
    </div>
  )
}
