/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Header, MobileMenu, SnowBackground } from "."

// React imports
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase imports
import { auth } from "../config/firebase-config"

const Page = ({ isUserLogged }) => {
  const navigate = useNavigate();
  const navHome = () => navigate("/home")
  
  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(!user){
        navHome()
      }
    })
  }, [])

  const [isMobileMenuToggled, toggleMenu] = useState(false);

  return (
    <div id="Page">
      <Header isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu} isUserLogged={isUserLogged}/>
      <MobileMenu isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu} isUserLogged={isUserLogged} />
      <Outlet />
    </div>
  )
}

export default Page