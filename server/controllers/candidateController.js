const {v4: uuid} = require("uuid");
const HttpError = require("../models/ErrorModel");
const cloudinary = require('../utils/cloudinary')
const mongoose = require("mongoose");
const path = require("path")
const ElectionModel = require('../models/electionModel')
const CandidateModel = require("../models/candidateModel");

//====================== ADD CANDIDATE
//POST : api/candidates
// PROTECTED (only admin)
const addCandidate = async (req, res, next) => {
  try{
    if(!req.user.isAdmin){
      return next(new HttpError("Only an admin can perform this action.", 403))
  } 
  const {fullname, motto, currentElection} = req.body;
  if(!fullname || !motto ) {
    return next(new HttpError("Fill all fields.", 422))
  } 
  if(!req.files.image) {
    return next(new HttpError("Choose a  image.", 422))  
  } 
  const {image} = req.files;
  //img should be less than 1 mb
  if(image.size > 1000000){
    return next(new HttpError("image Should be less than 1mb"))
  } 
  //rename the image
    let fileName = image.name;
    fileName = fileName.split(".")
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length-1]
    //upload file to uploads folder in project
  image.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
    if(err) {
      return next(new HttpError())
    }
  //store image on cloudinary
  const result = await cloudinary.uploader.upload(path.join(__dirname,"..", "uploads", fileName), {resource_type: "image"})
  if(!result.secure_url) {
    return next (new HttpError("Couldnot upload an image to cloudinary", 422))
  }
//save candidate to db
  let newCandidate = await CandidateModel.create({fullname, motto, image: result.secure_url, election: currentElection})
 //get election and push candidate to it
 let election = await ElectionModel.findById(currentElection)
 const sess= await mongoose.startSession();
sess.startTransaction()
await newCandidate.save({session: sess})
election.candidates.push(newCandidate)
await election.save({session: sess})
await sess.commitTransaction()
res.status(201).json('candidate added successfully')


}) 
 
  }
catch (error) {
    return next(new HttpError(error)) 
  }

}

//====================== GET CANDIDATE
//GET : api/candidates/:id
// PROTECTED
const getCandidate = async(req, res, next) => {
  res.json("Get Candidate")
}


//====================== DELETE CANDIDATE
//DELETE : api/candidates/:id
// PROTECTED (only admin)
const removeCandidate = async (req, res, next) => {
  res.json("Delete Candidate")
}


//====================== VOTE CANDIDATE
//PATCH : api/candidates/:id
// PROTECTED (only admin)
const voteCandidate = async (req, res, next) => {
  res.json("Vote Candidate")
}

module.exports = {addCandidate, getCandidate, removeCandidate, voteCandidate}
