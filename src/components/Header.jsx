import { headerTitle, defaultProfile } from "../assets"
import { Link } from "react-router-dom"

const Header = () => {
    return (
      <div className={`flex w-[100%] h-[100px] bg-header`}>
        <div className={`flex m-auto ml-12`}>
          <img src={headerTitle} className="h-auto w-[110px]" />
        </div>

        <div className={`flex m-auto mr-6 gap-10 text-white font-poppins font-bold text-[16px]`}>
          <nav className={`flex m-auto`}>
            <ul className={`flex flex-row gap-12`}>
              <li className="cursor-pointer hover:underline hover:text-black">
                <Link to="/logros">Logros</Link>
              </li>
              <li className="cursor-pointer hover:underline hover:text-black">
                <Link to="/noticias">Noticias</Link>
              </li>
              <li className="cursor-pointer hover:underline hover:text-black">
                <Link to="/clasificacion">Clasificación</Link>
              </li>
            </ul>
          </nav>

          <Link to="/login">
            <div className={`flex flex-row m-auto border rounded-lg items-center border-white p-3 gap-2 hover:bg-white hover:text-black cursor-pointer hover:underline hover:fill-white`}>
              <img src={defaultProfile} className="w-[24px]"/>
              <p>Iniciar Sesión</p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
  
  export default Header