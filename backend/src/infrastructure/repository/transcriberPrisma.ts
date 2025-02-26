import { PrismaClient } from "@prisma/client"
import { ITranscriptionRepository } from "../../domain/repository/ITranscriptionRepository"
import { Transcription } from "../../domain/entities/Transcription"

export class TranscriptionRepoPrisma implements ITranscriptionRepository {
  constructor(private prisma: PrismaClient) { }

  async save(transcription: Transcription): Promise<void> {
    await this.prisma.transcription.create({
      data: {
        url: transcription.getUrl(),
        status: transcription.getStatus(),
        transcriberType: transcription.getTranscriberType(),
        userId: transcription.getUserId(),
        id: transcription.getId(),
      }
    })
  }

}
