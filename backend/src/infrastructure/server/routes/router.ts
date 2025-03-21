// src/infrastructure/server/router.ts
import { Router } from "express";
import { chatRouter } from "./chat.routes";
import { transcriptionRouter } from "./transcription.routes";
import { studyRouter } from "./study.routes";
import { listLearningSettingsRouter } from "./list-learning-settings.router";
import { getLearningJourneyByIdRouter } from "./get-learning-journey.router";
import { createDetailedLearningPlanRouter } from "./create-learning-detailed-learning.router";
import { findManyTasksByJourneyRouter } from "./find-many-tasks-by-journey.router";
import { getListeningLeasonByIdRouter } from "./get-listening-leason-by-id.router";

const router = Router();

// Monta as rotas com prefixos apropriados
router.use("/chat", chatRouter);
router.use("/transcription", transcriptionRouter);
router.use("/study", studyRouter);
router.use("/learning-settings", listLearningSettingsRouter);
router.use("/learning-journey", getLearningJourneyByIdRouter);
router.use("/learning-detail", createDetailedLearningPlanRouter);
router.use("/tasks", findManyTasksByJourneyRouter);
router.use("/listening-leason", getListeningLeasonByIdRouter);



export { router };
