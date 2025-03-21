import { v4 as uuid } from 'uuid';

interface IListeningLeasonProps {
  content: string,
  transcription: string,
  url: string
  taskId: string
}

export class ListeningLeason {

  private readonly id: string;
  private content: string;
  private transcription: string;
  private url: string;
  private taskId: string;

  constructor(props: IListeningLeasonProps, id?: string) {
    this.id = id ?? uuid();
    this.content = props.content;
    this.transcription = props.transcription;
    this.url = props.url;
    this.taskId = props.taskId;
  }
  getId(): string { return this.id; }
  getContent(): string { return this.content; }
  getTranscription(): string { return this.transcription; }
  getUrl(): string { return this.url; }
  getTaskId(): string { return this.taskId; }
}
