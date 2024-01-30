/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { badges } from "../constants"
import { antxpoint } from "../assets/img"
import { nueva } from "../assets/img/update_symbols"

const BadgeCardList = ({ userBadges, title, category, emoji, color, borderColor, bgColor, newCategory }) => {
  return (
    <div id={"badges" + title} className={`flex flex-col rounded-lg ${borderColor} border xs:w-[90%] w-[95%]`}>
      <div id={"badges" + title + "Title"} className={`flex ${bgColor} rounded-t-md min-w-[90%] text-[24px] ${color === "white" ? "text-black" : ""}`}>
        <div className={`flex flex-wrap m-auto my-2 ml-3 text-[20px] w-[100%] gap-2`}>
          <h3>{title} {emoji} </h3>
          {newCategory ? <img className={`ml-0 m-auto w-[100px]`} src={nueva} /> : ""}
        </div>
        <div className={`m-auto my-2 mr-3`}>
          <h3>{badges.filter((badge) => userBadges.includes(badge.id) && badge.group === category).length}/{badges.filter((badge) => badge.group === category).length}</h3>
        </div>
      </div>
      <div id={"badges" + category + "List"} className={`min-w-[90%]`}>
        <div className={`flex flex-col`}>
          {badges
            .filter((badge) => badge.group === category)
            .sort((badge1, badge2) => badge2.update - badge1.update)
            .map((badge, index) => (
              <div className={`flex w-full ${index === badges.filter((badge) => badge.group === category).length - 1 ? "" : "border " + borderColor + " border-t-transparent border-l-transparent border-r-transparent"}`}>
                <div className={`flex w-full my-4 ml-2`}>
                  <div className={`flex ss:min-w-[96px] ss:w-[96px] min-w-[64px] w-[64px] m-auto mr-2 ss:ml-2 ml-0 `}>
                    <div className={`relative`}>
                      <img className={`${badge.type === "rare" ? "glow-rare-badges" : ""}`} src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                      {badge.update !== 0 ? <img className={`absolute ss:top-[62px] ss:left-[62px] ss:w-[42px] top-[40px] left-[40px] w-[30px]`} src={badge.updateIcon}></img> : ""}
                    </div>
                  </div>
                  <div className={`flex flex-col m-auto mx-2 smmd:max-w-[70%] sm:max-w-[65%] ss:max-w-[60%] xs:max-w-[55%] xxs:max-w-[50%] xxxs:max-w-[45%] max-w-[40%]`}>
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

export default BadgeCardList