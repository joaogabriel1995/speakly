import { ILearningSettingsRepository } from "../../../domain/repository/learning-settings-repository.interface";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";
import { CreateDetailedLearningPlanInputDto } from "../../schemas/create-detail-learning-plan.schema";


export class CreateDetailedLearningPlanUseCase {
  constructor(
    private learningSettingsRepository: ILearningSettingsRepository,
    private messageBroker: IMessageBroker
  ) { }
  async execute({ activities, objective, settingId, theory, learningDetailId }: CreateDetailedLearningPlanInputDto) {

    const settingIdExist = await this.learningSettingsRepository.findOneById(settingId)
    if (!settingIdExist) throw new Error("Learning setting with the provided ID does not exist.");

    const detailInput = {
      activities,
      theory,
      objective,
      learningDetailId,
      level: settingIdExist.getLevel(),
      hourDay: settingIdExist.getHourDay(),
      daysWeek: settingIdExist.getDaysWeek(),
      userId: settingIdExist.getUserId(),
    }
    await this.messageBroker.publish("learning_hub", detailInput)
  }
}