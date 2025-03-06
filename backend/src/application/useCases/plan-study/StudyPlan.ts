import { Transcription } from "../../../domain/entities/Transcription";
import { IMessageBroker } from "../../../infrastructure/messaging/IMessageBroker";
import { PlanStudyUseCaseDto } from "../../schemas/PlanStudySchema";


export class PlanStudyUseCase {
  constructor(
    private readonly messageBroker: IMessageBroker,
  ) { }

  async execute(data: PlanStudyUseCaseDto): Promise<void> {

    await this.messageBroker.publish("agent-plan-study", {
      level: data.level,
      duration: data.duration,
      days_week: data.days_week,
      hour_day: data.hour_day,
      userId: "ee062683-856d-452e-85e5-3cd0390f7d21"
    }
    )
  }
}
