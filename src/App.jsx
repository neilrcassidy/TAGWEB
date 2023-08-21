import { useState } from "react"
import { Page, Home, Logros, Noticias, Clasificacion } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  const [isUserLogged, logUser] = useState(false);

  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page isUserLogged={isUserLogged} logUser={logUser}/>}>
            <Route index element={<Home logUser={logUser}/>} />
            <Route path="logros" element={<Logros />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="clasificacion" element={<Clasificacion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App