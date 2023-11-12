/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"
import styles from "../style"

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
    if(currentUserAdmin){
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

  const checkAuthState = async() => {
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
        <div id="profileCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4`}>
          <div id="profileTitle" className={`flex bg-secondary rounded-t-md font-bold`}>
            <div className={`flex w-[100%] my-4`}>
              <div className={`m-auto my-1 ml-4 text-[24px]`}>
                <h3>Perfil</h3>
              </div>
              {currentUserAdmin ? (
                <div className={`m-auto mr-4`}>
                  <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={(navAdmin)}>
                    Admin
                  </button>
                </div>
              ) : (
                <div className={`m-auto my-0 mr-4`}></div>
              )
              }
            </div>
          </div>
          <div className={`flex flex-wrap my-2`}>
            <div className={`flex flex-wrap m-4 gap-4`}>
              <div className={`m-auto`}>
                {currentUserProfilePic !== "" ? (
                  <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={currentUserProfilePic} />
                ) : (
                  <img id="profilePic" className={`w-[192px] border-0 rounded-full`} src={defaultProfile} />
                )}
              </div>
              <div className={`m-auto flex flex-col`}>  
                <h2 className={`text-[24px] font-semibold`}>{currentUserNickname}</h2>
                <div className={`flex sPoints:justify-start justify-center`}>
                  <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                  <p>{currentUserPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          onClick={(cerrarSesion)}>
          Cerrar Sesion
        </button>
      </div>
      ) : (
        <div></div>
      )}
      
    </>
  )
}

export default Profile