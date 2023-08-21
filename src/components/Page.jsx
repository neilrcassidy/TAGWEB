/* eslint-disable react/prop-types */
import { Header, MobileMenu } from "."
import { Outlet } from "react-router-dom"
import { useState } from "react"

const Page = ({ isUserLogged, logUser }) => {
  const [isMobileMenuToggled, toggleMenu] = useState(false);

  return (
    <div id="Page">
        <Header isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu} isUserLogged={isUserLogged}/>
        <MobileMenu isMobileMenuToggled={isMobileMenuToggled} toggleMenu={toggleMenu}/>
        <Outlet />
    </div>
  )
}

export default Page