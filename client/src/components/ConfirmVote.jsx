import React, { useEffect, useState } from "react";
//import { candidates } from "../data";
import { useDispatch } from "react-redux";
import { UiActions } from "../store/ui-slice";
import { useSelector } from "react-redux";
import { voteaction } from "../store/vote-slice";  
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ConfirmVote = ({selectedElection}) => {
  const [modalCandidate, setModalCandidate] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // open confirm vote modal

  const closeCandidateModal = () => {
    dispatch(UiActions.closeVoteCandidateModal());
  };
  const selectedVoteCandidate = useSelector(
    (state) => state.vote.selectedVoteCandidate
  );
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const currentVoter = useSelector((state) => state?.vote?.currentVoter);

  //get the candidate selected to be voted for
  const fetchCandidate = async () => {
    try {
      console.log('Fetching candidate with ID:', selectedVoteCandidate);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Candidate data received:', response.data);
      setModalCandidate(response.data);
    } catch (error) {
      console.error('Error fetching candidate:', error);
      // Set a fallback candidate or close modal
      setModalCandidate({ 
        fullName: "Unknown Candidate", 
        motto: "No data available",
        image: null 
      });
    }
  };

  //confirm vote for selected candidates
  const confirmVote = async () => {
    try {
      console.log('Confirming vote for candidate:', selectedVoteCandidate);
      console.log('Selected election:', selectedElection);
      console.log('Current voter:', currentVoter);
      
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
        {
          currentVoterId: currentVoter.id,
          selectedElection: selectedElection
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log('Vote response:', response.data);
      const voteResult = response.data;
      
      // Update current voter with voted elections
      dispatch(voteaction.changeCurrentVoter({
        ...currentVoter, 
        votedElections: voteResult
      }));
      
      // Close modal and navigate
      dispatch(UiActions.closeVoteCandidateModal());
      navigate('/congrats');
      
    } catch (error) {
      console.error('Error confirming vote:', error);
      
      // Check if it's a duplicate vote error
      if (error.response?.status === 400) {
        alert('You have already voted in this election!');
      } else {
        alert('Failed to submit vote. Please try again.');
      }
      
      // Close modal on error
      dispatch(UiActions.closeVoteCandidateModal());
    }
  };

  /*const fetchCandidate = () => {
     const candidate = candidates.find((candidate) => candidate.id === "c1");
     if (candidate) {
       setModalCandidate(candidate);
     }
   };*/

  useEffect(() => {
    if (selectedVoteCandidate && token) {
      fetchCandidate();
    }
  }, [selectedVoteCandidate, token]);

  // Show loading state instead of returning null
  if (!modalCandidate || !modalCandidate.fullName) {
    return (
      <section className="modal">
        <div className="modal_content confirm_vote-content">
          <h5>Loading candidate...</h5>
        </div>
      </section>
    );
  }

  return (
    <section className="modal">
      <div className="modal_content confirm_vote-content">
        <h5>Please confirm your vote</h5>
        <div className="confirm__vote-image">
          <img src={modalCandidate.image || '/default-candidate.jpg'} alt={modalCandidate.fullName} />
        </div>
        <h2>
          {modalCandidate?.fullName.length > 17
            ? modalCandidate?.fullName.substring(0, 17) + "..."
            : modalCandidate?.fullName}
        </h2>
        <p>
          {modalCandidate?.motto.length > 45
            ? modalCandidate?.motto.substring(0, 45) + "..."
            : modalCandidate?.motto}
        </p>
        <div className="confirm__vote-cta">
          <button className="btn" onClick={closeCandidateModal}>
            Cancel
          </button>
          <button className ="btn primary" onClick={confirmVote}>Confirm</button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmVote;