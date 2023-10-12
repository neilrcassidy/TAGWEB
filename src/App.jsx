
import { Page, Home, Badges, News, Leaderboard, RecoverPassword, NewAccount } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="reset_password" element={<RecoverPassword />} />
          <Route path="complete_registration" element={<NewAccount />} />
          <Route path="/" element={<Page />}>
            <Route index path="/" element={<Badges />} />
            <Route index path="badges" element={<Badges />} />
            <Route path="news" element={<News />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App