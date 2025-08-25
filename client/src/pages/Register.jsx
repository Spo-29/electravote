import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const Register = () => {
const[userData,setUserData]=useState({fullName:"",email:"",password:"",password2:""})
const [error, setError] = useState("")
const navigate = useNavigate()

const changeInputHandler=(e)=>{

    setUserData(prevState=>{
        return {...prevState,[e.target.name]:e.target.value
        }
    })
}

const registerVoter = async (e) => {
    e.preventDefault();
    try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/voters/register`,
          userData
        );
        navigate('/')

    } catch (err) {
         setError(
           err?.response?.data?.message || err?.message || "Registration failed"
         );
    }
}




console.log(userData)

    return (
       <section className="register">
        <div className="container register__container">
          <h2>Sign Up</h2>  
          <form onSubmit={registerVoter}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" name='fullName'placeholder='Full Name'onChange={changeInputHandler}autoComplete='true' autoFocus />
         <input type="email" name='email'placeholder='Email Address'onChange={changeInputHandler}autoComplete='true' />
        <input type="password" name='password'placeholder='Password'onChange={changeInputHandler}autoComplete='true' />
        <input type="password" name='password2'placeholder='Confirm Password'onChange={changeInputHandler}autoComplete='true' />
         <p>Already have an account? <Link to='/'> sign in</Link></p>
          <button type='submit' className="btn primary">Register</button>
          
          </form>
        </div>
       </section>
    )
}

export default Register