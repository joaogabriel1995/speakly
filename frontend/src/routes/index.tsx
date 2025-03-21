import { Route, Routes } from "react-router-dom"
import { Transcriber } from "../pages/transcriber/Transcription"
import { Content } from "../components/layout/Content"
import { PlanStudyPage } from "../pages/planStudy/PlanStudy"
import { MyStudyPlans } from "../pages/myStudyPlans/MyStudyPlans"
import { pathRoutes } from "./paths"
import { JourneyDetails } from "../pages/learningJourney/LearningJourney"
import { TaskPage } from "../pages/tasks/TaskPage"



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={pathRoutes.TRANSCRIPTION} element={<Transcriber></Transcriber>}></Route>
      <Route path={pathRoutes.STUDY_PLAN_GENERATE} element={<PlanStudyPage></PlanStudyPage>}></Route>
      <Route path={pathRoutes.STUDY_PLAN_LIST} element={<MyStudyPlans />}></Route>
      <Route path={pathRoutes.STUDY_PLAN_DETAILS} element={<JourneyDetails />}></Route>
      <Route path={pathRoutes.TASKS} element={<TaskPage />}></Route>

      <Route path={pathRoutes.HOME} element={<Content title="Página Inicial"> ASIDJAOISDJOIASJD </Content>}></Route>
    </Routes>
  )
}
