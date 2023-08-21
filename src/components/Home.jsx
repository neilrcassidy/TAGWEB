/* eslint-disable react/prop-types */
import { tagHome } from "../assets"
import styles from "../style"
import { auth } from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useState } from "react"

const Home = ({logUser}) => {

  const [registerState, setRegisterState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(true)

  const registerUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const registrar = () => {
    registerUser()
      .then(() => logUser((prev) => !prev))
  }

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const iniciarSesion = () => {
    login()
    .then(() => logUser((prev) => !prev))
    .catch(() => setUserExists(false))
  }

  const logout = async () => {
    await signOut(auth)
  }

  const cerrarSesion = async () => {
    logout()
      .then(() => logUser((prev) => !prev))
  }

  return (
    <div id="Home">
      <div className={`flex sm:flex-row flex-col overflow-hidden lg:p-36 lg:pt-24 md:p-24 p-12 gap-16`}>
        <div className={`flex w-[100%] m-auto mx-0`}>
          <img src={tagHome} className="w-[100%]"/>
        </div>

        <div className={`${styles.flexCenter} m-auto mx-0 ${registerState ? "hidden" : "flex"}`}>
          <div className={`${styles.flexCenter} border border-[#7EC46D] rounded-lg flex-col`}>
            <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
              <h3>Iniciar Sesión</h3>
            </div>

            <div className="smmd:p-6 p-4">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="usuario">
                    Usuario:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuario" 
                  onChange={(e) => setEmail(e.target.value + "@tag.es")}/>
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña" 
                  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={`flex ${styles.flexCenter} p-3`}>
                  <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                  onClick={(iniciarSesion)}>
                    Iniciar Sesión
                  </button>
                </div>
                <div className={`flex ${styles.flexCenter}`}>
                  <p className="text-white font-bold px-4 hover:underline cursor-pointer"
                  onClick={() => { 
                    setRegisterState((prev) => !prev)
                    setEmail("")
                    setPassword("")
                  }}>
                    Registrar
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={`${styles.flexCenter} m-auto mx-0 ${registerState ? "flex" : "hidden"}`}>
          <div className={`${styles.flexCenter} border border-[#7EC46D] rounded-lg flex-col`}>
            <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
              <h3>Registrar</h3>
            </div>

            <div className="smmd:p-6 p-4">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="usuario">
                    Usuario:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuario" 
                  onChange={(e) => setEmail(e.target.value + "@tag.es")}/>
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña" 
                  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={`flex ${styles.flexCenter} p-3`}>
                  <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                  onClick={(registrar)}>
                    Registrar
                  </button>
                </div>
                <div className={`flex ${styles.flexCenter}`}>
                  <p className="text-white font-bold px-4 hover:underline cursor-pointer"
                  onClick={() => {
                    setRegisterState((prev) => !prev)
                    setEmail("")
                    setPassword("")
                  }}>
                    Iniciar Sesión
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

      <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
        onClick={(cerrarSesion)}>
          Cerrar Sesion
      </button>
    </div>

    
  )
}

export default Home