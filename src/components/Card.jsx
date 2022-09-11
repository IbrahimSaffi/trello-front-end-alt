import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { dragOver, dragStart, drop, updateTask } from '../slices/apiSlice'

export default function Card(props) {
  let dispatch = useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
  return (
    <div   style={
      {
        display: `${state.itemToBePlaced === props.index&&state.typeToBePlaced===props.type ? "none" : "flex"}`,
        filter: `${state.locToBePlaced === props.index&&state.typeLocToBePlaced===props.type ? "brightness(50%)" : "brightness(100%)"}`
      }
    }
    onDrag={() => {
      console.log(props.index,props.type)
      dispatch(dragStart({i:props.index,type:props.type}))
    }}
    onDragOver={(e) => {
      e.stopPropagation();
      e.preventDefault()
      console.log(props.index,props.type)
      dispatch(dragOver({i:props.index,type:props.type}))
    }}
    onDragEnd={() => {
      dispatch(updateTask())
      console.log("drop")
      dispatch(drop())
    }}
    className='card' >
   <img src="" alt="" />
   <h1>{props.task.title}</h1>
   <p>{props.task.description}</p>
   <div className="labels">
    {props.task.labels.split(" ").map((ele,i)=>{
     return <p key ={i}style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`}} >{ele}</p>
    })}
    
   </div>
   <div className='members' >
    {props.task.members.map((ele,i)=>{
      return <p>{ele.name}</p>
    })}
   </div>
    </div>
  )
}
