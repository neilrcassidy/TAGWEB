/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { badges } from "../../../constants/index.js"
import { antxpoint } from "../../../assets/img/index.js"
import { Emoji } from "@crispengari/react-emojify"

const FiestaList = ({ userBadges }) => {
  return (
    <div id="badgesFiesta" className={`flex flex-col rounded-lg border-purple-500 border xs:w-[90%] w-[95%]`}>
      <div id="badgesFiestaTitle" className={`flex bg-purple-500 rounded-t-md min-w-[90%] text-[24px]`}>
        <div className={`m-auto my-2 ml-3`}>
          <h3>Fiestas <Emoji emojiId="react@emojify-1044"/></h3>
        </div>
        <div className={`m-auto my-2 mr-3`}>
          <h3>{badges.filter((badge) => userBadges.includes(badge.id) && badge.group === "fiesta").length}/{badges.filter((badge) => badge.group === "fiesta").length}</h3>
        </div>
      </div>
      <div id="badgesFiestaList" className={`min-w-[90%]`}>
        <div className={`flex flex-col`}>
          {badges
            .filter((badge) => badge.group === "fiesta")
            .map((badge, index) => (
              <div className={`flex w-full ${index === badges.length - 1 ? "" : "border border-transparent border-b-purple-500"}`}>
                <div className={`flex w-full my-4 ml-2`}>
                  <div className={`flex ss:min-w-[96px] ss:w-[96px] min-w-[64px] w-[64px] m-auto mr-2 ss:ml-2 ml-0 `}>
                    <img src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked} className={``} />
                  </div>
                  <div className={`flex flex-col m-auto mx-1 smmd:max-w-[75%] sm:max-w-[70%] ss:max-w-[65%] xs:max-w-[60%] xxs:max-w-[55%] xxxs:max-w-[50%] max-w-[45%]`}>
                    <p className={`ss:text-[24px] xs:text-[22px] xxs:text-[20px] text-[18px]`}>{badge.title}</p>
                    <p className={`ss:text-[18px] xs:text-[16px] xxs:text-[14px] text-[12px] break-words text-justify font-normal`}>{badge.description}</p>
                  </div>
                  <div className={`flex flex-row m-auto mr-3 gap-2`}>
                    <img src={antxpoint} className={`w-[20px] m-auto`} />
                    <p className={`ss:text-[20px] xs:text-[18px] xxs:text-[16px] text-[14px]`}>{badge.points}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FiestaList