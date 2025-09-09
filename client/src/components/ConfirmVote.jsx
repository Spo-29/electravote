import React, { useEffect, useState } from "react";
import { candidates } from "../data";
import { useDispatch } from "react-redux";
import { UiActions } from "../store/ui-slice";
import { useSelector } from "react-redux";
import { voteActions } from "../store/vote-slice";  
import axios from "axios";
const ConfirmVote = () => {
  const [modalCandidate, setModalCandidate] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // open confirm vote modal

  const closeCandidateModal = () => {
    dispatch(UiActions.closeVoteCandidateModal());
  };
  const selectedVoteCandidate = useSelector(
    state => state.vote.selectedVoteCandidate)
    const token = useSelector(state => state?.vote?.currentVoter?.token)
const currentVoter = useSelector(state => state?.vote?.currentVoter)
  //get the candidate selected to be voted for
  const fetchCandidate =async () => {
   try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`, { withCredentials: true ,headers: {
      Authorization: `Bearer ${useSelector(state => state?.vote?.currentVoter?.token)}`
     }})
    setModalCandidate(await response.data);
   } catch (error) {
    console.log(error)
   }
  }
   /*const fetchCandidate = () => {
     const candidate = candidates.find((candidate) => candidate.id === "c1");
     if (candidate) {
       setModalCandidate(candidate);
     }
   };*/

    //confirm vote for selected candidate
    const confirmVote=async()=>{
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`, { withCredentials: true ,headers: {
          Authorization: `Bearer ${token}`
         }})
         const voteResult= await response.data; 
         dispatch(voteActions.changeCurrentVoter({...currentVoter,votedElections: voteResult}))
         navigate('/congrats')
        }


  useEffect(() => {
    fetchCandidate();
  }, []);

   if (!modalCandidate.image) {
     return null;
   }

  return (
    <section className="modal">
      <div className="modal_content confirm_vote-content">
        <h5>Please confirm your vote</h5>
        <div className="confirm__vote-image">
          <img src={modalCandidate.image} alt={modalCandidate.fullName} />
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
          <button className="btn primary" onClick={confirmVote}>Confirm</button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmVote;