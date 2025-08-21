//import React from 'react'
import React, { useState } from 'react'
// ...existing code...
import { elections as dummyElections } from '../data'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import { useSelector } from 'react-redux';

const Elections= () => {
  const [elections,setElections] =useState(dummyElections)

const dispatch = useDispatch()
const openModal = () => { dispatch(UiActions.openElectionModal()) }



const electionModalShowing = useSelector(state => state.ui.electionModalShowing);

    return (
        <>
       <section className ="elections">
    <div className="container elections__container">
    <header className="elections__header">
 <h1> Ongoing Elections</h1>
 <button className= "btn primary" onClick={openModal}>Create New Election</button>
 </header> 
 <menu className="elections__menu">
    {   elections.map(election => <Election key={election.id} {...election} />)
    
    }

 </menu>
    </div>

       </section>


       {electionModalShowing && <AddElectionModal/>}
       </>
    )
   }

export default Elections