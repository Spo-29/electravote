import React, { use, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
//import { candidates } from '../data'
import CandidateRating from './CandidateRating'
import Loader from "../components/Loader";
import axios from 'axios'
import { useSelector } from 'react-redux'
const ResultElection = ({_id: id, thumbnail, title}) => {
    const [totalVotes, setTotalVotes] = useState(0)
    const [isLoading, setIsLoading] = useState(true); // Start with loading true
    const   [ electionCandidates, setElectionCandidates] = useState([])
    const token=useSelector(state => state?.vote?.currentVoter?.token);

   const getcandidates= async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections/${id}/candidates`, {withCredentials: true,headers: {Authorization: `Bearer ${token}`}})
      const candidates=await response.data
      setElectionCandidates(candidates)
      for (let i = 0; i < candidates.length; i++) {
        setTotalVotes(prevVotes => prevVotes + candidates[i].votes);
      }
    
    } catch (error) {
      console.log(error)
    } }

useEffect(() => {
    getcandidates()
}, [])

    // Simulate loading finished after filter
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Show loader for 500ms
        
        return () => clearTimeout(timer);
    }, []);
    return (
      <>
        {isLoading && <Loader />}
        <article className="result">
          <header className="result__header">
            <h4>{title}</h4>
            <div className="result__header-image">
              <img src={thumbnail} alt={title} />
            </div>
          </header>
          <ul className="result__list">
            {electionCandidates.map((candidate) => (
              <CandidateRating
                key={candidate.id}
                {...candidate}
                totalVotes={totalVotes}
              />
            ))}
          </ul>
          <Link to={`/elections/${id}/candidates`} className="btn primary full">
            Enter Election
          </Link>
        </article>
      </>
    );
} 

export default ResultElection 
