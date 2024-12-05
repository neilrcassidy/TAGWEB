/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { defaultProfile } from "../assets/img"
import styles from "../style"

// React imports
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Firebase Imports
import { firestore } from "../config/firebase-config"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { badges, categories, events } from "../constants"

import { HackText72 } from "./"

const News = () => {
  const navigate = useNavigate();
  const navVisitUser = (id) => navigate("/visit/" + id)

  const [news, setNews] = useState([])
  const [newsSet, setNewsSet] = useState(false)

  const [users, setUsers] = useState([])
  const [usersSet, setUsersSet] = useState(false)

  const [filter, setFilter] = useState("")
  const [filteredNews, setFilteredNews] = useState([])

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "users"), orderBy('nickname')))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc.data())
    })
    return docs
  }

  const fetchNews = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "news"), orderBy('date', 'desc')))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc)
    })
    return docs
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    fetchNews()
      .then((docs) => {
        setFilteredNews(docs)
        setNews(docs)
      })
      .then(() => setNewsSet(true))

    fetchUsers()
      .then((docs) => setUsers(docs))
      .then(() => setUsersSet(true))
  }, [])

  useEffect(() => {
    if (filter !== "") {
      if (filter.substring(0, 6) === "BADGE_") {
        const filterSubstr = '"' + filter.substring(6) + '"'
        const filteredNews = news.filter((newsEntry) => (newsEntry.data().body).includes(filterSubstr))
        setFilteredNews(filteredNews)
        console.log("filtered by badge: " + filterSubstr)
      } else {
        const filteredNews = news.filter((newsEntry) => newsEntry.data().userAssociated === filter)
        setFilteredNews(filteredNews)
        console.log("filtered by user")
      }
    } else {
      setFilteredNews(news)
      console.log("not filtered")
    }
  }, [filter])

  return (
    <>
      {newsSet && usersSet ? (
        <div id="newsPage" className={`flex flex-col ${styles.flexCenter}`}>
          <div className={`text-white text-[18px] font-poppins w-[90%] mt-4 gap-8`}>
            <div className={`flex flex-row gap-2 justify-end`}>
              <div className={`pt-1 xxs:flex hidden`}>Filtrar: </div>
              <div>
                <select id="participant" className="border border-secondary text-white bg-primary rounded-lg p-1 focus:border-secondary"
                  onChange={(e) => handleFilter(e)}>
                  <option value="">Sin filtro</option>
                  <optgroup label="Por usuario">
                    {users.filter((user) => user.god === false)
                      .sort((user1, user2) => user1.nickname.localeCompare(user2.nickname))
                      .map((user, index) => {
                        const text = user.nickname
                        return (<option value={user.id}>{text}</option>)
                      })
                    }
                  </optgroup>
                  {categories.map((category, index) => {
                    return (
                      <optgroup label={category.title}>
                        {badges.filter((badge) => badge.group === category.category)
                          .map((badge, index) => {
                            let text = badge.title
                            if (text.length > 22) {
                              text = text.substring(0, 22).trimEnd() + "..."
                            }
                            return (<option value={"BADGE_" + badge.title}>{text}</option>)
                          })}
                      </optgroup>
                    )
                  })}
                  {events.map((event, index) => {
                    return (
                      <optgroup label={event.title}>
                        {badges.filter((badge) => badge.group === event.category)
                          .map((badge, index) => {
                            let text = badge.title
                            if (text.length > 21) {
                              text = text.substring(0, 21).trimEnd() + "..."
                            }
                            return (<option value={"BADGE_" + badge.title}>{text}</option>)
                          })}
                      </optgroup>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div id="newsCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} w-[90%] my-4 rounded-lg border-secondary border`}>
            {filteredNews.map((newsEntry, index) => (
              <div id={newsEntry.id} className={`flex w-full gap-4 ${index === filteredNews.length - 1 ? "" : "border border-transparent border-b-secondary"}`}>
                <div id="newsEntry" className={`flex mx-2 my-3 gap-4`}>
                  <div id="iconNewsEntry" className={`ss:min-w-[96px] ss:w-[96px] xs:min-w-[80px] xs:w-[80px] min-w-[64px] w-[64px] my-auto cursor-pointer`}>
                    <img src={newsEntry.data().image} className={`border-0 rounded-full`} onClick={() => navVisitUser(newsEntry.data().userAssociated)}></img>
                  </div>
                  <div id="textNewsEntry" className={`my-auto`}>
                    <p className={`smmd:text-[24px] sm:text-[22px] xs:text-[20px] xxs:text-[18px] text-[14px]`}>{newsEntry.data().title}</p>
                    <p className={`text-gray-400 ss:text-[16px] xs:text-[14px] text-[12px] text-justify font-normal`}>{((newsEntry.data().date).toDate()).toLocaleDateString('en-GB')}</p>
                    <p className={`text-gray-200 smmd:text-[20px] sm:text-[18px] ss:text-[16px] xs:text-[14px] text-[12px] text-justify font-normal`}>
                      {
                      (newsEntry.data().body).includes('72') ?
                        <>
                          {newsEntry.data().body.substring(0, newsEntry.data().body.indexOf('72'))}
                          <HackText72 />
                          {newsEntry.data().body.substring(newsEntry.data().body.indexOf('72')+2)}
                        </>
                      : newsEntry.data().body
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-white text-[18px] font-poppins w-[90%] mb-4 gap-8`}>
            <div className={`flex flex-row gap-2 justify-center`}>
              <div className={`pt-1`}>Cantidad: {filteredNews.length}</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default News