// src/infrastructure/server/router.ts
import { Router } from "express";
import { chatRouter } from "./chat.routes";
import { transcriptionRouter } from "./transcription.routes";
import { studyRouter } from "./study.routes";
import { listLearningSettingsRouter } from "./list-learning-settings.router";
import { getLearningJourneyByIdRouter } from "./get-learning-journey.router";

const router = Router();

// Monta as rotas com prefixos apropriados
router.use("/chat", chatRouter);
router.use("/transcription", transcriptionRouter);
router.use("/study", studyRouter);
router.use("/learning-settings", listLearningSettingsRouter);
router.use("/learning-journey", getLearningJourneyByIdRouter);

export { router };
