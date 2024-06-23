/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styles from "../style"
import { badges, categories, events } from "../constants"

// React imports
import { useEffect, useState } from "react"

// Firebase Imports
import { auth, firestore } from "../config/firebase-config"
import { collection, query, getDocs, getDoc, doc, updateDoc, arrayUnion, addDoc, Timestamp, increment } from "firebase/firestore"

// Security
import { useNavigate } from "react-router-dom"

const Admin = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState()
  const [selectedBadgeId, setSelectedBadgeId] = useState()
  const [userHasBadge, setUserHasBadge] = useState(false)
  const [badgeAdded, setBadgeAdded] = useState(false)
  const [newsPosted, setNewsPosted] = useState(false)

  const [newsTitle, setNewsTitle] = useState("")
  const [newsBody, setNewsBody] = useState("")

  const navigate = useNavigate()
  const navBadges = () => navigate("/badges")

  const addBadgeToUser = async () => {
    const userDoc = doc(firestore, "users", selectedUserId)
    const user = await getDoc(userDoc)
    const badge = badges.find((badge) => {
      return badge.id === selectedBadgeId
    })

    if (user.exists()) {
      const userBadges = user.data().badges
      const userHasBadge = userBadges.includes(selectedBadgeId)
      if (userHasBadge) {
        setUserHasBadge(true)
      } else {
        updateUserDoc(userDoc, badge)
          .then(() => createNewsEntryForBadges(user, badge).then(() => setBadgeAdded(true)))
      }
    }
  }

  const updateUserDoc = async (userDoc, badge) => {
    await updateDoc(userDoc, {
      badges: arrayUnion(selectedBadgeId),
      points: increment(Number(badge.points))
    })
  }

  const createNewsEntry = async () => {
    await addDoc(collection(firestore, "news"), {
      title: newsTitle,
      body: newsBody,
      image: "https://firebasestorage.googleapis.com/v0/b/tag1-1056a.appspot.com/o/news_alert.png?alt=media&token=e8d57906-3284-4778-b551-5f255bdf1d3a",
      date: Timestamp.now(),
      userAssociated: ""
    }).then(() => setNewsPosted(true))
  }

  const createNewsEntryForBadges = async (user, badge) => {
    await addDoc(collection(firestore, "news"), {
      title: "¡Enhorabuena " + user.data().nickname + "!",
      body: user.data().nickname + " ha conseguido la chapa \"" + badge.title + "\" que vale " + badge.points + " ANTX Coins.",
      image: user.data().profilePic,
      date: Timestamp.now(),
      userAssociated: user.data().id
    })
  }

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "users")))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc)
    })
    return docs
  }

  const checkAdmin = async () => {
    console.log("Admin!")
    const currentUser = await getDoc(doc(firestore, "users", auth.currentUser.uid))

    if (currentUser.data().admin === false) {
      navBadges()
    }
  }

  useEffect(() => {
    fetchUsers()
      .then((users) => setUsers(users))

    auth.onAuthStateChanged(function () {
      checkAdmin()
    })
  }, [])

  return (
    <div id="adminPage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
      <div id="adminCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4`}>
        <div id="adminTitle" className={`flex bg-secondary rounded-t-md font-bold`}>
          <div className={`m-auto my-5 ml-4 text-[24px]`}>
            <h3>Admin</h3>
          </div>
        </div>
        <div className={`flex flex-col my-6`}>
          <div className={`flex flex-col`}>
            <div className={`flex ml-4 text-[32px]`}>
              <h2>Add badges to user</h2>
            </div>
            {userHasBadge ? (
              <div className={`flex ml-4 text-[24px] ${styles.flexCenter} my-4 text-[#e03f3f]`}>
                <p>This user already has this badge.</p>
              </div>
            ) : (
              <div></div>
            )}

            {badgeAdded ? (
              <div className={`flex ml-4 text-[24px] ${styles.flexCenter} my-4 text-secondary`}>
                <p>Badge added to user.</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className={`flex flex-col mx-4 mb-2`}>
              <p>Select User:</p>
              <select name="selectUser" className={`text-black`}
                onChange={(e) => {
                  setUserHasBadge(false)
                  setBadgeAdded(false)
                  if (e.target.value !== "noUser") {
                    setSelectedUserId(e.target.value)
                  }
                }}>
                <option value="noUser">Select a user...</option>
                {users.filter((doc) => !doc.data().hidden)
                  .sort((user1, user2) => {
                    if(user1.data().points > user2.data().points) return -1
                    if(user1.data().points < user2.data().points) return 1
                    return 0
                  })
                  .map((user, index) => {
                    const text = user.data().nickname + " (" + user.data().email + ")";
                    return (<option value={user.data().id}>{text}</option>)
                  }
                )}
                {users.filter((doc) => doc.data().hidden)
                  .sort((user1, user2) => {
                    if(user1.data().points > user2.data().points) return -1
                    if(user1.data().points < user2.data().points) return 1
                    return 0
                  })
                  .map((user, index) => {
                    const text = user.data().nickname + " (" + user.data().email + ")";
                    return (<option disabled value={user.data().id}>{text}</option>)
                  }
                )}
              </select>
            </div>
            <div className={`flex flex-col mx-4 mt-2 mb-4`}>
              <p>Select Badge:</p>
              <select name="selectBadge" className={`text-black`}
                onChange={(e) => {
                  setUserHasBadge(false)
                  setBadgeAdded(false)
                  if (e.target.value !== "noBadge") {
                    setSelectedBadgeId(e.target.value)
                  }
                }}>
                <option value="noBadge">Select a badge...</option>
                {categories.map((category, index) => {
                  return (
                    <optgroup label={category.title}>
                      {badges.filter((badge) => badge.group === category.category)
                        .map((badge, index) => {
                          const text = badge.id + ". " + badge.title + " (" + badge.points + " points)";
                          return (<option value={badge.id}>{text}</option>)
                        })}
                    </optgroup>
                  )
                })}
                {events.map((event, index) => {
                    return (
                      <optgroup label={event.title}>
                        {badges.filter((badge) => badge.group === event.category)
                        .map((badge, index) => {
                          const text = badge.id + ". " + badge.title + " (" + badge.points + " points)";
                          return (<option value={badge.id}>{text}</option>)
                        })}
                      </optgroup>
                    )
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
            <div className={`ml-4 text-[32px]`}>
              <h2>Add news</h2>
            </div>
            {newsPosted ? (
              <div className={`flex ml-4 text-[24px] ${styles.flexCenter} my-4 text-secondary`}>
                <p>News posted.</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className={`flex flex-col mx-4 mt-4 mb-2`}>
              <p>Title:</p>
              <input className="text-black text-[16px] p-2" id="nickname" type="text" placeholder="Title"
                onChange={(e) => {
                  setNewsTitle(e.target.value)
                  setNewsPosted(false)
                }} />
            </div>
            <div className={`flex flex-col mx-4 mt-2 mb-4`}>
              <p>Body:</p>
              <textarea className="text-black text-[16px] p-2" id="nickname" type="text" placeholder="Body"
                onChange={(e) => {
                  setNewsBody(e.target.value)
                  setNewsPosted(false)
                }} />
            </div>
            <div className={`flex flex-row ${styles.flexCenter}`}>
              <button className="border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={createNewsEntry}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin