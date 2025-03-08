import { Transcription } from "../../../domain/entities/transcription.entity";
import { ITranscriptionRepository } from "../../../domain/repository/transcription-repository.interface";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";


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
    await this.messageBroker.publish('ddd', {
      url: transcription.getUrl(),
      language: transcription.getLanguage(),
      status: transcription.getStatus(),
      userId: transcription.getUserId(),
      trasncriberType: transcription.getTranscriberType()
    })
    await this.transcriptionRepository.save(transcription)
  }
}
