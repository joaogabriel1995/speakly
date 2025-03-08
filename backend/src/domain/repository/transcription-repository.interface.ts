import { Transcription } from "../entities/transcription.entity";

export interface ITranscriptionRepository {
  save(transcription: Transcription): Promise<void>;
}
