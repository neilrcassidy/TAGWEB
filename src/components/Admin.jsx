/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"

// React imports
import { useNavigate } from "react-router-dom"


const Admin = ({ isUserLogged, logUser }) => {
    const navigate = useNavigate();

    return (
        <div id="adminPage" className={`flex flex-col text-white font-poppins ${styles.flexCenter}`}>
            <div id="adminCard" className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4`}>
                <div id="adminTitle" className={`flex bg-secondary rounded-t-md font-bold`}>
                    <div className={`m-auto my-5 ml-4 text-[24px]`}>
                        <h3>Admin</h3>
                    </div>
                </div>
                <div className={`flex flex-wrap my-2`}>
                    <p>Admin Stuff</p>
                </div>
            </div>
        </div>
    )
}

export default Admin