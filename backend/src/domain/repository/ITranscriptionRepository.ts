import { Transcription } from "../entities/Transcription";

export interface ITranscriptionRepository {
  save(transcription: Transcription): Promise<void>;
}
