//import React from 'react'
import React, { useState, useEffect } from 'react'
// ...existing code...
//import { elections as dummyElections } from '../data'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import { useSelector } from 'react-redux';
import UpdateElectionModal from '../components/UpdateElectionModal';
import Loader from "../components/Loader";

import axios from 'axios'

const Elections= () => {
  const [elections,setElections] =useState([])
  const[isLoading, setIsLoading] = useState(false)

const dispatch = useDispatch()
const openModal = () => { dispatch(UiActions.openElectionModal()) }

const closeUpdateModal = () => {
    dispatch(UiActions.closeUpdateElectionModal());
  };
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const isAdmin = useSelector(state => state?.vote?.currentVoter.isAdmin)

const electionModalShowing = useSelector(state => state.ui.electionModalShowing);
const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing);
const getElections = async () => {
   setIsLoading(true)
   try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`, {withCredentials: true,
         headers: {Authorization: `Bearer ${token}`}
      })
      setElections(response.data)

   }catch (error)
   {
      console.log(error)
   }
   setIsLoading(false)
}

useEffect(() => {
   getElections()
}, [])

    return (
        <>
       <section className ="elections">
    <div className="container elections__container">
    <header className="elections__header">
 <h1> Ongoing Elections</h1>
{isAdmin && <button className= "btn primary" onClick={openModal}>Create New Election</button>}
 </header> 
 {isLoading ? <Loader />: <menu className="elections__menu">
    {   elections.map(election => <Election key={election._id} {...election} />)
    
    }

 </menu>}
    </div>

       </section>


       {electionModalShowing && <AddElectionModal/>}
       {updateElectionModalShowing && <UpdateElectionModal closeModal={closeUpdateModal} />}

       </>
    )
   }

export default Elections