import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {Routes,Route,useNavigate} from 'react-router-dom';

import apiSlice, { login } from '../slices/apiSlice';

export default function LoginPage() {
  let dispatch = useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
     let goTo = useNavigate()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
});
  return (
    <div className='login' > <Formik
    initialValues={{
        email: '',
        password: '',
    }}
    validationSchema={LoginSchema}
    onSubmit={
        values=>
        {
          try{
            dispatch(login(values))
              goTo("/")   
          }
          catch(err){
             console.log(err)
          }
        }
            }
            >
    {({ errors, touched }) => (
        <Form className='form' >
            <div>Enter Email</div>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <div>Enter Password</div>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
                <div>{errors.password}</div>
                ) : null}
            <button type='submit' >Login</button>
        </Form>
    )}
</Formik>
<p>No Account? <button onClick={()=>goTo("/signup")} >Create Account</button></p>
</div>
  )
}
