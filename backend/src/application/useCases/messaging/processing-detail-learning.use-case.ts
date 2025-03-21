import { z } from "zod";
import { IMessageBroker } from "../../../infrastructure/messaging/message-broker";
import {
  extractContent,
  getAttempts,
  handleMessageError,
} from "../../../infrastructure/messaging/message-utils";
import { WeeklyStudyPlanDetailWithContentSchema, WeeklyStudyPlanDetailWithContent } from "../../schemas/process-detail-learning-messages-schema";
import { CreateManyTaskUseCase } from "../task/create-many-task.use-case";
import { SkillEnum } from "../../../domain/entities/task.entity";
import { IListeningLeasonRepository } from "../../../domain/repository/listening-leason-repository.interface";
import { ListeningLeason } from "../../../domain/entities/listening-leason.entity";
import { CreateListeningLeasonUseCase } from "../listening-leason/create-listening-leason.use-case";


export class ProcessDetailLearningMessagesUseCase<TMessage = WeeklyStudyPlanDetailWithContent> {
  constructor(
    private readonly messageBroker: IMessageBroker<TMessage>,
    private readonly wsBroker: IMessageBroker<TMessage>,
    private readonly createManyTaskUseCase: CreateManyTaskUseCase,
    private readonly createListeningLeasonUseCase: CreateListeningLeasonUseCase
  ) { }

  async onMessage(message: any) {
    console.log("Mensagem recebida:", message);

    const actualMessage = Array.isArray(message) ? message[0] : message;
    const data = extractContent(actualMessage);
    console.log("data:", data);

    const parseResult = WeeklyStudyPlanDetailWithContentSchema.safeParse(data);
    if (!parseResult.success) {
      console.error("Erro de validação:", parseResult.error);
      throw new Error("Dados inválidos recebidos");
    }

    const learningJourneyId = parseResult.data.learning_journey_id;
    const weeklyPlan = parseResult.data.weekly_plan;

    // First create all tasks
    const taskResults = await Promise.all(
      weeklyPlan.map(async (data) => {
        const { day, activities } = data;
        return await this.createManyTaskUseCase.execute(activities, learningJourneyId, day);
      })
    );

    // Then create ListeningLeasons for tasks that need them
    const listeningLeasonPromises = weeklyPlan.flatMap((data, index) => {
      const { day, activities } = data;
      const createdTasks = taskResults[index]; // Get the tasks created for this day

      return activities.map(async (activity, activityIndex) => {
        if (activity.content && activity.skill === SkillEnum.LISTENING) {
          const task = createdTasks[activityIndex]; // Get the corresponding task

          // Create ListeningLeason for this task
          return await this.createListeningLeasonUseCase.execute({
            content: activity.content.content || '',
            transcription: activity.content.transcription, // Add appropriate transcription if available in activity
            url: activity.content.url || '',
            taskId: task.getId()
          });
        }
        return null;
      });
    });

    await Promise.all(listeningLeasonPromises.filter(p => p !== null));

    if (this.messageBroker.ack) {
      await this.messageBroker.ack(message);
    }
  }

  private async onError(error: Error, message: TMessage) {
    console.error("Erro de validação:", error);
    await handleMessageError(
      this.messageBroker,
      message,
      "weekly_detail_plan",
      1,
    );
  }

  public async execute(queue: string): Promise<void> {
    await this.messageBroker.subscribe(
      queue,
      (message, ack, nack) => this.onMessage(message),
      (error, message, ack, nack) => this.onError(error, message),
    );
  }
}

