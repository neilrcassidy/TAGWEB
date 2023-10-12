/* eslint-disable react/prop-types */
import { headerTitle, menu, close } from "../assets"
import { Link } from "react-router-dom"

// Firebase Imports
import { auth } from "../config/firebase-config"

const Header = ({ isMobileMenuToggled, toggleMenu, isUserLogged }) => {

  return (
    <div className={`flex w-[100%] h-[100px] bg-header`}>
      <div className={`flex m-auto xs:ml-12 ml-6`}>
        <img src={headerTitle} className="h-auto xs:w-[110px] w-[80px]" />
      </div>

      <div className={`sm:flex hidden m-auto mr-6 gap-10 text-white font-poppins font-bold text-[16px]`}>
        <nav className={`m-auto flex`}>
          <ul className={`flex flex-row gap-12`}>
            <li className="cursor-pointer hover:underline hover:text-black">
              <Link to="/badges">Logros</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-black">
              <Link to="/news">Noticias</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-black">
              <Link to="/leaderboard">Clasificación</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:text-black">
              {auth?.currentUser !== null ? (
                <div>
                  <p>{auth?.currentUser?.email}</p>
                </div>
              ) : (<p>Error</p>)}
            </li>
          </ul>
        </nav>
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