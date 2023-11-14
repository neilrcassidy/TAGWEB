/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img"

// React imports
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

// Firebase imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

const MobileMenu = ({ isMobileMenuToggled, toggleMenu, isUserLogged, logUser }) => {

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
    console.log("No infinite loop in MobileMenu")
  }, [])

  return (
    <div className={`flex flex-row font-poppins text-white fixed h-[100%] w-[100%] z-50 ${isMobileMenuToggled ? "flex" : "hidden"}`}>
      <div className="bg-primary bg-opacity-80 ss:w-[60%] xs:w-[50%] xxs:w-[40%] xxxs:w-[35%] w-[20%] h-[100%]" onClick={() => toggleMenu((prev) => !prev)}></div>
      <div className="flex-col flex bg-header ss:w-[40%] xs:w-[50%] xxs:w-[60%] xxxs:w-[65%] w-[80%] h-[100%]">
        {isUserLogged ? (
          <Link to="/profile">
            <div className={`flex h-[100px] bg-altSecondary`} onClick={() => toggleMenu((prev) => !prev)}>
              <div className={`flex flex-row m-auto mx-4`}>
                <div className={`m-auto mr-4 w-[70px]`}>
                  <img src={currentUserProfilePic} className={`border-0 rounded-full`}/>
                </div>
                <div className={`m-auto mr-4`}>
                  <div>
                    <p>{currentUserNickname}</p>
                    <div className={`flex my-auto`}>
                      <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`}/>
                      <p className={`my-auto`}>{currentUserPoints}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className={`flex h-[100px] bg-altSecondary`}>
            <div className={`flex flex-row m-auto mx-4`}>
              <div className={`m-auto mr-4`}>
                <img src={defaultProfile} className="h-[70px]" />
              </div>
              <div className={`m-auto mr-4`}>
                <p>Cargando...</p>
              </div>
            </div>
          </div>
        )}

        <nav className="mr-4">
          <ul className="pt-6 text-right font-semibold text-white xxs:text-[28px] text-[24px]">
            <li className="hover:underline mb-4"
              onClick={() => toggleMenu((prev) => !prev)}>
              <Link to="/badges">Logros</Link>
            </li>
            <li className="hover:underline mb-4"
              onClick={() => toggleMenu((prev) => !prev)}>
              <Link to="/news">Noticias</Link>
            </li>
            <li className="hover:underline"
              onClick={() => toggleMenu((prev) => !prev)}>
              <Link to="/leaderboard">Clasificación</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu