
import { v4 as uuid } from 'uuid';

export enum TaskStatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}


export enum SkillEnum {
  SPEAKING = "SPEAKING",
  VOCABULARY = "VOCABULARY",
  PRONUNCIATION = "PRONUNCIATION",
  GRAMMAR = "GRAMMAR",
  WRITING = "WRITING",
  READING = "READING",
  LISTENING = "LISTENING",
}

interface IListeningToolOutputActivity {
  content: string,
  transcription: string, // Ajustado de number para string, pois seu JSON contém texto
  url: string
}


interface TaskEntityProps {
  task: string,
  resource: string,
  skill: SkillEnum,
  duration: number,
  repetitions: number,
  // content: IListeningToolOutputActivity | null,
  status: TaskStatusEnum,
  learningJourneyId: string,
  day: number,
}


export class TaskEntity {
  private readonly id: string;
  private task: string;
  private resource: string;
  private skill: SkillEnum;
  private duration: number;
  private repetitions: number;
  // private content: IListeningToolOutputActivity | null;
  private status: TaskStatusEnum;
  private learningJourneyId: string;
  private day: number;

  constructor(
    props: TaskEntityProps,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.task = props.task;
    this.resource = props.resource;
    this.skill = props.skill;
    this.duration = props.duration;
    this.repetitions = props.repetitions;
    // this.content = props.content;
    this.status = props.status;
    this.learningJourneyId = props.learningJourneyId;
    this.day = props.day;
  }
  getId(): string {
    return this.id;
  }
  getTask(): string {
    return this.task;
  }
  getResource(): string {
    return this.resource;
  }
  getSkill(): SkillEnum {
    return this.skill;
  }
  getDuration(): number {
    return this.duration;
  }
  getRepetitions(): number {
    return this.repetitions;
  }
  // getContent(): IListeningToolOutputActivity | null {
  //   return this.content;
  // }
  getStatus(): TaskStatusEnum {
    return this.status;
  }

  getLearningJourneyId(): string {
    return this.learningJourneyId;
  }
  getDay(): number {
    return this.day;
  }
  setStatus(status: TaskStatusEnum): void {
    this.status = status
  }
}