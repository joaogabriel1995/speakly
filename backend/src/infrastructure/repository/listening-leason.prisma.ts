import { Prisma, PrismaClient } from "@prisma/client";
import { LearningSettingsEntity } from "../../domain/entities/learning-settings.entity";
import { ILearningSettingsRepository } from "../../domain/repository/learning-settings-repository.interface";
import { IListeningLeasonRepository } from "../../domain/repository/listening-leason-repository.interface";
import { ListeningLeason } from "../../domain/entities/listening-leason.entity";

export class ListeningLeasonRepoPrisma implements IListeningLeasonRepository {
  constructor(private prisma: PrismaClient) { }
  async save(listeningLeason: ListeningLeason): Promise<void> {
    await this.prisma.listeningLeason.create({
      data: {
        content: listeningLeason.getContent(),
        transcription: listeningLeason.getTranscription(),
        url: listeningLeason.getUrl(),
        taskId: listeningLeason.getTaskId()
      }
    })
  }
  async findByID(listeningLeasonId: string): Promise<ListeningLeason | null> {
    const leason = await this.prisma.listeningLeason.findUnique({
      where: {
        id: listeningLeasonId
      }
    })
    console.log(leason)
    if (!leason) return null

    return new ListeningLeason({
      content: leason.content,
      taskId: leason.taskId,
      transcription: leason.transcription,
      url: leason.url
    })
  }
}
