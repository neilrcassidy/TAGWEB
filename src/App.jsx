/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { Page, Home, Badges, News, Leaderboard, RecoverPassword, NewAccount, Profile, Admin, Visit } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { auth } from "./config/firebase-config"

const App = () => {

  const [isUserLogged, logUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user !== null) {
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
          <Route path="home" element={<Home logUser={logUser} />} />
          <Route path="reset_password" element={<RecoverPassword />} />
          <Route path="complete_registration" element={<NewAccount isUserLogged={isUserLogged} />} />
          <Route path="/" element={<Page isUserLogged={isUserLogged} logUser={logUser} />}>
            <Route index path="/" element={<Badges />} />
            <Route index path="badges" element={<Badges />} />
            <Route path="news" element={<News />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile logUser={logUser} />} />
            <Route path="administrame_esta" element={<Admin />} />
            <Route path="/visit/:id" element={<Visit />} />
            {/*<Switch>
              <Route path="/visit/:id" element={<Visit />} />
            </Switch>*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App