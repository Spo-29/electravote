//====================== ADD CANDIDATE
//POST : api/candidates
// PROTECTED (only admin)
const addCandidate = (req, res, next) => {
  res.json("Add Candidate")
}


//====================== GET CANDIDATE
//GET : api/candidates/:id
// PROTECTED
const getCandidate = (req, res, next) => {
  res.json("Get Candidate")
}


//====================== DELETE CANDIDATE
//DELETE : api/candidates/:id
// PROTECTED (only admin)
const removeCandidate = (req, res, next) => {
  res.json("Delete Candidate")
}


//====================== VOTE CANDIDATE
//PATCH : api/candidates/:id
// PROTECTED (only admin)
const voteCandidate = (req, res, next) => {
  res.json("Vote Candidate")
}

module.exports = {addCandidate, getCandidate, removeCandidate, voteCandidate}
