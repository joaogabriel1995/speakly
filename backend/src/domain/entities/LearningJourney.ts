import { v4 as uuid } from "uuid";

interface LearningJourneyEntityProps {
  id: string | undefined;
  objective: string;
  activity: string;
  week: number;
  month: number;
  theory: string;
}

export class LearningJourneyEntity {
  private readonly id: string;
  private objective: string;
  private activity: string;
  private week: number;
  private month: number;
  private theory: string;

  constructor(
    { objective, activity, week, month, theory }: Omit<LearningJourneyEntityProps, "id">,
    id?: string
  ) {
    this.validateProps({ objective, activity, week, month, theory });
    this.id = id ?? uuid();
    this.objective = objective;
    this.activity = activity;
    this.week = week;
    this.month = month;
    this.theory = theory;
  }

  private validateProps(props: Omit<LearningJourneyEntityProps, "id">): void {
    if (!props.objective) throw new Error("Objective é obrigatório");
    if (!props.activity) throw new Error("Activity é obrigatória");
    if (!props.week) throw new Error("Week é obrigatória");
    if (!props.month) throw new Error("Month é obrigatório");
    if (!props.theory) throw new Error("Theory é obrigatória");
  }

  getId(): string {
    return this.id;
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
    };
  }
}
