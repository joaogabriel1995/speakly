import { v4 as uuid } from "uuid";

interface LearningSettingsEntityProps {
  id: string | undefined;
  level: string;
  duration: number;
  daysWeek: number;
  hourDay: number;
  userId: string;
}

enum LearningSettingsErrors {
  LEVEL_REQUIRED = "Level is required",
  DURATION_REQUIRED = "Duration is required",
  DAYS_WEEK_REQUIRED = "Days of the week are required",
  HOUR_DAY_REQUIRED = "Hours per day are required",
}

export class LearningSettingsEntity {
  private readonly id: string;
  private level: string;
  private duration: number;
  private daysWeek: number;
  private hourDay: number;
  private userId: string;

  constructor(
    {
      daysWeek,
      duration,
      hourDay,
      level,
      userId,
    }: Omit<LearningSettingsEntityProps, "id">,
    id?: string,
  ) {
    this.validateProps({ daysWeek, duration, hourDay, level, userId });
    this.id = id ?? uuid();
    this.level = level;
    this.duration = duration;
    this.daysWeek = daysWeek;
    this.hourDay = hourDay;
    this.userId = userId;
  }

  private validateProps(props: Omit<LearningSettingsEntityProps, "id">): void {
    if (!props.level) throw new Error(LearningSettingsErrors.LEVEL_REQUIRED);
    if (!props.duration)
      throw new Error(LearningSettingsErrors.DURATION_REQUIRED);
    if (!props.daysWeek)
      throw new Error(LearningSettingsErrors.DAYS_WEEK_REQUIRED);
    if (!props.hourDay)
      throw new Error(LearningSettingsErrors.HOUR_DAY_REQUIRED);
  }

  getId(): string {
    return this.id;
  }

  getLevel(): string {
    return this.level;
  }

  getDuration(): number {
    return this.duration;
  }

  getDaysWeek(): number {
    return this.daysWeek;
  }

  getHourDay(): number {
    return this.hourDay;
  }
  getUserId(): string {
    return this.userId;
  }

  toJSON(): object {
    return {
      id: this.id,
      level: this.level,
      duration: this.duration,
      daysWeek: this.daysWeek,
      hourDay: this.hourDay,
    };
  }
}
