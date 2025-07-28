import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Register = () => {
const[userData,setUserData]=useState({fullName:"",email:"",password:"",password2:""})

const changeInputHandler=(e)=>{

    setUserData(prevState=>{
        return {...prevState,[e.target.name]:e.target.value
        }
    })
}

console.log(userData)

    return (
       <section className="register">
        <div className="container register__container">
          <h2>Sign Up</h2>  
          <form>
           <p className="form__error-message"> Any error from the backend</p>
          <input type="text" name='fullName'placeholder='Full Name'onchange={changeInputHandler}autoComplete='true' autoFocus />
         <input type="email" name='email'placeholder='Email Address'onchange={changeInputHandler}autoComplete='true' />
        <input type="password" name='password'placeholder='Password'onchange={changeInputHandler}autoComplete='true' />
        <input type="password" name='password2'placeholder='Confirm Password'onchange={changeInputHandler}autoComplete='true' />
         <p>Already have an account? <Link to='/'> sign in</Link></p>
          <button type='submit' className="btn primary">Register</button>
          
          </form>
        </div>
       </section>
    )
}

export default Register