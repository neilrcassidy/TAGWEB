/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../../../style.js"
import { badges } from "../../../constants/index.js"
import { antxpoint } from "../../../assets/img/index.js"

import { Emoji } from "@crispengari/react-emojify"

// Tippy imports
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

const GeneralGrid = ({ userBadges }) => {
  return (
    <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border max-w-[350px] w-[95%]`}>
      <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
        <div className={`m-auto my-2 ml-3 text-[20px]`}>
          <h3>General <Emoji emojiId="react@emojify-1293"/></h3>
        </div>
        <div className={`m-auto my-2 mr-3 text-[20px]`}>
          <h3>{badges.filter((badge) => userBadges.includes(badge.id) && badge.group === "general").length}/{badges.filter((badge) => badge.group === "general").length}</h3>
        </div>
      </div>
      <div id="badgesGeneralGrid" className={`mx-1 my-4`}>
        <div className={`flex flex-wrap ${styles.flexCenter} gap-3`}>
          {badges
            .filter((badge) => badge.group === "general")
            .map((badge, index) => (
              <Tippy content=
                {<div className={`flex flex-row gap-4 m-2`}>
                  <div className={`flex m-auto max-w-[128px] min-w-[128px]`}>
                    <img src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                  </div>
                  <div className={`flex flex-col font-poppins text-left m-auto`}>
                    <div className={`font-bold text-[18px]`}>
                      {badge.title}
                    </div>
                    <div className={`text-[16px] text-left`}>
                      {badge.description}
                    </div>
                  </div>
                </div>}>
                <div id={badge.id} className={`flex flex-col w-[96px]`}>
                  <div className={`${styles.flexCenter} mb-2`}>
                    <img className={`${styles.flexCenter} w-[72px]`} src={userBadges.includes(badge.id) ? badge.icon_unlocked : badge.icon_locked}></img>
                  </div>
                  <div className={`${styles.flexCenter} font-normal`}>
                    <img src={antxpoint} className={`w-[18px] mr-1 m-auto ml-0`} />
                    <p>{badge.points}</p>
                  </div>
                </div>
              </Tippy>
            ))}
        </div>
      </div>
    </div>
  )
}

export default GeneralGrid