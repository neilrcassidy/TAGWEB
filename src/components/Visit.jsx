/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"
import styles from "../style"
import { badges } from "../constants"

// React imports
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { collection, query, getDocs, getDoc, doc, updateDoc, arrayUnion, addDoc, Timestamp, increment } from "firebase/firestore"

// FontAwesome imports
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Component Imports
import { Stats, BadgeCardGrid, BadgeCardList, EventActiveCardGrid, EventInactiveCardGrid, EventActiveCardList, EventInactiveCardList } from "./"

// Constant imports
import { categories, events } from "../constants"

// Emoji imports
import { Emoji } from "@crispengari/react-emojify"

import Tippy from "@tippyjs/react"

const Visit = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  const [dataSet, setDataSet] = useState(false)
  const [userNickname, setUserNickname] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userBadges, setUserBadges] = useState([]);
  const [userFavoriteBadges, setUserFavoriteBadges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  const [currentUserAdmin, setCurrentUserAdmin] = useState(false);
  const [list, setList] = useState(false)

  const [selectedBadgeId, setSelectedBadgeId] = useState()
  const [userHasBadge, setUserHasBadge] = useState(false)
  const [badgeAdded, setBadgeAdded] = useState(false)

  const getAndSetUser = async () => {
    const userInfo = await getDoc(doc(firestore, "users", id))
    setUserNickname(userInfo.data().nickname)
    setUserProfilePic(userInfo.data().profilePic)
    setUserBadges(userInfo.data().badges)
    setUserFavoriteBadges(userInfo.data().favoriteBadges)
    setUserPoints(userInfo.data().points)
    setDataSet(true)
  }

  const getCurrentUserAdmin = async () => {
    const currentUserInfo = await getDoc(doc(firestore, "users", auth.currentUser.uid))
    handleSetCurrentUserAdmin(currentUserInfo.data().admin)
  }

  const handleSetCurrentUserAdmin = (admin) => {
    setCurrentUserAdmin(admin)
  }

  const addBadgeToUser = async () => {
    const userDoc = doc(firestore, "users", id)
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
   console.log(id)
  }

  const updateUserDoc = async (userDoc, badge) => {
    await updateDoc(userDoc, {
      badges: arrayUnion(selectedBadgeId),
      points: increment(Number(badge.points))
    })
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

  const navProfile = async () =>  {
    if(auth.currentUser.uid === id) {
      navigate("/profile")
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      getCurrentUserAdmin()
        .then(() => {
          navProfile()
        })
    })

  }, [])

  useEffect(() => {
    if (!dataSet) {
      getAndSetUser()
    }
  }, [dataSet])

  return (
    <>
      {dataSet ? (
        <div id="profilePage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
          <div id="profileCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] my-4 font-bold`}>
            <div id="profileTitle" className={`flex bg-secondary rounded-t-md`}>
              <div className={`flex w-[100%] my-4`}>
                <div className={`m-auto my-1 ml-4 text-[24px]`}>
                  <h3>Perfil</h3>
                </div>
              </div>
            </div>
            <div id="profileContent" className={`flex flex-col mt-2 pb-4`}>
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
                <div className={`${styles.flexCenter} m-auto mt-4`}>
                  <div className={`${styles.flexCenter} mt-4 mx-4`}>
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
                                    <div className={`relative top-0 left-0`}>
                                      <img className={`${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={badge.icon_unlocked}></img>
                                      {badge.update !== 0 ? <img className={`absolute top-[80px] left-[80px] w-[58px]`} src={badge.updateIcon}></img> : ""}
                                    </div>
                                  </div>
                                  <div className={`flex flex-col font-poppins text-left m-auto`}>
                                    <div className={`font-bold text-[18px] titleWordBreak`}>
                                      {badge.title}
                                    </div>
                                    <div className={`text-[16px] text-left`}>
                                      {badge.description}
                                    </div>
                                  </div>
                                </div>}>
                                <div id={badge.id} className={`flex flex-col w-[96px]`}>
                                  <div className={`${styles.flexCenter} mb-2`}>
                                    <div className={`relative top-0 left-0`}>
                                      <img className={`${styles.flexCenter} w-[72px] ${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={badge.icon_unlocked}></img>
                                      {badge.update !== 0 ? <img className={`absolute top-[44px] left-[44px] w-[36px]`} src={badge.updateIcon}></img> : ""}
                                    </div>
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

              {currentUserAdmin ? (
                <>
                  <div id="line" className="bg-secondary h-[1px] mt-6"></div>

                  <div className={`flex flex-col mt-4`}>
                    <div className={`flex ml-4 text-[32px]`}>
                      <h2>Give badge to {userNickname}</h2>
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
                    <div className={`flex flex-row ${styles.flexCenter}`}>
                      <button className="border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={addBadgeToUser}>
                        Add
                      </button>
                    </div>
                  </div>

                  <div id="line" className="bg-secondary h-[1px] mt-6"></div>

                  <div className={`flex justify-center`}>
                    <div className="inline-flex my-4 border border-secondary rounded-lg w-min">
                      <button onClick={() => setList(false)} className={`flex flex-row ${list ? "" : "bg-secondary"} hover:bg-altSecondary py-2 px-4 rounded-l gap-2`}>
                        <p>Grid</p>
                        <FontAwesomeIcon icon={faBorderAll} className={`m-auto`} />
                      </button>
                      <button onClick={() => setList(true)} className={`flex flex-row ${list ? "bg-secondary" : ""} hover:bg-altSecondary py-2 px-4 rounded-r gap-2`}>
                        <p>List</p>
                        <FontAwesomeIcon icon={faList} className={`m-auto`} />
                      </button>
                    </div>
                  </div>

                  <div className={`flex justify-center mb-6`}>
                    {list ? (
                      <div id="badgesCards" className={`flex flex-wrap justify-center gap-6 w-[97%]`}>
                        {events
                          .filter((e) => new Date() <= e.eventTimeEnd)
                          .map((e, index) => (
                            <EventActiveCardList userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji} />} color={e.color} borderColor={e.borderColor} bgColor={e.bgColor} eventTimeStart={e.eventTimeStart} eventTimeEnd={e.eventTimeEnd} />
                          ))
                        }
                        {categories
                          .map((category, index) => (
                            <BadgeCardList userBadges={userBadges} title={category.title} category={category.category} emoji={<Emoji emojiId={category.emoji} />} color={category.color} borderColor={category.borderColor} bgColor={category.bgColor} newCategory={category.newCategory} />
                          ))
                        }
                        {events
                          .filter((e) => new Date() > e.eventTimeEnd)
                          .map((e, index) => (
                            <EventInactiveCardList userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji} />} eventTimeStart={e.eventTimeStart} eventTimeEnd={e.eventTimeEnd} />
                          ))
                        }
                      </div>
                    ) : (
                      <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold justify-center gap-6 w-[97%]`}>
                        {events
                          .filter((e) => new Date() <= e.eventTimeEnd)
                          .map((e, index) => (
                            <EventActiveCardGrid userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji} />} color={e.color} borderColor={e.borderColor} bgColor={e.bgColor} eventTimeStart={e.eventTimeStart} eventTimeEnd={e.eventTimeEnd} />
                          ))
                        }
                        <div className={`flex flex-wrap justify-center gap-6`}>
                          {categories
                            .map((category, index) => (
                              <BadgeCardGrid userBadges={userBadges} title={category.title} category={category.category} emoji={<Emoji emojiId={category.emoji} />} color={category.color} borderColor={category.borderColor} bgColor={category.bgColor} newCategory={category.newCategory} />
                            ))
                          }
                          {events
                            .filter((e) => new Date() > e.eventTimeEnd)
                            .map((e, index) => (
                              <EventInactiveCardGrid userBadges={userBadges} title={e.title} category={e.category} emoji={<Emoji emojiId={e.emoji} />} />
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </>
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