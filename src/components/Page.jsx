import { Header } from "."
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

const Page = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default Page