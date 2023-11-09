import { defaultProfile } from "../assets/img"
import styles from "../style"

const News = () => {
  return (
    <div id="newsPage" className={`flex ${styles.flexCenter}`}>
      <div id="newsCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} w-[90%] my-4 rounded-lg border-secondary border`}>
        <div className={`flex border border-transparent border-b-secondary w-full gap-4`}>
          <div id="newsEntry" className={`flex mx-2 my-3 gap-4`}>
            <div id="iconNewsEntry" className={`ss:min-w-[96px] ss:w-[96px] xs:min-w-[80px] xs:w-[80px] min-w-[64px] w-[64px] my-auto`}>
              <img src={defaultProfile} className={``}></img>
            </div>
            <div id="textNewsEntry" className={`my-auto`}>
              <p className={`smmd:text-[24px] sm:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>Enhorabuena Nick!</p>
              <p className={`text-gray-200 xs:text-[12px] text-[10px] text-justify font-normal`}>Nick consiguio el logro tu puta madre que vale 10 puntos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News