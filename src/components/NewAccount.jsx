/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "../style"

// React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase imports
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, firestore, storage } from "../config/firebase-config";

const NewAccount = ({ isUserLogged }) => {
  const navigate = useNavigate();
  const navBadges = () => navigate("/badges")

  const [email, setEmail] = useState(auth.currentUser.email);
  const [id, setId] = useState(auth.currentUser.uid);

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
        if (img.width === img.height) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          // vertical photo
        } else if (img.width < img.height) {
          canvas.width = img.width
          canvas.height = img.width
          ctx.drawImage(img, 0, -(img.height - img.width) / 2)
          // horizontal photo
        } else if (img.width > img.height) {
          canvas.width = img.height
          canvas.height = img.height
          ctx.drawImage(img, -(img.width - img.height) / 2, 0)
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
      favoriteBadges: [],
      id: id,
      nickname: nickname,
      points: 0,
      profilePic: profilePicUrl,
      hidden: false,
      god: false
    })
  }

  const createNewsEntry = async (nickname, id, profilePicUrl) => {
    const d = new Date()
    await addDoc(collection(firestore, "news"), {
      title: "¡Bienvenido/a " + nickname + "!",
      body: "¡" + nickname + " ha empezado a jugar!",
      image: profilePicUrl,
      date: Timestamp.now(),
      userAssociated: id
    })
  }

  const createUser = () => {
    if (nickname !== "" && nickname !== null && profilePicFile !== null) {
      const storageRef = ref(storage, "profilePics/" + profilePicFile.name);

      uploadBytes(storageRef, profilePicFileCropped).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          firestoreCreateUser(url).then(() => {
              createNewsEntry(nickname, id, url)
              navBadges()
            }).catch(() => console.log("Error: Could not create new user in firestore"))
        })
      }).catch((error) => {
        console.log("Upload failed")
      })
    } else {
      setNicknameAndPicEntered(false)
    }
  }


  return (
    <div id="adminPage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
      <div id="adminCard" className={`flex flex-col rounded-lg ${nicknameAndPicEntered ? ("border-secondary") : ("border-[#e03f3f]")} border w-[90%] mt-4`}>
        <div className={`flex flex-col my-2`}>
          <div className={`flex flex-col`}>
            <div className={`flex mx-4 text-[24px] text-center ${styles.flexCenter}`}>
              <h2 className={``}>Datos de la cuenta</h2>
            </div>
            {
              nicknameAndPicEntered ? (
                <div></div>
              ) : (
                <div className={`flex flex-col mx-4 mt-4 mb-2 text-[#e03f3f] text-center ${styles.flexCenter}`}>
                  <p>Tienes que poner un nombre y una foto</p>
                </div>
              )
            }
            <div className={`flex flex-col mx-4 mt-4 mb-2`}>
              <p>Correo:</p>
              <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder={isUserLogged ? auth.currentUser.email : "Correo"} disabled />
            </div>
            <div className={`flex flex-col mx-4 mt-2 mb-4`}>
              <p>Apodo*:</p>
              <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="Apodo"
                onChange={(e) => {
                  setNickname(e.target.value)
                  setNicknameAndPicEntered(true)
                }} />
            </div>
            <div className={`flex flex-col mx-4 mt-2 mb-4`}>
              <p>Foto Perfil*:</p>
              <input id="imageInput" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" accept="image/*"
                onChange={(e) => {
                  handleImageChange(e)
                  setNicknameAndPicEntered(true)
                }} />
              {profilePicFileCropped ? (
                <img id="imagePreview" src={URL.createObjectURL(profilePicFileCropped)} className={`max-w-[512px] mt-4 border-0 rounded-full ${styles.flexCenter}`} />
              ) : (
                <div></div>
              )}
            </div>
            <div className={`flex flex-row ${styles.flexCenter}`}>
              <button className="border border-[#7EC46D] hover:bg-[#7EC46D]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={createUser}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAccount