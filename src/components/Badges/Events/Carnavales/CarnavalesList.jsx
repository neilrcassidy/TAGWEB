/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { badges } from "../../../constants/index.js"
import { antxpoint } from "../../../assets/img/index.js"
import { Emoji } from "@crispengari/react-emojify"

const CarnavalesList = ({ userBadges }) => {
  return (
    <div id="badgesCarnavales" className={`flex flex-col rounded-lg border-secondary border xs:w-[90%] w-[95%]`}>
      <div id="badgesCarnavalesTitle" className={`flex bg-secondary rounded-t-md min-w-[90%] text-[24px]`}>
        <div className={`m-auto my-2 ml-3`}>
          <h3>Carnavales <Emoji emojiId="react@emojify-1293"/></h3>
        </div>
        <div className={`m-auto my-2 mr-3`}>
          <h3>{badges.filter((badge) => userBadges.includes(badge.id) && badge.group === "carnavales").length}/{badges.filter((badge) => badge.group === "carnavales").length}</h3>
        </div>
      </div>
      <div id="badgesCarnavalesList" className={`min-w-[90%]`}>
        <div className={`flex flex-col`}>
          {badges
            .filter((badge) => badge.group === "carnavales")
            .sort((badge1, badge2) => badge2.update - badge1.update)
            .map((badge, index) => (
              <div className={`flex w-full ${index === badges.length - 1 ? "" : "border border-transparent border-b-secondary"}`}>
                <div className={`flex w-full my-4 ml-2`}>
                  <div className={`flex ss:min-w-[96px] ss:w-[96px] min-w-[64px] w-[64px] m-auto mr-2 ss:ml-2 ml-0 `}>
                    <img className={`${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                  </div>
                  <div className={`flex flex-col m-auto mx-1 smmd:max-w-[70%] sm:max-w-[65%] ss:max-w-[60%] xs:max-w-[55%] xxs:max-w-[50%] xxxs:max-w-[45%] max-w-[40%]`}>
                    <p className={`ss:text-[24px] xs:text-[22px] xxs:text-[20px] text-[18px]`}>{badge.title}</p>
                    <p className={`ss:text-[18px] xs:text-[16px] xxs:text-[14px] text-[12px] break-words text-justify font-normal`}>{badge.description}</p>
                  </div>
                  <div className={`flex flex-row m-auto mr-3 gap-2`}>
                    <img src={antxpoint} className={`sm:text-[24px] w-[20px] m-auto`} />
                    <p className={`sm:text-[24px] ss:text-[20px] xs:text-[18px] text-[16px] font-normal`}>{badge.points}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CarnavalesList