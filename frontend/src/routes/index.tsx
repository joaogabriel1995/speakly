import { Route, Routes } from "react-router-dom"
import { Transcriber } from "../pages/transcriber/Transcription"
import { Content } from "../components/layout/Content"
import { PlanStudyPage } from "../pages/plan-study/PlanStudy"



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/transcription" element={<Transcriber></Transcriber>}></Route>
      <Route path="/study" element={<PlanStudyPage></PlanStudyPage>}></Route>

      <Route path="/home" element={<Content title="Página Inicial"> ASIDJAOISDJOIASJD </Content>}></Route>

    </Routes>
  )
}
