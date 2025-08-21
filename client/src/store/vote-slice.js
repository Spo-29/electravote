import{createSlice,current} from "@reduxjs/toolkit";
const currentVoter={ id: "v1",taken:"sfsdfdfsd", isAdmin: true}
const initialState={ selectedVoteCandidate:"",currentVoter,selectedElection: "",idOfElectionToUpdate: "",
    addCandidateElectionId:"" }




const voteSlice=createSlice({
    name: 'vote',
    initialState,
    reducers:{
changeSelectedVoteCandidate:(state,action)=>
{
    state.selectedVoteCandidate=action.payload;
},
changeSelectedElection:(state,action)=>
{
    state.selectedElection=action.payload;
},
changeIdOfElectionToUpdate:(state,action)=>
{
    state.idOfElectionToUpdate=action.payload;
},
changeAddCandidateElectionId:(state,action)=>
{
    state.addCandidateElectionId=action.payload;
}


    }}
) 
export const voteaction=voteSlice.actions;
export default voteSlice
