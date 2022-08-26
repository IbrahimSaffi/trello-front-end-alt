import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import apiSlice, { createAccount } from '../slices/apiSlice';
import { useDispatch } from 'react-redux';

export default function SignUpPage() {
  let dispatch = useDispatch(apiSlice)
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
    passwordCheck: Yup.string().test("password-match", "Passwords must match", function (value) {
      return this.parent.password === value
    }).required('Re-enter Password'),
  });
  return (
    <div>   <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={
        values => {
          console.log("here")
          dispatch(createAccount(values))}
      }
    >
      {({ errors, touched }) => (
        <Form>
          <div>First Name</div>
          <Field name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <div>Last Name</div>
          <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <div>Enter Email</div>
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <div>Enter Password</div>
          <Field name="password" type="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <div>reenter Password</div>
          <Field name="passwordCheck" type="password" />
          {errors.passwordCheck && touched.passwordCheck ? (
            <div>{errors.passwordCheck}</div>
          ) : null}
          <button type='submit' >Create Account</button>
        </Form>
      )}
    </Formik>
    <p>
    Already have a user?
    <button>Login</button>
    </p>
    </div>

  )
}
