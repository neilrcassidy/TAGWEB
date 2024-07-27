/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { headerTitle, menu, close, defaultProfile, antxpoint } from "../assets/img"

// React imports
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

// Firebase Imports
import { auth, firestore } from "../config/firebase-config"
import { doc, getDoc } from "firebase/firestore"

import { useNavigate } from "react-router-dom"

const Header = ({ isMobileMenuToggled, toggleMenu, isUserLogged }) => {
  const navigate = useNavigate();
  const navBadges = () => navigate("/badges")

  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState("");
  const [currentUserPoints, setCurrentUserPoints] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const currentUserInfo = await getDoc(doc(firestore, "users", user.uid))
        setCurrentUserNickname(currentUserInfo.data().nickname)
        setCurrentUserProfilePic(currentUserInfo.data().profilePic)
        setCurrentUserPoints(currentUserInfo.data().points)
        console.log("No infinite loop in Header")
      } else {
        setCurrentUserNickname("")
        setCurrentUserProfilePic("")
        setCurrentUserPoints(0)
      }
    })
  }, [])

  return (
    <div className={`flex w-[100%] h-[100px] bg-header`}>
      <div className={`flex m-auto xs:ml-12 ml-6 font-poppins gap-1`}>
        <img src={headerTitle} className="h-auto xs:w-[110px] w-[80px]" onClick={() => navBadges()}/>
        <div className={`flex`}>
          <p className={`flex items-end`}>v1.2.4</p>
        </div>
      </div>

      <div className={`sm:flex hidden m-auto mr-2 gap-10 text-white font-poppins`}>
        <nav className={`m-auto flex font-bold text-[16px]`}>
          <ul className={`flex flex-row gap-10`}>
            <li className="cursor-pointer hover:underline hover:font-extrabold">
              <Link to="/badges">Chapas</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:font-extrabold">
              <Link to="/news">Noticias</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:font-extrabold">
              <Link to="/leaderboard">Clasificación</Link>
            </li>
          </ul>
        </nav>

        {isUserLogged ? (
          <Link to="/profile">
            <div className={`flex h-[80px] bg-altSecondary m-auto rounded-2xl`}>
              <div className={`flex flex-row m-auto mx-4`}>
                <div className={`m-auto mr-4`}>
                  {currentUserProfilePic !== "" ? (
                    <img src={currentUserProfilePic} className="h-[60px] border-0 rounded-full" />
                  ) : (
                    <img src={defaultProfile} className="h-[60px] border-0 rounded-full" />
                  )}
                </div>
                <div className={`m-auto mr-4`}>
                  <div>
                    <p>{currentUserNickname}</p>
                    <div className={`flex`}>
                      <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`}/>
                      <p>{currentUserPoints}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className={`flex h-[80px] bg-usuarioMobileMenu m-auto rounded-2xl`}>
            <div className={`flex flex-row m-auto mx-4`}>
              <div className={`m-auto mr-4`}>
                <img src={defaultProfile} className="h-[60px]" />
              </div>
              <div className={`m-auto mr-4`}>
                <p>Cargando...</p>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className={`sm:hidden flex xs:w-[48px] xs:h-[48px] w-[36px] h-[36px] m-auto mr-6`}>
        <img className={`${isUserLogged ? "flex" : "hidden"}`} src={isMobileMenuToggled ? close : menu} alt="menu"
          onClick={() => {
            toggleMenu((prev) => !prev)
          }} />
      </div>
    </div>
  )
}

export default Header