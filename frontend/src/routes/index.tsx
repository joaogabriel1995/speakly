import { Route, Routes } from "react-router-dom"
import { Transcriber } from "../pages/transcriber/Transcription"
import { Content } from "../components/layout/Content"
import { PlanStudyPage } from "../pages/plan-study/PlanStudy"
import { MyStudyPlans } from "../pages/plan-study/MyStudyPlans"



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/transcription" element={<Transcriber></Transcriber>}></Route>
      <Route path="/study-plan/generate" element={<PlanStudyPage></PlanStudyPage>}></Route>
      <Route path="/study-plan/list" element={<MyStudyPlans />}></Route>
      <Route path="/study-plan/:planId" element={<p>ASDASDASDASDASDASDASDASDSADASD </p>}></Route>
      <Route path="/home" element={<Content title="Página Inicial"> ASIDJAOISDJOIASJD </Content>}></Route>

    </Routes>
  )
}
