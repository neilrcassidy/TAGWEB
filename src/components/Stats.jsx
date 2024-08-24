/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../style"

import { rare_badge_unlocked, normal_badge_unlocked } from "../assets/img/badge_logos"

import { badges } from "../constants"

import {HackText72} from "./"

const Stats = ({ userBadges }) => {

  const userRareBadges = badges.filter((badge) => userBadges.includes(badge.id) && badge.type === "rare").length
  const userNormalBadges = badges.filter((badge) => userBadges.includes(badge.id) && badge.type === "normal").length

  return (
    <div id="stats" className={`flex xs:flex-row flex-col ss:text-[48px] text-[32px] font-normal xs:gap-12 gap-2 `}>
      <div id="total" className={`${styles.flexCenter} flex-col`}>
        <div className={`ss:text-[36px] text-[24px]`}>Total</div>
        <div>{userBadges.length == 72 ? <HackText72 /> : userBadges.length}</div>
      </div>

      <div id="byType" className={`flex gap-8`}>
        <div className={`flex flex-row gap-2`}>
          <div className={`ss:w-[64px] w-[48px] my-auto`}>
            <img src={rare_badge_unlocked} className={`glow-rare-badges`} />
          </div>
          <div className={`my-auto`}>{
            userRareBadges == 72 ? <HackText72 /> : userRareBadges
          }</div>
        </div>

        <div className={`flex flex-row gap-2`}>
          <div className={`ss:w-[64px] w-[48px] my-auto`}>
            <img src={normal_badge_unlocked} />
          </div>
          <div className={`my-auto`}>{
            userNormalBadges == 72 ? <HackText72 /> : userNormalBadges
          }</div>
        </div>
      </div>
    </div>
  )
}

export default Stats