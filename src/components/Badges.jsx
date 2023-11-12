/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"
import { badges_general } from "../constants/index.js"
import { antxpoint } from "../assets/img/index.js"

// React imports
import { useEffect, useState } from "react"

// FontAwesome imports
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

const Badges = () => {
  // This useState determines wether to display the badges as a grid (false) or a list (true)
  const [list, setList] = useState(false)
  const [userBadges, setUserBadges] = useState([])
  const [badgesSet, setBadgesSet] = useState(false)
  
  const getUserBadges = async() => {
    const currentUserInfo = await getDoc(doc(firestore, "users", auth.currentUser.uid))
    return currentUserInfo.data().badges
  }

  useEffect(() => {
    auth.onAuthStateChanged(function() {
      getUserBadges()
        .then((badges) => setUserBadges(badges))
        .then(() => setBadgesSet(true))
    })
  },[])

  return (
    <>
      {badgesSet ? (
        <div id="badgesPage" className={`flex flex-col ${styles.flexCenter} min-w-[90%]`}>
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
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold ${styles.flexCenter} w-[90%] min-w-[90%]`}>
              <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border min-w-[90%]`}>
                <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md min-w-[90%]`}>
                  <div className={`m-auto my-2 ml-3 text-[20px]`}>
                    <h3>General</h3>
                  </div>
                </div>
                <div id="badgesGeneralList" className={`min-w-[90%]`}>
                  <div className={`flex flex-col`}>
                    {badges_general.map((badge, index) => (
                      <div className={`flex w-full ${index === badges_general.length - 1 ? "" : "border border-transparent border-b-secondary"}`}>
                        <div id="leadearboardEntry" className={`flex w-full my-4 ml-2`}>
                          <div id="iconLeaderboardEntry" className={`flex ss:min-w-[64px] ss:w-[64px] min-w-[48px] w-[48px] m-auto mr-2 ss:ml-2 ml-0 `}>
                            <img src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked} className={``} />
                          </div>
                          <div id="textLeaderboardEntry" className={`flex flex-col m-auto mx-1 smmd:max-w-[80%] sm:max-w-[75%] ss:max-w-[70%] xs:max-w-[65%] xxs:max-w-[60%] xxxs:max-w-[55%] max-w-[50%]`}>
                            <p className={`ss:text-[24px] xs:text-[22px] xxs:text-[20px] text-[18px]`}>{badge.title}</p>
                            <p className={`ss:text-[18px] xs:text-[16px] xxs:text-[14px] text-[12px] break-words text-justify`}>{badge.description}</p>
                          </div>
                          <div id="textLeaderboardEntry" className={`flex flex-row m-auto mr-3 gap-2`}>
                            <img src={antxpoint} className={`w-[20px] m-auto`} />
                            <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>{badge.points}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold ${styles.flexCenter} w-[90%]`}>
              <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border`}>
                <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
                  <div className={`m-auto my-2 ml-3 text-[20px]`}>
                    <h3>General</h3>
                  </div>
                </div>
                <div id="badgesGeneralGrid" className={`m-4`}>
                  <div className={`flex flex-wrap ${styles.flexCenter} gap-10`}>
                    {badges_general.map((badge, index) => (
                      <div id={index} className={``}>
                        <div className={`w-[64px] mb-2`}>
                          <img src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                        </div>
                        <div className={`${styles.flexCenter} mb-1`}>
                          <p>{badge.title}</p>
                        </div>
                        <div className={`${styles.flexCenter}`}>
                          <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                          <p>{badge.points}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div >
              </div>
            </div>
          )
          }
        </div>
      ) : (
        <div></div>
      )}
    </>

  )
}

export default Badges