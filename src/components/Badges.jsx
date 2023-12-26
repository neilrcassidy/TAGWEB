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
import { MensualGrid, MensualList } from "./Badges/Mensual"
import { GeneralGrid, GeneralList } from "./Badges/General"
import { FiestaGrid, FiestaList } from "./Badges/Fiesta"
import { DiscipuloGrid, DiscipuloList} from "./Badges/Discipulo"
import { AlcoholList, AlcoholGrid } from "./Badges/Alcohol"
import { JuegosDeMesaList, JuegosDeMesaGrid } from "./Badges/JuegosDeMesa"
import { CochinasList, CochinasGrid } from "./Badges/Cochinas"
import { ViajesList, ViajesGrid } from "./Badges/Viajes"
import { RutasList, RutasGrid } from "./Badges/Rutas"
import { MarinesDeLokiarList, MarinesDeLokiarGrid } from "./Badges/MarinesDeLokiar"
import { CulturaList, CulturaGrid } from "./Badges/Cultura"

import { rare_badge_unlocked, normal_badge_unlocked } from "../assets/img/badge_logos"

import { badges } from "../constants"

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
          <div id="stats" className={`flex xs:flex-row flex-col ss:text-[48px] text-[32px] font-normal xs:gap-12 gap-2 my-4`}>
            <div id="total" className={`${styles.flexCenter} flex-col`}>
              <div className={`ss:text-[36px] text-[24px]`}>Total</div>
              <div>{userBadges.length}</div>
            </div>

            <div id="byType" className={`flex gap-8`}>
              <div className={`flex flex-row gap-2`}>
                <div className={`ss:w-[64px] w-[48px] my-auto`}>
                  <img src={rare_badge_unlocked} className={`glow-rare-badges`}/>
                </div>
                <div className={`my-auto`}>{badges.filter((badge) => userBadges.includes(badge.id) && badge.type === "rare").length}</div>
              </div>

              <div className={`flex flex-row gap-2`}>
                <div className={`ss:w-[64px] w-[48px] my-auto`}>
                  <img src={normal_badge_unlocked}/>
                </div>
                <div className={`my-auto`}>{badges.filter((badge) => userBadges.includes(badge.id) && badge.type === "normal").length}</div>
              </div>
            </div>
          </div>

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
              <GeneralList userBadges={userBadges} />
              <MensualList userBadges={userBadges} />
              <DiscipuloList userBadges={userBadges} />
              <FiestaList userBadges={userBadges} />
              <AlcoholList userBadges={userBadges} />
              <JuegosDeMesaList userBadges={userBadges} />
              <ViajesList userBadges={userBadges} />
              <CochinasList userBadges={userBadges} />
              <RutasList userBadges={userBadges} />
              <MarinesDeLokiarList userBadges={userBadges} />
              <CulturaList userBadges={userBadges} />
            </div>
          ) : (
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold justify-center gap-6 w-[97%]`}>
              <GeneralGrid userBadges={userBadges} /> 
              <MensualGrid userBadges={userBadges} />
              <DiscipuloGrid userBadges={userBadges} />
              <FiestaGrid userBadges={userBadges} />
              <AlcoholGrid userBadges={userBadges} />
              <JuegosDeMesaGrid userBadges={userBadges} />
              <ViajesGrid userBadges={userBadges} />
              <CochinasGrid userBadges={userBadges} />
              <RutasGrid userBadges={userBadges} />
              <MarinesDeLokiarGrid userBadges={userBadges} />
              <CulturaGrid userBadges={userBadges} />
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