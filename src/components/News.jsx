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
import { collection, query, getDocs, orderBy, Timestamp } from "firebase/firestore"

const News = () => {
  const navigate = useNavigate();
  const navVisitUser = (id) => navigate("/visit/" + id)

  const [news, setNews] = useState([])
  const [newsSet, setNewsSet] = useState(false)

  const fetchAll = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "news"), orderBy('date', 'desc')))
    let docs = [];
    querySnapshot.docs.map((doc) => {
      docs.push(doc)
    })
    return docs
  }

  useEffect(() => {
    fetchAll()
      .then((docs) => setNews(docs))
      .then(() => setNewsSet(true))
  }, [])

  return (
    <>
      {newsSet ? (
        <div id="newsPage" className={`flex ${styles.flexCenter}`}>
          <div id="newsCard" className={`flex flex-col text-white font-poppins font-bold ${styles.flexCenter} w-[90%] my-4 rounded-lg border-secondary border`}>
            {news.map((newsEntry, index) => (
              <div id={newsEntry.id} className={`flex w-full gap-4 ${index === news.length - 1 ? "" : "border border-transparent border-b-secondary"}`}>
                <div id="newsEntry" className={`flex mx-2 my-3 gap-4`}>
                  <div id="iconNewsEntry" className={`ss:min-w-[96px] ss:w-[96px] xs:min-w-[80px] xs:w-[80px] min-w-[64px] w-[64px] my-auto`}>
                    <img src={newsEntry.data().image} className={`border-0 rounded-full`} onClick={() => navVisitUser(newsEntry.data().userAssociated)}></img>
                  </div>
                  <div id="textNewsEntry" className={`my-auto`}>
                    <p className={`smmd:text-[24px] sm:text-[22px] xs:text-[20px] xxs:text-[18px] text-[14px]`}>{newsEntry.data().title}</p>
                    <p className={`text-gray-400 ss:text-[16px] xs:text-[14px] text-[12px] text-justify font-normal`}>{((newsEntry.data().date).toDate()).toLocaleDateString('en-GB')}</p>
                    <p className={`text-gray-200 smmd:text-[20px] sm:text-[18px] ss:text-[16px] xs:text-[14px] text-[12px] text-justify font-normal`}>{newsEntry.data().body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default News