import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { candidates } from '../data'
import CandidateRating from './CandidateRating'
import Loader from "../components/Loader";

const ResultElection = ({_id: id, thumbnail, title}) => {
    const [totalVotes, setTotalVotes] = useState(521)
    const [isLoading, setIsLoading] = useState(true); // Start with loading true

    // get candidates that belong to this election iteration
    const electionCandidates = candidates.filter(candidate =>
    {
        return candidate.election == id
    })

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
