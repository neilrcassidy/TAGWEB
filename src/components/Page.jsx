/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Header, MobileMenu } from "."

// React imports
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//TESTING PURPOSES
import { auth } from "../config/firebase-config"
import { signOut } from "firebase/auth"
//TESTING PURPOSES

const Page = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if(auth.currentUser){
      console.log(auth.currentUser.email)
    }

    let authToken = localStorage.getItem('Auth Token')

    if (!authToken) {
      navigate('/home')
    }
  }, [])

  //TESTING PURPOSES
  const logout = async () => {
    await signOut(auth)
      .then(localStorage.removeItem('Auth Token'))
  }

  const cerrarSesion = async () => {
    logout()
      .then(() => console.log("Usuario ha cerrado sesion"))
  }
  //TESTING PURPOSES

  const [isMobileMenuToggled, toggleMenu] = useState(false);

  return (
    <div id="Page">
      <Header isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu} />
      <MobileMenu isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu} />
      <Outlet />
      <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
        onClick={(cerrarSesion)}>
        Cerrar Sesion
      </button>
    </div>
  )
}

export default Page