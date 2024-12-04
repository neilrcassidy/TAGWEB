/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../index.css"
import styles from "../style.js"
import { badges } from "../constants"
import { antxpoint, snowtop } from "../assets/img"
import { activo } from "../assets/img/update_symbols"

// Tippy imports
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

const currentDate = new Date()

const EventActiveCardGrid = ({ userBadges, title, category, emoji, color, borderColor, bgColor, eventTimeStart, eventTimeEnd }) => {
  return (
    <div id={"badges" + title} className={`flex flex-col rounded-lg border ${borderColor} max-w-[1470px] w-[95%]`}>
      <div className="relative">
        <img id="snowtop" src={snowtop} className="absolute -top-4 rounded-t-full h-[25px] w-[100%]" />
        <div id={"badges" + title + "Title"} className={`flex ${bgColor} rounded-t-md ${color === "white" ? "text-black" : ""}`}>
          <div className={`flex flex-wrap m-auto my-2 ml-3 text-[20px] w-[100%] gap-2`}>
            <h3>Evento: {title} {emoji}   </h3>
            {currentDate >= eventTimeStart && currentDate < eventTimeEnd ? <img className={`ml-0 m-auto w-[100px]`} src={activo} /> : ""}
          </div>
          <div className={`m-auto my-2 mr-3 text-[20px]`}>
            <h3>{badges.filter((badge) => userBadges.includes(badge.id) && badge.group === category).length}/{badges.filter((badge) => badge.group === category).length}</h3>
          </div>
        </div>
        <div id={"badges" + category + "Grid"} className={`mx-1 my-4`}>
          <div className={`flex flex-wrap ${styles.flexCenter} gap-3`}>
            {badges
              .filter((badge) => badge.group === category)
              .map((badge, index) => (
                <Tippy content=
                  {<div className={`flex flex-row gap-4 m-2`}>
                    <div className={`flex m-auto max-w-[128px] min-w-[128px]`}>
                      <div className={`relative top-0 left-0`}>
                        <img className={`${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                        <img className={`absolute top-[80px] left-[80px] w-[58px]`} src={badge.updateIcon} />
                      </div>
                    </div>
                    <div className={`flex flex-col font-poppins text-left m-auto w-[100%]`}>
                      <div className={`font-bold text-[18px] titleWordBreak`}>
                        {badge.titleSpecial ? badge.titleSpecial : badge.title}
                      </div>
                      <div className={`text-[16px] text-left`}>
                        {badge.description}
                      </div>
                    </div>
                  </div>}>

                  <div id={badge.id} className={`flex flex-col`}>
                    <div className={`${styles.flexCenter} w-[96px] h-[86px]`}>
                      <div className={`relative top-0 left-0`}>
                        <img className={`${styles.flexCenter} w-[72px] ${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                        <img className={`absolute top-[44px] left-[44px] w-[36px]`} src={badge.updateIcon} />
                      </div>
                    </div>
                    <div className={`${styles.flexCenter} font-normal`}>
                      <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                      <p>ᵃ</p>
                    </div>
                  </div>
                </Tippy>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventActiveCardGrid