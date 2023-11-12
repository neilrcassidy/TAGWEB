/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { tagHome } from "../assets/img"
import styles from "../style"

//Firebase imports
import { auth } from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

// React Imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = ({ logUser }) => {
  const navigate = useNavigate();
  const navReestablecerContrasenya = () => navigate("/reset_password")
  const navCuentaNueva = () => navigate("/complete_registration")
  const navBadges = () => navigate("/badges")

  const [registerLogin, setRegisterLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("")
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [passwordLongEnough, setPasswordLongEnough] = useState(true)
  const [correctEmailPassword, setCorrectEmailPassword] = useState(true)
  const [emailNotInUse, setEmailNotInUse] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(user){
        navBadges();
      }
    })
  }, [])

  const firebaseRegisterUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
              localStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
  }

  const register = () => {
    if (password === repeatPassword) {
      if (password.length >= 8) {
        firebaseRegisterUser()
          .then(navCuentaNueva)
          .then(() => console.log("New User Registered!"))
          .catch(() => setEmailNotInUse(false))
      } else {
        console.log("Password not long enough.")
        setPasswordLongEnough(false);
      }

    } else {
      console.log("Passwords don't match.")
      setPasswordsMatch(false);
    }
  }

  const firebaseSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
              localStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
  }

  const login = () => {
    firebaseSignIn()
      .then(() => logUser(true))
      .then(() => navBadges())
      .catch(() => setCorrectEmailPassword(false))
  }

  const firebaseSingOut = async () => {
    await signOut(auth)
      .then(localStorage.removeItem('Auth Token'))
  }

  const cerrarSesion = async () => {
    firebaseSingOut()
      .then(() => logUser(false))
  }

  return (
    <div id="Home">
      <div className={`flex sm:flex-row flex-col overflow-hidden lg:p-36 lg:pt-24 md:p-24 p-12 gap-16 mt-10`}>
        <div className={`flex w-[100%] m-auto mx-0 imageLoadinMobile`}>
          <img src={tagHome} className="w-[100%]" />
        </div>

        <div className={`${styles.flexCenter} m-auto mx-0 ${registerLogin ? "hidden" : "flex"}`}>
          <div className={`${styles.flexCenter} border ${correctEmailPassword ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
            <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
              <h3>Iniciar Sesión</h3>
            </div>

            <div className="smmd:p-6 p-4">

              <div className={`flex font-poppins text-[#e03f3f] text-[14px] text-center px-2`}>
                <p className={`${correctEmailPassword ? "hidden" : "flex"}`}>
                  Correo y/o contraseña incorrecto/a.
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="correo">
                    Correo:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="text" placeholder="Correo"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setCorrectEmailPassword(true)
                    }} />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña"
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setCorrectEmailPassword(true)
                    }} />
                </div>
                <div className={`flex ${styles.flexCenter} p-3`}>
                  <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={(login)}>
                    Iniciar Sesión
                  </button>
                </div>
                <div className={`flex ${styles.flexCenter}`}>
                  <p className="text-white font-bold px-4 hover:underline cursor-pointer"
                    onClick={() => {
                      setRegisterLogin((prev) => !prev)
                      setEmail("")
                      setPassword("")
                    }}>
                    Registrar
                  </p>
                </div>
                <div className={`flex ${styles.flexCenter}`}>
                  <p className="text-white font-bold px-4 hover:underline cursor-pointer text-center"
                    onClick={navReestablecerContrasenya}>
                    Reestablecer Contraseña
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={`${styles.flexCenter} m-auto mx-0 ${registerLogin ? "flex" : "hidden"}`}>
          <div className={`${styles.flexCenter} border ${passwordsMatch && passwordLongEnough && emailNotInUse ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
            <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
              <h3>Registrar</h3>
            </div>

            <div className="smmd:p-6 p-4">
              <div className={`flex font-poppins text-[#e03f3f] text-[14px] text-center`}>
                <p className={`${passwordsMatch ? "hidden" : "flex"}`}>
                  Las contraseñas no coinciden. Aprende a escribir.
                </p>
              </div>

              <div className={`flex font-poppins text-[#e03f3f] text-[14px] text-center`}>
                <p className={`${passwordLongEnough ? "hidden" : "flex"}`}>
                  La contraseña debe tener mínimo 8 caracteres.
                </p>
              </div>

              <div className={`flex font-poppins text-[#e03f3f] text-[14px] text-center`}>
                <p className={`${emailNotInUse ? "hidden" : "flex"}`}>
                  Este correo ya tiene una cuenta asociada a ello.
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="email">
                    Correo:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="text" placeholder="Correo"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailNotInUse(true)
                    }} />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña"
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordsMatch(true)
                      setPasswordLongEnough(true)
                    }} />
                </div>
                <div className="flex flex-col">
                  <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                    Repite Contraseña:
                  </label>
                  <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value)
                      setPasswordsMatch(true)
                    }} />
                </div>
                <div className={`flex ${styles.flexCenter} p-3`}>
                  <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={(register)}>
                    Registrar
                  </button>
                </div>
                <div className={`flex ${styles.flexCenter}`}>
                  <p className="text-white font-bold px-4 hover:underline cursor-pointer"
                    onClick={() => {
                      setRegisterLogin((prev) => !prev)
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

      {/*<button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
        onClick={(cerrarSesion)}>
        Cerrar Sesion
      </button>*/}
    </div>


  )
}

export default Home