import styles from "../style"

// React imports
import { useState } from "react"

// Firebase imports
import { firestore } from "../config/firebase-config";
import { getDoc, collection } from "firebase/firestore";

const NewAccount = () => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(true);
  const usersCollectionRef = collection(firestore, "usuarios")

  return (
    <div id="newAccount">
      <div className={`${styles.flexCenter} mt-16`}>
        <div className={`${styles.flexCenter} border ${allFieldsFilled ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
          <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
            <h3>Datos de la cuenta</h3>
          </div>

          <div className="smmd:p-6 p-4">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-white text-sm font-bold mb-2">
                  Correo:
                </p>
                <p></p>
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Apodo:
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="apodo" type="text" placeholder="Apodo"/>
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-bold mb-2">
                  Foto Perfil:
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="foto" type="file" accept="image/*"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAccount