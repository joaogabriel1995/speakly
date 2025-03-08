// src/infrastructure/server/router.ts
import { Router } from 'express';
import { chatRouter } from './chat.routes';
import { transcriptionRouter } from './transcription.routes';
import { studyRouter } from './study.routes';

const router = Router();

// Monta as rotas com prefixos apropriados
router.use('/chat', chatRouter);
router.use('/transcription', transcriptionRouter);
router.use('/study', studyRouter);

export { router };
