import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {Routes,Route,useNavigate} from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import apiSlice, { createTask, getUsers } from '../slices/apiSlice';
import { useState } from 'react';

export default function AddCard() {
  let dispatch=useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
  let member = useRef()
  let goTo = useNavigate()
  useEffect(()=>{
    dispatch(getUsers())
  },[])
  const taskScheme = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });
  return (
    <div className='add-card' >   <Formik
      initialValues={{
        title: '',
        description: '',
        label:"",
      }}
      validationSchema={taskScheme}
      //Some bug here, Will debug
      onSubmit={
        values => {
          // values.member = member.current.value
          let members = state.users.find(ele=>{
            return ele.name===member.current.value})
           values.members = members
           values.owner = state.profile
            console.log(values)
          dispatch(createTask(values))
          goTo("/")
        }
      }
    >
      {({ errors, touched }) => (
        <Form className="form" >
          <div>Title</div>
          <Field name="title" />
          {errors.title && touched.title ? (
            <div>{errors.title}</div>
          ) : null}
          <div>Description</div>
          <Field name="description" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ) : null}
            <div>Labels(seprated by spaces)</div>
            <Field name="label" />
          {errors.label && touched.label ? (
            <div>{errors.label}</div>
          ) : null}
          <div>Members</div>
          <select ref={member} name="members" id="member" multiple={true}>
            {state.users.map(ele => {
              return <option value={ele.name}>{ele.name}</option>
              
            })} 
          </select>
            <button type='submit' onClick={() => console.log("clicked")}>Add Task</button>
        </Form>
      )}
    </Formik>
    </div>

  )
}
