/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"

// React imports
import { useEffect, useState } from "react"

// FontAwesome imports
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

// Component Imports
import { Stats, BadgeCardGrid, BadgeCardList, EventActiveCardGrid, EventInactiveCardGrid } from "./"

// Emoji imports
import { Emoji } from "@crispengari/react-emojify"

// Constant imports
import { categories, events } from "../constants"

const Badges = () => {
  // This useState determines wether to display the badges as a grid (false) or a list (true)
  const [list, setList] = useState(false)
  const [userData, setUserData] = useState()
  const [userBadges, setUserBadges] = useState([])
  const [badgesSet, setBadgesSet] = useState(false)

  const getUserData = async () => {
    const currentUser = await getDoc(doc(firestore, "users", auth.currentUser.uid))
    return currentUser.data()
  }

  useEffect(() => {
    auth.onAuthStateChanged(function () {
      getUserData()
        .then((userData) => {
          setUserData(userData)
          setUserBadges(userData.badges)
        })
        .then(() => setBadgesSet(true))
    })

  }, [])

  return (
    <>
      {badgesSet ? (
        <div id="badgesPage" className={`flex flex-col ${styles.flexCenter} min-w-[90%] pb-8 text-white font-poppins font-bold`}>
          
          <Stats userBadges={userBadges} />

          <div className="inline-flex my-4 border border-secondary rounded-lg">
            <button onClick={() => setList(false)} className={`flex flex-row ${list ? "" : "bg-secondary"} hover:bg-altSecondary py-2 px-4 rounded-l gap-2`}>
              <p>Grid</p>
              <FontAwesomeIcon icon={faBorderAll} className={`m-auto`} />
            </button>
            <button onClick={() => setList(true)} className={`flex flex-row ${list ? "bg-secondary" : ""} hover:bg-altSecondary py-2 px-4 rounded-r gap-2`}>
              <p>List</p>
              <FontAwesomeIcon icon={faList} className={`m-auto`} />
            </button>
          </div>

          {list ? (
            <div id="badgesCards" className={`flex flex-wrap justify-center gap-6 w-[97%]`}>
              {categories
                .map((category, index) => (
                  <BadgeCardList userBadges={userBadges} title={category.title} category={category.category} emoji={<Emoji emojiId={category.emoji}/>} color={category.color} newCategory={category.newCategory} />
                ))
              }
            </div>
          ) : (
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold justify-center gap-6 w-[97%]`}>
              {events
                .filter((e) => e.active)
                .map((e, index) => (
                  <EventActiveCardGrid userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji}/>} color={e.color} newCategory={e.newCategory} />
                ))
              }
              <div className={`flex flex-wrap justify-center gap-6`}>
                {categories
                  .map((category, index) => (
                    <BadgeCardGrid userBadges={userBadges} title={category.title} category={category.category} emoji={<Emoji emojiId={category.emoji}/>} color={category.color} newCategory={category.newCategory} />
                  ))
                }

                {events
                  .filter((e) => !e.active)
                  .map((e, index) => (
                    <EventInactiveCardGrid userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji}/>}/>
                  ))

                }
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>

  )
}

export default Badges