/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"
import styles from "../style"
import { badges } from "../constants/index.js"

// React imports
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

import Stats from "./Stats.jsx"
import Tippy from "@tippyjs/react"

const Visit = () => {
  const navigate = useNavigate();
  const navProfile = () => navigate("/profile")

  let { id } = useParams();
  const [dataSet, setDataSet] = useState(false)
  const [userNickname, setUserNickname] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userBadges, setUserBadges] = useState([]);
  const [userFavoriteBadges, setUserFavoriteBadges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  const getAndSetUser = async () => {
    const userInfo = await getDoc(doc(firestore, "users", id))
    setUserNickname(userInfo.data().nickname)
    setUserProfilePic(userInfo.data().profilePic)
    setUserBadges(userInfo.data().badges)
    setUserFavoriteBadges(userInfo.data().favoriteBadges)
    setUserPoints(userInfo.data().points)
    setDataSet(true)
  }

  useEffect(() => {
    if (auth.currentUser.uid === id) {
      navProfile()
    }

    if (!dataSet) {
      getAndSetUser()
    }
  }, [dataSet])

  return (
    <>
      {dataSet ? (
        <div id="profilePage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
          <div id="profileCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4 font-bold`}>
            <div id="profileTitle" className={`flex bg-secondary rounded-t-md`}>
              <div className={`flex w-[100%] my-4`}>
                <div className={`m-auto my-1 ml-4 text-[24px]`}>
                  <h3>Perfil</h3>
                </div>
              </div>
            </div>
            <div id="profileContent" className={`flex flex-col my-2`}>
              <div className={`flex flex-wrap`}>
                <div className={`flex m-auto gap-4`}>
                  <div className={`flex flex-wrap my-4 mx-16 gap-4`}>
                    <div className={`m-auto`}>
                      {userProfilePic !== "" ? (
                        <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={userProfilePic} />
                      ) : (
                        <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={defaultProfile} />
                      )}
                    </div>
                    <div className={`m-auto flex flex-col`}>
                      <div className={`text-[24px] font-semibold sPoints:text-left text-center`}>
                        <h2>{userNickname}</h2>
                      </div>
                      <div className={`flex font-normal sPoints:justify-start justify-center mt-1`}>
                        <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                        <p>{userPoints}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.flexCenter} m-auto`}>
                  <Stats userBadges={userBadges} />
                </div>

                
              </div>
              {userFavoriteBadges.length !== 0 ? (
                  <div className={`${styles.flexCenter} m-auto`}>
                    <div className={`${styles.flexCenter} m-4`}>
                      <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border`}>
                        <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
                          <div className={`flex my-2 ml-2 pr-2`}>
                            <h3>Favoritas</h3>
                          </div>
                        </div>
                        <div id="favBadgesGrid" className={`mx-1 my-4`}>
                          <div className={`flex flex-wrap ${styles.flexCenter} gap-3`}>
                            {badges
                              .filter((badge) => userFavoriteBadges.includes(badge.id))
                              .map((badge, index) => (
                                <Tippy content=
                                  {<div className={`flex flex-row gap-4 m-2`}>
                                    <div className={`flex m-auto max-w-[128px] min-w-[128px]`}>
                                      <img className={`${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={badge.icon_unlocked}></img>
                                    </div>
                                    <div className={`flex flex-col font-poppins text-left m-auto`}>
                                      <div className={`font-bold text-[18px]`}>
                                        {badge.title}
                                      </div>
                                      <div className={`text-[16px] text-left`}>
                                        {badge.description}
                                      </div>
                                    </div>
                                  </div>}>
                                  <div id={badge.id} className={`flex flex-col w-[96px]`}>
                                    <div className={`${styles.flexCenter} mb-2`}>
                                      <img className={`${styles.flexCenter} w-[72px] ${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={badge.icon_unlocked}></img>
                                    </div>
                                    <div className={`${styles.flexCenter} font-normal`}>
                                      <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                                      <p>{badge.points}</p>
                                    </div>
                                  </div>
                                </Tippy>
                              ))}
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
            </div>

          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default Visit