

//====================== ADD NEW ELECTION
//POST: api/elections
// PROTECTED (only admin)
const addElection = (req, res, next) => {
  res.json("Add Election");
}


//====================== GET ALL ELECTIONS
//GET : api/elections
// PROTECTED 
const getElections = (req, res, next) => {
  res.json("Get all Elections");
}


//====================== GET SINGLE ELECTION
//GET : api/elections/:id
// PROTECTED 
const getElection = (req, res, next) => {
  res.json("Get single election");
}


//====================== GET ELECTION CANDIDATES
//GET : api/elections/id/candidates
// PROTECTED 
const getCandidatesOfElection = (req, res, next) => {
  res.json("Get candidates of election");
}


//====================== GET VOTERS OF ELECTION
//GET : api/elections/:id/voters
// PROTECTED 
const getElectionVoters = (req, res, next) => {
  res.json("Get election voters");
}


//====================== UPDATE ELECTION
//PATCH: api/elections/:id
// PROTECTED (only admin)
const updateElection = (req, res, next) => {
  res.json("Edit Election");
}


//====================== DELETE ELECTION
//DELETE: api/elections/:id
// PROTECTED (only admin)
const removeElection = (req, res, next) => {
  res.json("Delete Election");
}



module.exports = {addElection, getElections, getElection, updateElection, removeElection,
     getCandidatesOfElection, getElectionVoters}