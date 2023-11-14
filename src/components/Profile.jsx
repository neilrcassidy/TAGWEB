/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"
import styles from "../style"
import { badges } from "../constants/index.js"

// React imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"

const Profile = ({ logUser }) => {
  const navigate = useNavigate();

  const navAdmin = () => {
    if (currentUserAdmin) {
      navigate("/administrame_esta")
    }
  }

  const [dataSet, setDataSet] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState("");
  const [currentUserBadges, setCurrentUserBadges] = useState([]);
  const [currentUserPoints, setCurrentUserPoints] = useState(0);
  const [currentUserAdmin, setCurrentUserAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false)

  const checkAuthState = async () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const currentUserInfo = await getDoc(doc(firestore, "users", user.uid))
        setCurrentUserEmail(currentUserInfo.data().email)
        setCurrentUserAdmin(currentUserInfo.data().admin)
        setCurrentUserNickname(currentUserInfo.data().nickname)
        setCurrentUserProfilePic(currentUserInfo.data().profilePic)
        setCurrentUserBadges(currentUserInfo.data().badges)
        setCurrentUserPoints(currentUserInfo.data().points)
      } else {
        setCurrentUserEmail("")
        setCurrentUserAdmin(false)
        setCurrentUserNickname("")
        setCurrentUserProfilePic("")
        setCurrentUserBadges([])
        setCurrentUserPoints(0)
      }
    })
  }

  useEffect(() => {
    checkAuthState()
      .then(setDataSet(true))
    console.log("No infinite loop in Profile")
  }, [])

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
                <div className={`flex m-auto mr-4 gap-2`}>
                  <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={() => setEditMode(true)}>
                    Editar
                  </button>
                  {currentUserAdmin ? (
                    <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                      onClick={(navAdmin)}>
                      Admin
                    </button>
                  ) : (
                    <div></div>
                  )
                  }
                </div>
              </div>
            </div>
            <div id="profileContent" className={`flex flex-col my-2`}>
              <div className={`flex flex-wrap`}>
                <div className={`flex m-auto gap-4`}>
                  <div className={`flex flex-wrap m-4 gap-4`}>
                    <div className={`m-auto`}>
                      {currentUserProfilePic !== "" ? (
                        <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={currentUserProfilePic} />
                      ) : (
                        <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={defaultProfile} />
                      )}
                    </div>
                    <div className={`m-auto flex flex-col`}>
                      <div>
                        <h2 className={`text-[24px] font-semibold`}>{currentUserNickname}</h2>
                      </div>
                      <div className={`flex sPoints:justify-start justify-center`}>
                        <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                        <p className={`font-normal`}>{currentUserPoints}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.flexCenter} m-auto`}>
                  <div className={`${styles.flexCenter} m-4`}>
                    <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border`}>
                      <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
                        <div className={`m-auto my-2 ml-3 text-[18px]`}>
                          <h3>Destacados</h3>
                        </div>
                      </div>
                      <div id="badgesGeneralGrid" className={`m-4`}>
                        <div className={`flex flex-wrap ${styles.flexCenter} gap-10`}>
                          {badges
                            .filter((badge) => badge.group === "general")
                            .map((badge, index) => (
                              <div id={index} className={``}>
                                <div className={`w-[64px] mb-2`}>
                                  <img src={badge.icon_unlocked}></img>
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
                </div>
              </div>
            </div>
            <div className={`${styles.flexCenter} mb-4`}>
              <button className={`${styles.flexCenter} border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button"
                onClick={(cerrarSesion)}>
                Cerrar Sesion
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Profile