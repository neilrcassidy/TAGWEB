/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { podium1, podium2, podium3, antxpoint } from "../assets/img"
import styles from "../style"

// React imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase Imports
import { firestore } from "../config/firebase-config"
import { collection, query, getDocs, orderBy } from "firebase/firestore"

const Leaderboard = () => {
  const navigate = useNavigate();
  const navVisitUser = (id) => navigate("/visit/" + id)

  const [users, setUsers] = useState([])
  const [usersSet, setUsersSet] = useState(false)

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "users"), orderBy('points', 'desc')))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc.data())
    })
    return docs
  }

  useEffect(() => {
    fetchUsers()
      .then((docs) => setUsers(docs))
      .then(() => setUsersSet(true))
  }, [])

  return (
    <>
      {usersSet ? (
        <div id="leaderboardPage" className={`flex flex-col ${styles.flexCenter}`}>
          <div id="podium" className={`flex justify-center items-end xs:gap-4 gap-2 md:max-w-[25%] smmd:max-w-[30%] sm:max-w-[40%] ss:max-w-[50%] xs:max-w-[60%] max-w-[70%] my-8 text-white font-poppins font-bold`}>
            <div id="podium2" className={`w-[25%]`}>
              <div className={`cursor-pointer`} onClick={() => navVisitUser(users[1].id)}>
                <img src={users[1].profilePic} className={`mx-auto max-w-[80%] border-0 rounded-full`} />
                <p className={`my-1 ss:text-[16px] xs:text-[14px] xxs:text-[12px] text-[10px] ${styles.flexCenter} max-w-[100%] break-all text-center my-2`}>{users[1].nickname}</p>
              </div>
              <img src={podium2} />
            </div>
            <div id="podium1" className={`w-[40%]`}>
              <div className={`cursor-pointer`} onClick={() => navVisitUser(users[0].id)}>
                <img src={users[0].profilePic} className={`mx-auto max-w-[80%] border-0 rounded-full`} />
                <p className={`my-1 ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px] ${styles.flexCenter} max-w-[100%] break-all text-center my-2`}>{users[0].nickname}</p>
              </div>
              <img src={podium1} />
            </div>
            <div id="podium3" className={`w-[25%]`} >
              <div className={`cursor-pointer`} onClick={() => navVisitUser(users[2].id)}>
                <img src={users[2].profilePic} className={`mx-auto max-w-[80%] border-0 rounded-full`} />
                <p className={`my-1 ss:text-[16px] xs:text-[14px] xxs:text-[12px] text-[10px] ${styles.flexCenter} max-w-[100%] break-all text-center my-2`}>{users[2].nickname}</p>
              </div>
              <img src={podium3} />
            </div>
          </div>
          <div id="leaderboardCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} sm:w-[60%] ss:w-[70%] xs:w-[80%] w-[90%] my-4 rounded-lg border-secondary border`}>
            {users.map((user, index) => (
              <div className={`flex w-full ${index === users.length - 1 ? "" : "border border-transparent border-b-secondary"}`}>
                <div id="leadearboardEntry" className={`flex my-3 w-full`}>
                  <div id="posLeaderboardEntry" className={`m-auto ml-4 mr-0`}>
                    <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px] ss:min-w-[40px] min-w-[30px]`}>{index+1}.</p>
                  </div>
                  <div id="iconLeaderboardEntry" className={`ss:min-w-[64px] ss:w-[64px] min-w-[48px] w-[48px] m-auto mr-2 ss:ml-2 ml-0 `}>
                    <img src={user.profilePic} className={`border-0 rounded-full cursor-pointer`} onClick={() => navVisitUser(user.id)} />
                  </div>
                  <div id="textLeaderboardEntry" className={`m-auto mx-1`}>
                    <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px] cursor-pointer`} onClick={() => navVisitUser(user.id)}>{user.nickname}</p>
                  </div>
                  <div id="textLeaderboardEntry" className={`flex flex-row m-auto mr-3 gap-2`}>
                    <img src={antxpoint} className={`w-[20px] m-auto`} />
                    <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>{user.points}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}
    </>
  )
}

export default Leaderboard