

enum TaskStatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum SkillEnum {
  SPEAKING = "speaking",
  VOCABULARY = "vocabulary",
  PRONUNCIATION = "pronunciation",
  GRAMMAR = "grammar",
  WRITING = "writing",
  READING = "reading",
  LISTENING = "listening",
}


export class TaskEntity {
  private readonly id: string;
  private task: string;
  private resource: string;
  private skill: SkillEnum;
  private duration: number;
  private repetitions: number;
  private content: string | null;
  private status: TaskStatusEnum;
  private learningJourneyId: string;

  constructor(
    id: string,
    task: string,
    resource: string,
    skill: SkillEnum,
    duration: number,
    repetitions: number,
    content: string | null,
    status: TaskStatusEnum,
    learningJourneyId: string,
  ) {
    this.id = id;
    this.task = task;
    this.resource = resource;
    this.skill = skill;
    this.duration = duration;
    this.repetitions = repetitions;
    this.content = content;
    this.status = status;
    this.learningJourneyId = learningJourneyId;
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
  getContent(): string | null {
    return this.content;
  }
  getStatus(): TaskStatusEnum {
    return this.status;
  }

  getLearningJourneyId(): string {
    return this.learningJourneyId;
  }
  setStatus(status: TaskStatusEnum): void {
    this.status = status
  }
}