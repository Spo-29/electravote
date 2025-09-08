
import { IoMdClose } from 'react-icons/io'
import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice';
//import { addCandidate } from '../../../server/controllers/candidateController';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { voteaction } from '../store/vote-slice';



const AddCandidateModal = () => {

        const[fullName,setFullName] = useState("")
        const[motto,setMotto] = useState("")
        const[image,setImage] = useState("")

        const dispatch = useDispatch()
        const navigate = useNavigate()
// close add candidate modal
const closeModal = () => {
    dispatch(UiActions.closeAddCandidateModal())
} 
const token = useSelector(state => state?.vote?.currentVoter?.token)
const electionid = useSelector(state => state?.vote?.addCandidateElectionId)   

 const addCandidate = async (e) => {
    try{
    e.preventDefault()
    const candidateData = new FormData()
    candidateData.set("fullName", fullName)
    candidateData.set("motto", motto)
    candidateData.set("image", image)
    candidateData.set("currentElection", electionid)
    await axios.post(`${process.env.REACT_APP_API_URL}/candidates`, candidateData, {withCredentials: true,
    headers: {Authorization: `Bearer ${token}`}})
    navigate(0)
    }catch(error){
        console.log(error)
    }
 }

  return (
    <section className="modal">
        <div className="modal__content">
    <header className="modal__header">
            <h4>Add Candidate</h4>
            <button className="modal__close" onClick={closeModal}><IoMdClose/></button>
    </header>
    <form onSubmit={addCandidate}>
        <div>
            <h6>
                Candidate Name:
            </h6>
            <input type="text" value={fullName} name='fullName' onChange={e =>setFullName(e.target.value)}/>
        </div>
        <div>
            <h6>
                Candidate Motto:
            </h6>
            <input type="text" value={motto} name='motto' onChange={e =>setMotto(e.target.value)}/>
        </div>
        <div>
            <h6>
                Candidate Image:
            </h6>
            <input type="file" name='image' onChange={e =>setImage(e.target.files[0])} accept="png,jpg,jpeg,webp,avif"/>
        </div>
        <button type="submit" className="btn primary">Add Candidate</button>
    </form>
        </div>
    </section>
  )
}

export default AddCandidateModal