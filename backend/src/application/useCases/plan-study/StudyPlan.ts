import { Transcription } from "../../../domain/entities/Transcription";
import { IMessageBroker } from "../../../infrastructure/messaging/IMessageBroker";
import { LearningSettingsInputDto } from "../../schemas/LearningSettingsInputSchema";


export class PlanStudyUseCase {
  constructor(
    private readonly messageBroker: IMessageBroker,
  ) { }

  async execute(data: LearningSettingsInputDto): Promise<void> {

    await this.messageBroker.publish("agent-plan-study", {
      level: data.level,
      duration: data.duration,
      days_week: data.daysWeek,
      hour_day: data.hourDay,
      userId: "ee062683-856d-452e-85e5-3cd0390f7d21"
    }
    )
  }
}
