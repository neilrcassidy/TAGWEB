/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "../style"

// React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase imports
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, firestore, storage } from "../config/firebase-config";

const NewAccount = ({ isUserLogged, logUser }) => {
  const navigate = useNavigate();
  const navBadges = () => navigate("/badges")

  const [email, setEmail] = useState(auth.currentUser.email);
  const [nickname, setNickname] = useState("");
  const [profilePicFile, setProfilePicFile] = useState();
  const [nicknameAndPicEntered, setNicknameAndPicEntered] = useState(true)

  const imgInput = document.getElementById("imageInput")
  const imgElement = document.getElementById("imagePreview")

  imgInput?.addEventListener('change', () => {
    if (imgInput.files && imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgElement.src = e.target.result;
      }
      reader.readAsDataURL(imgInput.files[0]);
    }
  })

  const firestoreCreateUser = async (profilePicUrl) => {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      badges: [],
      email: email,
      nickname: nickname,
      points: 0,
      profilePic: profilePicUrl
    })
  }

  const createUser = () => {
    if (nickname !== "" && nickname !== null && profilePicFile !== null) {
      const storageRef = ref(storage, "profilePics/" + profilePicFile.name);

      uploadBytes(storageRef, profilePicFile).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          firestoreCreateUser(url)
            .then(() => {
              console.log("Redirecting")
              navBadges()
            })
            .catch(() => console.log("Error: Could not create new user in firestore"))
        })
      }).catch((error) => {
        console.log("Upload failed")
      })
    } else {
      setNicknameAndPicEntered(false)
    }
  }


  return (
    <div id="newAccount">
      <div className={`${styles.flexCenter} mt-16`}>
        <div className={`${styles.flexCenter} border ${nicknameAndPicEntered ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
          <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
            <h3>Datos de la cuenta</h3>
          </div>

          <div className="smmd:p-6 p-4">
            <div className={`${styles.flexCenter} flex font-poppins text-[#e03f3f] text-[14px] text-center`}>
              <p className={`${nicknameAndPicEntered ? "hidden" : "flex"}`}>
                Te falta el apodo o la foto de perfil. Subnormal.
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
                    setNicknameAndPicEntered(true)
                  }} />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Foto Perfil (opcional):
                </label>
                <input id="imageInput" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setProfilePicFile(e.target.files[0])
                      setNicknameAndPicEntered(true)
                    }
                  }} />
                <img id="imagePreview" src="" className={`max-w-[512px] mt-2`}/>
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