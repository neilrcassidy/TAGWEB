/* eslint-disable react/prop-types */
import { defaultProfile } from "../assets"

// React imports
import { Link } from "react-router-dom"

const MobileMenu = ({ isMobileMenuToggled, toggleMenu}) => {
  return (
    <div className={`flex flex-row font-poppins fixed h-[100%] w-[100%] z-50 ${isMobileMenuToggled ? "flex" : "hidden"}`}>
      <div className="bg-primary bg-opacity-80 ss:w-[60%] xs:w-[50%] xxs:w-[40%] xxxs:w-[35%] w-[20%] h-[100%]" onClick={() => toggleMenu((prev) => !prev)}></div>
      <div className="flex-col flex bg-header ss:w-[40%] xs:w-[50%] xxs:w-[60%] xxxs:w-[65%] w-[80%] h-[100%]">
        <div className={`flex flex-row gap-2 w-full bg-usuarioMobileMenu p-6`}>
          <img src={defaultProfile} className="w-[48px] m-auto"/>
          <div className="flex m-auto">
            <p className="ss:text-[20px] xs:text-[16px] text-[14px] font-semibold">Username</p>
          </div>
        </div>
        <nav className="mr-4">
          <ul className="pt-6 text-right font-semibold text-white xxxs:text-[28px] text-[24px]">
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