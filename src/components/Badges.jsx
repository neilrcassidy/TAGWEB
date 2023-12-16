/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"
import { badges } from "../constants/index.js"
import { antxpoint } from "../assets/img/index.js"

// React imports
import { useEffect, useState } from "react"

// Tippy imports
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

// FontAwesome imports
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

// Component Imports
import { MensualGrid, MensualList } from "./Badges/Mensual"
import { GeneralGrid, GeneralList } from "./Badges/General"
import { FiestaGrid, FiestaList } from "./Badges/Fiesta"
import { DiscipuloGrid, DiscipuloList} from "./Badges/Discipulo"

const Badges = () => {
  // This useState determines wether to display the badges as a grid (false) or a list (true)
  const [list, setList] = useState(false)
  const [userBadges, setUserBadges] = useState([])
  const [badgesSet, setBadgesSet] = useState(false)

  const getUserBadges = async () => {
    const currentUserInfo = await getDoc(doc(firestore, "users", auth.currentUser.uid))
    return currentUserInfo.data().badges
  }

  useEffect(() => {
    auth.onAuthStateChanged(function () {
      getUserBadges()
        .then((badges) => setUserBadges(badges))
        .then(() => setBadgesSet(true))
    })

  }, [])

  return (
    <>
      {badgesSet ? (
        <div id="badgesPage" className={`flex flex-col ${styles.flexCenter} min-w-[90%] pb-8`}>
          <div className="inline-flex text-white font-poppins font-bold my-4 border border-secondary rounded-lg">
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
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold justify-center gap-6`}>
              <MensualList userBadges={userBadges} />
              <DiscipuloList userBadges={userBadges} />
              <FiestaList userBadges={userBadges} />
              <GeneralList userBadges={userBadges} />
            </div>
          ) : (
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold justify-center gap-6`}>
              <MensualGrid userBadges={userBadges} />
              <DiscipuloGrid userBadges={userBadges} />
              <FiestaGrid userBadges={userBadges} />
              <GeneralGrid userBadges={userBadges} />   
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