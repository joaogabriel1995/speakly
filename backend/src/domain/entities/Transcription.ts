

import { v4 as uuid } from "uuid";

interface TranscriptionProps {
  url: string;
  trasncriberType: "youtube" | "audio"
  userId: string;
  text?: string;
  status?: "pending" | "completed" | "failed";
  language?: string;
}


export class Transcription {
  private readonly id: string;
  private  status: string;
  private  text: string | null
  private  language: string | null
  private userId: string | null
  private url: string;
  private trasncriberType: "youtube" | "audio"

  constructor(props: TranscriptionProps, id?: string) {
    this.id = id ?? uuid();
    this.language = props.language ?? null;
    this.status = props.status ?? 'pending';
    this.text = props.text ?? null;
    this.userId = props.userId ?? null
    this.url = props.url;
    this.trasncriberType = props.trasncriberType;
  }

  getId(): string {
    return this.id;
  }
  getStatus(): string {
    return this.status;
  }
  getText(): string | null {
    return this.text;
  }
  getLanguage(): string | null {
    return this.language;
  }
  getUserId(): string | null {
    return this.userId;
  }
  getUrl(): string {
    return this.url;
  }
  getTranscriberType(): "youtube" | "audio" {
    return this.trasncriberType;
  }
  updateText(text: string): void {
    this.text = text;
  }
  updateStatus(status: string): void {
    this.status = status;
  }
  updateLanguage(language: string): void {
    this.language = language;
  }
  isCompleted(): boolean {
    return this.status === 'completed';
  }
  isFailed(): boolean {
    return this.status === 'failed';
  }
  isPending(): boolean {
    return this.status === 'pending';
  }
  isYoutube(): boolean {
    return this.language === 'youtube';
  }
  isAudio(): boolean {
    return this.language === 'audio';
  }
  isFromUser(): boolean {
    return this.userId !== null;
  }
}
