import { defaultProfile } from "../assets/img"
import styles from "../style"

const News = () => {
  return (
    <div id="newsPage" className={`flex ${styles.flexCenter}`}>
      <div id="newsCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} w-[90%] my-4 rounded-lg border-secondary border`}>
        <div className={`flex border border-transparent border-b-secondary w-full gap-4`}>
          <div id="newsEntry" className={`flex m-2 gap-2`}>
            <div id="iconNewsEntry" className={`w-[96px] my-auto`}>
              <img src={defaultProfile} className={``}></img>
            </div>
            <div id="textNewsEntry" className={`my-auto`}>
              <p className={`text-[12px]`}>Enhorabuena Nick!</p>
              <p className={`text-gray-200 text-[10px] text-justify font-normal`}>Nick consiguio el logro tu puta madre que vale 10 puntos!</p>
            </div>
          </div>
        </div>
        <div className={`flex border border-transparent border-b-secondary w-full gap-4`}>
          <div id="newsEntry" className={`flex m-2 gap-2`}>
            <div id="iconNewsEntry" className={`w-[96px] my-auto`}>
              <img src={defaultProfile} className={``}></img>
            </div>
            <div id="textNewsEntry" className={`my-auto`}>
              <p className={`text-[12px]`}>Enhorabuena Nick!</p>
              <p className={`text-gray-200 text-[10px] text-justify font-normal`}>Nick consiguio el logro tu puta madre que vale 10 puntos!</p>
            </div>
          </div>
        </div>
        <div className={`flex border border-transparent border-b-secondary w-full gap-4`}>
          <div id="newsEntry" className={`flex m-2 gap-2`}>
            <div id="iconNewsEntry" className={`w-[96px] my-auto`}>
              <img src={defaultProfile} className={``}></img>
            </div>
            <div id="textNewsEntry" className={`my-auto`}>
              <p className={`text-[12px]`}>Enhorabuena Nick!</p>
              <p className={`text-gray-200 text-[10px] text-justify font-normal`}>Nick consiguio el logro tu puta madre que vale 10 puntos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News