
import { Page, Home, Logros, Noticias, Clasificacion, RecoverPassword, NewAccount } from "./components"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { auth } from "./config/firebase-config"

const App = () => {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="inicio" element={<Home />} />
          <Route path="reestablecer_contrasenya" element={<RecoverPassword />} />
          <Route path="completar_registro" element={<NewAccount />} />
          <Route path="/" element={<Page />}>
            <Route index path="/" element={<Logros />} />
            <Route index path="logros" element={<Logros />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="clasificacion" element={<Clasificacion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App