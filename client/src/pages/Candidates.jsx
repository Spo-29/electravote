import React, {useState, useEffect} from "react";
//import { candidates as dummyCandidates } from "../data";
import { useParams } from "react-router-dom";
import Candidate from "../components/Candidate";
import ConfirmVote from "../components/ConfirmVote";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import { set } from "mongoose";

const Candidates = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  //access control
  useEffect(() => {
    if(!token) {
      navigate('/')
    }

  }, [])
  const {id: selectedElection} = useParams()
  const [candidates, setCandidates] = useState([])
  const [canVote, setCanVote] = useState(true)

  const voteCandidateModalShowing = useSelector(
    state => state.ui.voteCandidateModalShowing
  )

  const voterId = useSelector(state => state?.vote?.currentVoter?.id)
  const votedElections = useSelector(state => state?.vote?.currentVoter?.votedElections);

   const getCandidates = async () => {
    
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,
         {
           withCredentials: true,
           headers: { Authorization: `Bearer ${token}` },
         }
       );
      setCandidates(response.data)
     } catch (error) {
       console.log(error);
     }
    
   };

   const getVoter = async () => {
     try {
       console.log('Checking if voter has already voted...');
       console.log('Voter ID:', voterId);
       console.log('Selected Election:', selectedElection);
       
       const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
        {
           withCredentials: true,
           headers: { Authorization: `Bearer ${token}`}
         }
       );
       
       const voterData = response.data;
       console.log('Voter data:', voterData);
       
       const votedElections = voterData.votedElections || [];
       console.log('Voted elections:', votedElections);
       
       // Check if current election is in voted elections
       // votedElections might be array of objects with _id or array of strings
       const hasVoted = votedElections.some(election => {
         const electionId = election._id || election;
         return electionId.toString() === selectedElection.toString();
       });
       
       console.log('Has voted:', hasVoted);
       
       if(hasVoted){
         setCanVote(false);
       }
       
     } catch (error) {
       console.error('Error checking voter status:', error);
     }
   };
   useEffect(() => {
     if (token && voterId && selectedElection) {
       getCandidates();
       getVoter();
     }
   }, [token, voterId, selectedElection]);

  
  return (
    <>
      <section className="candidates">
      {!canVote ? <header className="candidates__header">
          <h1>Already voted</h1>
          <p>You are only permitted to vote once in this election.Please vote in another election or sign out.</p> 
            </header>: <> {candidates.length > 0 ? <header className="candidates__header">
          <h1> Vote your Candidate</h1>
          <p>These are the candidates for the selected election. Please vote once
            and wisely, because you wont be allowed to be in this election
            again.</p> 
            </header>:  <header className="candidates__header">
              <h1>Inactive Election</h1>
              <p>There are no candidates found for this election. Please check
                back later. </p>
              </header>}

         
        <div className="container candidates__container">
          {candidates.map((candidate) => (
            <Candidate key={candidate._id} {...candidate} />
          ))}
        </div>
        </>}
      </section>

      {voteCandidateModalShowing && <ConfirmVote selectedElection={selectedElection} />}
    </>
  )
}

export default Candidates
