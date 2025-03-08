import { v4 as uuid } from "uuid";

interface LearningJourneyEntityProps {
  id: string | undefined;
  objective: string;
  activity: string;
  week: number;
  month: number;
  theory: string;
  userId: string;
  learningJourneyId: string
}

enum LearningJourneyErrors {
  OBJECTIVE_REQUIRED = "Objective is required",
  ACTIVITY_REQUIRED = "Activity is required",
  WEEK_REQUIRED = "Week is required",
  MONTH_REQUIRED = "Month is required",
  THEORY_REQUIRED = "Theory is required",
  USER_ID_REQUIRED = "User ID is required",
  LEARNING_SETTINGS_ID_REQUIRED = "Learning Settings ID is required"

}

export class LearningJourneyEntity {
  private readonly id: string;
  private objective: string;
  private activity: string;
  private week: number;
  private month: number;
  private theory: string;
  private userId: string
  private learningJourneyId: string


  constructor(
    { objective, activity, week, month, theory, userId, learningJourneyId }: Omit<LearningJourneyEntityProps, "id">,
    id?: string
  ) {
    this.validateProps({ objective, activity, week, month, theory, userId, learningJourneyId });
    this.id = id ?? uuid();
    this.objective = objective;
    this.activity = activity;
    this.week = week;
    this.month = month;
    this.theory = theory;
    this.userId = userId
    this.learningJourneyId = learningJourneyId
  }



  private validateProps(props: Omit<LearningJourneyEntityProps, "id">): void {
    if (!props.objective) throw new Error(LearningJourneyErrors.OBJECTIVE_REQUIRED);
    if (!props.activity) throw new Error(LearningJourneyErrors.ACTIVITY_REQUIRED);
    if (!props.week) throw new Error(LearningJourneyErrors.WEEK_REQUIRED);
    if (!props.month) throw new Error(LearningJourneyErrors.MONTH_REQUIRED);
    if (!props.theory) throw new Error(LearningJourneyErrors.THEORY_REQUIRED);
    if (!props.userId) throw new Error(LearningJourneyErrors.USER_ID_REQUIRED);
    if (!props.learningJourneyId) throw new Error(LearningJourneyErrors.LEARNING_SETTINGS_ID_REQUIRED);

  }


  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getObjective(): string {
    return this.objective;
  }

  getActivity(): string {
    return this.activity;
  }

  getWeek(): number {
    return this.week;
  }

  getMonth(): number {
    return this.month;
  }

  getTheory(): string {
    return this.theory;
  }

  getLearningJourneyId(): string {
    return this.learningJourneyId;
  }


  setObjective(objective: string): void {
    if (!objective) throw new Error("Objective não pode ser vazio");
    this.objective = objective;
  }

  toJSON(): object {
    return {
      id: this.id,
      objective: this.objective,
      activity: this.activity,
      week: this.week,
      month: this.month,
      theory: this.theory,
      userId: this.userId
    };
  }
}
