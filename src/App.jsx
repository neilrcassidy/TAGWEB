import { Page, Home, Badges, News, Leaderboard, RecoverPassword, NewAccount, Profile } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { auth } from "./config/firebase-config"

const App = () => {

  const [isUserLogged, logUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(user !== null){
        logUser(true)
      } else {
        logUser(false)
      }
    })
  }, [])

  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home isUserLogged={isUserLogged} logUser={logUser}/>} />
          <Route path="reset_password" element={<RecoverPassword />} />
          <Route path="complete_registration" element={<NewAccount isUserLogged={isUserLogged} logUser={logUser}/>} />
          <Route path="/" element={<Page isUserLogged={isUserLogged} logUser={logUser}/>}>
            <Route index path="/" element={<Badges />} />
            <Route index path="badges" element={<Badges />} />
            <Route path="news" element={<News />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App