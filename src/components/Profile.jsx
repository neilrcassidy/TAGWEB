/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile } from "../assets/img"

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
    <div className={`text-white font-poppins`}>
      <div className={`${styles.flexCenter} flex-row gap-4`}>
        <div className={``}>
          <img id="profilePic" className={`h-[96px]`} src={defaultProfile}/>
        </div>
        <div className={`my-auto`}>
          <h2 className={`text-[24px] font-semibold`}>{currentUserNickname}</h2>
          <p>Puntos: {currentUserPoints}</p>
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