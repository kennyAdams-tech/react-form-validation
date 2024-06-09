import React from 'react'
import './App.css'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const App = () => {
  
  const onSubmit = (data) => {
    console.log('hello', data)

    window.location.reload()
    alert('Form Has been submitted!!!')
    
  }

  const schema = yup.object({
    fullName: yup.string().required('Full Name is required').min(4, 'Not less than 4 characters'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Enter a valid email').required('Username is required'),
    password: yup.string().min(4, 'Not less than 4 characters').max(15, 'Not greater than 15 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), 'password does not match']).required('Confirm password is required'),
    checkbox: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions')
  })

  const {handleSubmit, register, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })
  console.log(errors)


  return (
    <div>
      <h2 className='heading'>React Form Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Register</h3>
        
        <div className='full-name'>
          <label>Full Name</label> <br />
          <input type="text"  {...register('fullName')}/>
          <div className="error">{errors.fullName?errors.fullName.message: ''}</div>
         {errors.fullName ?  <IoMdInformationCircleOutline className='err'/> : ''}
        </div>
        <div className='username'>
          <label>Username</label> <br />
          <input type="text" {...register('username')}/>
          <div className="error">{errors.username?errors.username.message: ''}</div>
         {errors.username ?  <IoMdInformationCircleOutline className='err'/> : ''}
        </div>
        <div className='email'>
          <label>Email</label> <br />
          <input type="email" {...register('email')}/>
          <div className="error">{errors.email?errors.email.message: ''}</div>
          {errors.email ?  <IoMdInformationCircleOutline className='err'/> : ''}
        </div>
        <div className='password'>
          <label>Password</label> <br />
          <input type="password" {...register('password')}/>
          <div className="error">{errors.password?errors.password.message: ''}</div>
          {errors.password ?  <IoMdInformationCircleOutline className='err'/> : ''}
        </div>
        <div className='confirm-password'>
           <label>Confirm Password</label> <br />
          <input type="password" {...register('confirmPassword')}/>
          <div className="error">{errors.confirmPassword?errors.confirmPassword.message: ''}</div>
          {errors.confirmPassword ?  <IoMdInformationCircleOutline className='err'/> : ''}
        </div>
        <div className='checkbox'>
           <input type="checkbox" {...register('checkbox')}/>
           I have read and agree to the Terms and Conditions
           <div className="error">{errors.checkbox?errors.checkbox.message: ''}</div>
          
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App