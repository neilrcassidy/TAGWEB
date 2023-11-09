/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"

// React imports
import { useEffect, useState } from "react"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import styles from "../style"

const Profile = ({ isUserLogged, logUser }) => {

  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState("");
  const [currentUserBadges, setCurrentUserBadges] = useState([]);
  const [currentUserPoints, setCurrentUserPoints] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const currentUserInfo = await getDoc(doc(firestore, "users", user.uid))
        setCurrentUserEmail(currentUserInfo.data().email)
        setCurrentUserNickname(currentUserInfo.data().nickname)
        setCurrentUserProfilePic(currentUserInfo.data().profilePic)
        setCurrentUserBadges(currentUserInfo.data().badges)
        setCurrentUserPoints(currentUserInfo.data().points)
      } else {
        console.log("userloggedout")
        setCurrentUserEmail("")
        setCurrentUserNickname("")
        setCurrentUserProfilePic("")
        setCurrentUserBadges([])
        setCurrentUserPoints(0)
      }
    })
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
    <div id="profilePage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
      <div id="profileCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4`}>
        <div id="profileTitle" className={`flex bg-secondary rounded-t-md font-bold`}>
          <h3 className={`m-2`}>Perfil</h3>
        </div>
        <div className={`flex flex-wrap my-2`}>
          <div className={`flex flex-wrap m-4 gap-4`}>
            <div className={`m-auto`}>
              <img id="profilePic" className={`w-[192px]`} src={defaultProfile} />
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
    
  )
}

export default Profile