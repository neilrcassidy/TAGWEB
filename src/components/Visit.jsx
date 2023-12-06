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
import { signOut } from "firebase/auth"

const Visit = ({ logUser }) => {
  const navigate = useNavigate();
  const navProfile = () => navigate("/profile")

  let {id} = useParams();
  const [dataSet, setDataSet] = useState(false)
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userBadges, setUserBadges] = useState([]);
  const [userFavoriteBadges, setUserFavoriteBadges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userAdmin, setUserAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false)

  const getAndSetUser = async () => {
    const userInfo = await getDoc(doc(firestore, "users", id))
    setUserEmail(userInfo.data().email)
    setUserAdmin(userInfo.data().admin)
    setUserNickname(userInfo.data().nickname)
    setUserProfilePic(userInfo.data().profilePic)
    setUserBadges(userInfo.data().badges)
    setUserFavoriteBadges(userInfo.data().favoriteBadges)
    setUserPoints(userInfo.data().points)
    setDataSet(true)   
  }

  useEffect(() => {
    if(auth.currentUser.uid === id){
      navProfile()
    }

    if(!dataSet){
      getAndSetUser()
    }
  }, [dataSet])

  const logout = async () => {
    await signOut(auth)
      .then(localStorage.removeItem('Auth Token'))
  }

  const cerrarSesion = async () => {
    logout()
      .then(() => logUser(false))
  }

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
                  <div className={`flex flex-wrap m-4 gap-4`}>
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

                {userFavoriteBadges.length !== 0 ? (
                  <div className={`${styles.flexCenter} m-auto`}>
                    <div className={`${styles.flexCenter} m-4`}>
                      <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border`}>
                        <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
                          <div className={`flex my-2 ml-2 pr-2`}>
                            <h3>Destacados</h3>
                          </div>
                        </div>
                        <div id="badgesGeneralGrid" className={`m-4`}>
                          <div className={`flex flex-wrap ${styles.flexCenter} gap-10`}>
                            {badges
                              .filter((badge) => userFavoriteBadges.includes(badge.id))
                              .map((badge, index) => (
                                <div id={index} className={``}>
                                  <div className={`w-[64px] mb-2`}>
                                    <img src={badge.icon_unlocked}></img>
                                  </div>
                                  <div className={`${styles.flexCenter} mb-1`}>
                                    <p>{badge.title}</p>
                                  </div>
                                  <div className={`${styles.flexCenter} font-normal`}>
                                    <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                                    <p>{badge.points}</p>
                                  </div>
                                </div>
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
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default Visit