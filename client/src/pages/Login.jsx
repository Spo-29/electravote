import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"; 
import { voteaction } from "../store/vote-slice"; 


const Login = () => {
const[userData,setUserData]=useState({fullName:"",email:"",password:"",password2:""})
const [error, setError] = useState("")

const dispatch = useDispatch()
const navigate = useNavigate()

const changeInputHandler=(e)=>{

    setUserData(prevState=>{
        return {...prevState,[e.target.name]:e.target.value
        }
    })
}

const loginVoter = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/voters/login`, userData)
        const newVoter = await response.data;
        // save new voter in local storage and update in redux store
        localStorage.setItem("currentUser", JSON.stringify(newVoter))
        dispatch(voteaction.changeCurrentVoter(newVoter));
        navigate("/results")

    } catch (err) {
        setError(err.response.data.message)
    }
}


    return (
       <section className="register">
        <div className="container register__container">
          <h2>Sign In</h2>  
          <form onSubmit={loginVoter}>
           {error && <p className="form__error-message">{error}</p>}
       
<input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true' autoFocus />
<input type="password" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true' />

         <p>Don't have an account? <Link to='/register'> Sign up</Link></p>
          <button type='submit' className="btn primary">Login</button>
          
          </form>
        </div>
       </section>
    )
}

export default Login