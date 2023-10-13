/* eslint-disable no-unused-vars */
import styles from "../style"

// Firebase Imports
import { auth } from "../config/firebase-config"
import { sendPasswordResetEmail } from "firebase/auth"

// React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RecoverPassword = () => {

    const navigate = useNavigate();
    const navBackHome = () => navigate("/home");

    const [emailExists, setEmailExists] = useState(true);
    const [email, setEmail] = useState("");

    const sendEmail = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    const send = () => {
        sendEmail()
            .then(console.log("Email sent")) // Change later to be a popup
            .catch(error => setEmailExists(false))
    }

    return (
        <div id="recoverPassword">
            <div className={`${styles.flexCenter} mt-16`}>
                <div className={`${styles.flexCenter} border ${emailExists ? "border-[#7EC46D]" : "border-[#e03f3f]"} rounded-lg flex-col`}>
                    <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
                        <h3>Reestablecer Contraseña</h3>
                    </div>

                    <div className={`flex font-poppins text-[#e03f3f] text-[14px] text-center px-2 mt-2`}>
                        <p className={`${emailExists ? "hidden" : "flex"}`}>
                            No hay ninguna cuenta vinculada a este correo.
                        </p>
                    </div>

                    <div className="smmd:p-6 p-4">
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="text-white text-sm font-bold mb-2" htmlFor="correo">
                                    Correo:
                                </label>
                                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setEmailExists(true)
                                    }} />
                            </div>
                            <div className={`flex ${styles.flexCenter} p-3`}>
                                <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                                    onClick={send}>
                                    Reestablecer Contraseña
                                </button>
                            </div>
                            <div className={`flex ${styles.flexCenter}`}>
                                <p className="text-white font-bold px-4 hover:underline cursor-pointer text-center"
                                    onClick={navBackHome}>
                                    Volver al inicio
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoverPassword