import styles from "../style"
import { auth } from "../config/firebase-config"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RecoverPassword = () => {

    const navigate = useNavigate();
    const navVolverInicio = () => navigate("/");

    const [emailExists, setEmailExists] = useState(true);
    const [email, setEmail] = useState("");

    const sendEmail = async () => {
        await sendPasswordResetEmail(auth, email)
    }

    const send = () =>{
        sendEmail()
            .then()
            .catch(setEmailExists(false))
    }

    return (
        <div id="recoverPassword">
            <div className={`${styles.flexCenter} mt-16`}>
                <div className={`${styles.flexCenter} border border-[#7EC46D] rounded-lg flex-col`}>
                    <div className={`flex font-poppins text-white text-[30px] text-center p-6 pb-0`}>
                        <h3>Reestablecer Contraseña</h3>
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
                                }}/>
                            </div>
                            <div className={`flex ${styles.flexCenter} p-3`}>
                                <button className="border border-[#7EC46D] hover:bg-[#7EC46D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                                onClick={send}>
                                    Reestablecer Contraseña
                                </button>
                            </div>
                            <div className={`flex ${styles.flexCenter}`}>
                                <p className="text-white font-bold px-4 hover:underline cursor-pointer text-center"
                                onClick={navVolverInicio}>
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