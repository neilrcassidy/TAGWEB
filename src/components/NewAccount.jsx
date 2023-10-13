/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "../style"

// React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase imports
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebase-config";

const NewAccount = ({ isUserLogged, logUser }) => {
  const navigate = useNavigate();
  const navBadges = () => navigate("/badges")

  const [email, setEmail] = useState(auth.currentUser.email);
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [nicknameEntered, setNicknameEntered] = useState(true)

  const firestoreCreateUser = async() => {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      badges: [],
      email: email,
      nickname: nickname,
      points: 0,
      profilePic: profilePic
    })
  }

  const createUser = () => {
    if(nickname !== "" && nickname !== null){
      firestoreCreateUser()
      .then(() => navBadges())
      .catch(() => console.log("Error: Could not create new user in firestore"));
    } else {
      setNicknameEntered(false)
    }
    
  }
  

  return (
    <div id="newAccount">
      <div className={`${styles.flexCenter} mt-16`}>
        <div className={`${styles.flexCenter} border ${nicknameEntered ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
          <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
            <h3>Datos de la cuenta</h3>
          </div>

          <div className="smmd:p-6 p-4">
            <div className={`${styles.flexCenter} flex font-poppins text-[#e03f3f] text-[14px] text-center`}>
                <p className={`${nicknameEntered ? "hidden" : "flex"}`}>
                  Introduce un apodo.
                </p>
              </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Correo:
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder={isUserLogged ? auth.currentUser.email : "Correo"} disabled />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Apodo:
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="Apodo"
                  onChange={(e) => {
                    setNickname(e.target.value)
                    setNicknameEntered(true)
                  }} />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Foto Perfil (opcional):
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="profilePic" type="file" accept="image/*"/>
              </div>
              <div className={`flex ${styles.flexCenter} p-3`}>
                  <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={(createUser)}>
                    Enviar
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAccount