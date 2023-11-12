/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styles from "../style"
import { badges } from "../constants"

// React imports
import { useEffect, useState } from "react"

// Firebase Imports
import { firestore } from "../config/firebase-config"
import { collection, query, getDocs, getDoc, doc, updateDoc, arrayUnion, addDoc, Timestamp } from "firebase/firestore"

const Admin = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState()
  const [selectedBadgeId, setSelectedBadgeId] = useState()

  const addBadgeToUser = async () => {
    const userDoc = doc(firestore, "users", selectedUserId)
    const user = await getDoc(userDoc)
    console.log(selectedBadgeId)
    const badge = badges.find((badge) => {
      return badge.id === Number(selectedBadgeId)
    })
    console.log(badge)
    
    if(user.exists()){
      const userBadges = user.data().badges
      if(!userBadges.includes(selectedBadgeId)){
        updateUserDoc(userDoc)
          .then(() => createNewsEntry(user, badge))
      }
    } 
  }

  const updateUserDoc = async (userDoc) => {
    await updateDoc(userDoc, {
      badges: arrayUnion(Number(selectedBadgeId))
    })
  }

  const createNewsEntry = async (user, badge) => {
    const d = new Date()
    await addDoc(collection(firestore, "news"), {
      title: "Enhorabuena " + user.data().nickname + "!",
      body: user.data().nickname + " ha conseguido el logro " + badge.title + " que vale " + badge.points + " puntos.",
      image: user.data().profilePic,
      date: Timestamp.now()
    })
  }

  const fetchAll = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "users")))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc)
    })
    return docs
  }

  useEffect(() => {
    fetchAll()
      .then((docs) => setUsers(docs))
  }, [])

  return (
    <div id="adminPage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
      <div id="adminCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4`}>
        <div id="adminTitle" className={`flex bg-secondary rounded-t-md font-bold`}>
          <div className={`m-auto my-5 ml-4 text-[24px]`}>
            <h3>Admin</h3>
          </div>
        </div>
        <div className={`flex flex-col my-2`}>
          <div className={`flex flex-col`}>
            <div className={`flex ml-4 text-[24px]`}>
              <h2>Add badges to user</h2>
            </div>
            <div className={`flex flex-col mx-4 mt-4 mb-2`}>
              <p>Select User:</p>
              <select name="selectUser" className={`text-black`} onChange={(e) => setSelectedUserId(e.target.value)}>
                {users.map((user, index) => {
                  const text = user.data().nickname + " (" + user.data().email + ")";
                  return (<option value={user.id}>{text}</option>)
                })}
              </select>
            </div>
            <div className={`flex flex-col mx-4 mt-2 mb-4`}>
              <p>Select Badge:</p>
              <select name="selectBadge" className={`text-black`} onChange={(e) => setSelectedBadgeId(e.target.value)}>
                {badges.map((badge, index) => {
                  const text = badge.id + ". " + badge.title + " (" + badge.points + " points)";
                  return (<option value={badge.id}>{text}</option>)
                })}
              </select>
            </div>
            {/*<div className={`flex flex-row ${styles.flexCenter}`}>
              <div className={`flex flex-col m-auto ${styles.flexCenter}`}>
                <p>Current user points: </p>
                <p>0</p>
              </div>
              <div className={`flex flex-col m-auto ${styles.flexCenter}`}>
                <p>New user points: </p>
                <p>0</p>
              </div>
              </div>*/}
            <div className={`flex flex-row ${styles.flexCenter}`}>
              <button className="border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={addBadgeToUser}>
                Add
              </button>
            </div>
          </div>
          <div>
            <div className={`ml-4 text-[24px]`}>
              <h2>Add news</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin