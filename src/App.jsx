import { Page, Home, Login, Logros, Noticias, Clasificacion } from "./components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Home />} />
            <Route path="logros" element={<Logros />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="clasificacion" element={<Clasificacion />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App