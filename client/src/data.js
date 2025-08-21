import Thumbnail1 from './assets/flag1.jpg'
import Thumbnail2 from './assets/flag2.jpg'
import Thumbnail3 from './assets/flag3.png'
import Candidate1 from './assets/candidate1.jpg'
import Candidate2 from './assets/candidate2.jpg'
import Candidate3 from './assets/candidate3.jpg'
import Candidate4 from './assets/candidate4.jpg'
import Candidate5 from './assets/candidate5.jpg'
import Candidate6 from './assets/candidate6.jpg'
import Candidate7 from './assets/candidate7.jpg'


export const elections = [
    {
        id: "e1",
        title: "Harvard Presidential Elections 2025",
        description: `Your voice shapes the future. Every vote is a step toward the change you want to see in your community.The power of choice lies in your hands.
         Exercise your right and be part of something bigger than yourself.`,
         thumbnail: Thumbnail1,
         candidates: ["c1", "c2", "c3", "c4"],
         voters: []

    },
    {
        id: "e2",
        title: "Legon SRC Presidential Elections 2025",
        description: `Democracy is not a spectator sport. Join the conversation and make your mark on history.
        Together we decide, together we build. Your participation strengthens the foundation of our democracy.`,
        thumbnail: Thumbnail2,
        candidates: ["c5","c6","c7"],
        voters: []

    },
    {
        id: "e3",
        title: "Stanford Presidential Elections 2025",
        description: `When we vote, we speak as one community with many voices, each equally important and valued.Democracy works best when everyone participates. 
        Be part of the solution, be part of the change.`,
        thumbnail: Thumbnail3,
        candidates: [],
        voters: []
        

    },
]

export const candidates = [
  {
    id: "c1",
    fullName: "Enoch Ganyo",
    image: Candidate1,
    motto: `Building bridges, not walls. Moving forward together.`,
    voteCount: 23,
    election: "e1"
  },
  {
    id: "c2",
    fullName: "John Asiama",
    image: Candidate2,
    motto: `Proven leadership for proven results.`,
    voteCount: 18,
    election: "e1"
  },
  {
    id: "c3",
    fullName: "Dora Stephenson",
    image: Candidate3,
    motto: `New generation thinking for tomorrow's challenges.`,
    voteCount: 3,
    election: "e2"
  },
  {
    id: "c4",
    fullName: "Chairman Wobetumi",
    image: Candidate4,
    motto: `Putting power back in the hands of the people.`,
    voteCount: 5,
    election: "e1"
  },
  {
    id: "c5",
    fullName: "Amankwaa Bapenyin",
    image: Candidate5,
    motto: `Dedicated leadership with unwavering commitment.`,
    voteCount: 238,
    election: "e2"
  },
  {
    id: "c6",
    fullName: "Vivian Jill",
    image: Candidate6,
    motto: `Practical solutions for real problems.`,
    voteCount: 42,
    election: "e2"
  },
  {
    id: "c7",
    fullName: "Mahamadu Bawumia",
    image: Candidate7,
    motto: `United we stand, divided we fall. Lifting each other up.`,
    voteCount: 190,
    election: "e2"
  },
]




export const voters = [
  {
    id: "v1",
    fullName: "Ernest Achiever",
    email: "achiever@gmail.com",
    password: "achiever123",
    isAdmin: true,
    votedElections: ["e2"]
  },
  {
    id: "v2",
    fullName: "Doris Lartey",
    email: "doris@gmail.com",
    password: "doris123",
    isAdmin: false,
    votedElections: ["e1", "e2"]
  },
  {
    id: "v3",
    fullName: "Daniel Vinyo",
    email: "daniel@gmail.com",
    password: "danie123",
    isAdmin: false,
    votedElections: ["e1","e2"]
  },
  {
    id: "v4",
    fullName: "Diana Ayi",
    email: "diana@gmail.com",
    password: "diana123",
    isAdmin: true,
    votedElections: []
  },
]