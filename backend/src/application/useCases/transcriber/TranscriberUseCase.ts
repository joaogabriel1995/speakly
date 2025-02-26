import { Transcription } from "../../../domain/entities/Transcription";
import { ITranscriptionRepository } from "../../../domain/repository/ITranscriptionRepository";
import { IMessageBroker } from "../../../infrastructure/messaging/IMessageBroker";


export class TranscriberUseCase {
  constructor(
    private readonly messageBroker: IMessageBroker,
    private readonly transcriptionRepository: ITranscriptionRepository
  ) { }

  async execute(url: string): Promise<void> {


    const transcription = new Transcription({
      url,
      status: 'pending',
      trasncriberType: 'youtube',
      userId: "ee062683-856d-452e-85e5-3cd0390f7d21"
    })
    await this.messageBroker.publish('download_queue', { url, transcriptionId: transcription.getId() })
    await this.transcriptionRepository.save(transcription)
  }
}
