import { Route, Routes } from "react-router-dom"
import { Transcriber } from "../pages/transcriber/Transcription"
import { Content } from "../components/layout/Content"
import { PlanStudyPage } from "../pages/plan-study/PlanStudy"
import { MyStudyPlans } from "../pages/MyStudyPlans/MyStudyPlans"
import { pathRoutes } from "./paths"



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={pathRoutes.TRANSCRIPTION} element={<Transcriber></Transcriber>}></Route>
      <Route path={pathRoutes.STUDY_PLAN_GENERATE} element={<PlanStudyPage></PlanStudyPage>}></Route>
      <Route path={pathRoutes.STUDY_PLAN_LIST} element={<MyStudyPlans />}></Route>
      <Route path={pathRoutes.STUDY_PLAN_DETAILS} element={<p>ASDASDASDASDASDASDASDASDSADASD </p>}></Route>
      <Route path={pathRoutes.HOME} element={<Content title="Página Inicial"> ASIDJAOISDJOIASJD </Content>}></Route>
    </Routes>
  )
}
