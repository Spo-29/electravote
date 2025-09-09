import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { voteaction } from '../store/vote-slice'
import { useNavigate } from 'react-router-dom'

const Logout= () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(voteaction.changeCurrentVoter(null))
        localStorage.removeItem("currentUser")
        navigate('/')
    }

    )
    return (
        <></>
    )
}

export default Logout