import { Route, Routes } from "react-router-dom"
import { Transcriber } from "../pages/transcriber/transcriber"



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Transcriber></Transcriber>}></Route>
    </Routes>
  )
}
