import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

//import {elections} from '../data'
//import {candidates} from '../data'
//import { voters } from '../data'
import ElectionCandidate from '../components/ElectionCandidate'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import AddCandidateModal from '../components/AddCandidateModal'
import { useNavigate } from "react-router-dom";

const ElectionDetails = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [election, setElection] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const addCandidateModalShowing = useSelector(state => state.ui.addCandidateModalShowing)
    const token = useSelector(
       state => state?.vote?.currentVoter?.token
    )
    const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

    const getElection = async () => {
        setIsLoading(true)
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections/${id}`,
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
            setElection(response.data)

        }catch(error)
        {
            console.log(error)

        }
    }
    
    
    //open add candidate modal
    const openModal = () => {
        dispatch(UiActions.openAddCandidateModal())
    }
    const deleteElection = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/elections/${id}`,
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
            navigate('/elections')

        }catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
      getElection();
    }, []);



    return (
      <>
        <section className="electionDetails">
          <div className="container electionDetails__container">
            <h2>{election.title}</h2>
            <p>{election.description}</p>
            <div className="electionDetails__image">
              <img src={election.thumbnail} alt={election.title} />
            </div>
            <menu className="electionDetails__candidates">
              {/*electionCandidates.map((candidate) => (
                <ElectionCandidate key={candidate.id} {...candidate} />
              ))*/}
            {isAdmin &&  <button className="add_candidate-btn" onClick={openModal}>
                <IoAddOutline />
              </button>}
            </menu>

            <menu className="voters">
              <h2>Voters</h2>
              <table className="voters__table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {/*voters.map((voter) => (
                    <tr key={voter.id}>
                      <td>
                        <h5>{voter.fullName}</h5>
                      </td>
                      <td>{voter.email}</td>
                      <td>14:43:34</td>
                    </tr>
                  ))*/}
                </tbody>
              </table>
            </menu>
            {isAdmin && <button className='btn danger full' onClick={deleteElection}>Delete Election</button>}
          </div>
        </section>

        {addCandidateModalShowing && <AddCandidateModal />}
      </>
    );

    
   

    
}

export default ElectionDetails