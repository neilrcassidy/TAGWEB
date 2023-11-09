import { defaultProfile, podium1, podium2, podium3, antxpoint } from "../assets/img"
import styles from "../style"

const Leaderboard = () => {
  return (
    <div id="leaderboardPage" className={`flex flex-col ${styles.flexCenter}`}>
      <div id="podium" className={`flex justify-center items-end xs:gap-4 gap-2 md:max-w-[25%] smmd:max-w-[30%] sm:max-w-[40%] ss:max-w-[50%] xs:max-w-[60%] max-w-[70%] my-8 text-white font-poppins font-bold`}>
        <div id="podium2" className={`w-[25%]`}>
          <div>
            <img src={defaultProfile} className={`mx-auto max-w-[80%]`}/>
            <p className={`my-1 ss:text-[14px] xs:text-[12px] xxs:text-[10px] text-[8px] ${styles.flexCenter} max-w-[100%] break-all text-center`}>Username</p>
          </div>  
          <img src={podium2}/>
        </div>
        <div id="podium1" className={`w-[40%]`}>
          <div>
            <img src={defaultProfile} className={`mx-auto max-w-[80%]`}/>
            <p className={`my-1 ss:text-[16px] xs:text-[14px] xxs:text-[12px] text-[10px] ${styles.flexCenter} max-w-[100%] break-all text-center`}>Username</p>
          </div>
          <img src={podium1}/>
        </div>
        <div id="podium3" className={`w-[25%]`}>
          <div>
            <img src={defaultProfile} className={`mx-auto max-w-[80%]`}/>
            <p className={`my-1 ss:text-[14px] xs:text-[12px] xxs:text-[10px] text-[8px] ${styles.flexCenter} max-w-[100%] break-all text-center`}>Username</p>
          </div> 
          <img src={podium3}/>
        </div>
      </div>
      <div id="leaderboardCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} sm:w-[60%] ss:w-[70%] xs:w-[80%] w-[90%] my-4 rounded-lg border-secondary border`}>
        <div className={`flex border border-transparent border-b-secondary w-full`}>
          <div id="leadearboardEntry" className={`flex my-3 w-full`}>
            <div id="posLeaderboardEntry" className={`m-auto mx-2`}>
              <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>1.</p>
            </div>
            <div id="iconLeaderboardEntry" className={`ss:min-w-[64px] ss:w-[64px] min-w-[48px] w-[48px] m-auto mx-2`}>
              <img src={defaultProfile}/>
            </div>
            <div id="textLeaderboardEntry" className={`m-auto mx-1`}>
              <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>Username</p>
            </div>
            <div id="textLeaderboardEntry" className={`flex flex-row m-auto mr-3 gap-1`}>
              <img src={antxpoint} className={`w-[20px] m-auto`}/>
              <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard