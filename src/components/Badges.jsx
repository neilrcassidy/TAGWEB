/* eslint-disable react/jsx-key */
import styles from "../style"
import { badges } from "../constants/index.js"

// React imports
import { useState } from "react"

// FontAwesome imports
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Badges = () => {
  // This useState determines wether to display the badges as a grid (false) or a list (true)
  const [list, setList] = useState(false)

  return (
    <div id="badgesPage" className={`flex flex-col ${styles.flexCenter}`}>
      <div className="inline-flex text-white font-poppins font-bold my-4 border border-secondary rounded-lg">
        <button onClick={() => setList(false)} className={`flex flex-row ${list ? "" : "bg-secondary"} hover:bg-altSecondary py-2 px-4 rounded-l gap-2`}>
          <p>Grid</p>
          <FontAwesomeIcon icon={faBorderAll} className={`m-auto`} />
        </button>
        <button onClick={() => setList(true)} className={`flex flex-row ${list ? "bg-secondary" : ""} hover:bg-altSecondary py-2 px-4 rounded-r gap-2`}>
          <p>List</p>
          <FontAwesomeIcon icon={faList} className={`m-auto`} />
        </button>
      </div>
      <div id="badgesCards" className={`flex flex-wrap text-white font-poppins font-bold ${styles.flexCenter} w-[90%]`}>
        <div id="badgesGeneral" className={`flex flex-col rounded-lg border-secondary border`}>
          <div id="badgesGeneralTitle" className={`flex bg-secondary rounded-t-md`}>
            <h3 className={`m-2`}>General</h3>
          </div>
          {list ? (
            <div id="badgesGeneralList" className={`m-4`}>
              <div className={`flex flex-col gap-4`}>
                {badges.map((badge, index) => (
                  <div id={index} className={`flex flex-row gap-6`}>
                    <div className={`w-[96px]`}>
                      <img src={badge.icon}></img>
                    </div>
                    <div>
                      <p className={`text-[20px]`}>{badge.title}</p>
                      <p className={`text-[14px]`}>{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div id="badgesGeneralGrid" className={`m-4`}>
              <div className={`flex flex-wrap ${styles.flexCenter} gap-10`}>
                {badges.map((badge, index) => (
                  <div id={index} className={``}>
                    <div className={`w-[64px]`}>
                      <img src={badge.icon}></img>
                    </div>
                    <div className={`${styles.flexCenter}`}>
                      <p>{badge.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Badges