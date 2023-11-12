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
  const [profilePicFileCropped, setProfilePicFileCropped] = useState("");
  const [nicknameAndPicEntered, setNicknameAndPicEntered] = useState(true)

  const handleImageChange = (e) => {
    setProfilePicFile(e.target.files[0])
    const file = e.target.files[0]
    const imgname = e.target.files[0].name
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        
        // square photo
        if(img.width === img.height){
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
        // vertical photo
        } else if(img.width < img.height){
          canvas.width = img.width
          canvas.height = img.width
          ctx.drawImage(img, 0, -(img.height-img.width)/2)
        // horizontal photo
        } else if(img.width > img.height){
          canvas.width = img.height
          canvas.height = img.height
          ctx.drawImage(img, -(img.width-img.height)/2, 0)
        }
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now()
            })
            setProfilePicFileCropped(file)
          },
          "image/jpeg",
          0.8
        )
      }
    }
  }

  const firestoreCreateUser = async (profilePicUrl) => {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      admin: false,
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

      uploadBytes(storageRef, profilePicFileCropped).then((snapshot) => {
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
                  Apodo*:
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="Apodo"
                  onChange={(e) => {
                    setNickname(e.target.value)
                    setNicknameAndPicEntered(true)
                  }} />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Foto Perfil*:
                </label>
                <input id="imageInput" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e)
                    setNicknameAndPicEntered(true)
                  }} />
                {profilePicFileCropped ? (
                  <img id="imagePreview" src={URL.createObjectURL(profilePicFileCropped)} className={`max-w-[512px] mt-4 border-0 rounded-full`} />
                ) : (
                  <div></div>
                )}
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