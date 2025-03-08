import { v4 as uuid } from "uuid";

export enum SenderType {
  USER = "user",
  AI = "ai",
}

interface MessageProps {
  text: string;
  senderType: SenderType;
  sender: string;
  timestamp?: Date;
  chatId?: string;
}

export class Message {
  readonly id: string;
  private readonly text: string;
  private readonly sender: string;
  private readonly senderType: SenderType;
  private readonly timestamp: Date;
  private readonly chatId?: string;

  constructor(props: MessageProps, id?: string) {
    if (!props.text.trim()) {
      throw new Error("Message text cannot be empty");
    }
    if (!props.sender.trim()) {
      throw new Error("Sender cannot be empty");
    }

    this.id = id ?? uuid();
    this.text = props.text;
    this.senderType = props.senderType;
    this.sender = props.sender;
    this.timestamp = props.timestamp ?? new Date();
  }

  getText(): string {
    return this.text;
  }

  getSenderType(): SenderType {
    return this.senderType;
  }

  getSender(): string {
    return this.sender;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  isFromUser(): boolean {
    return this.senderType === SenderType.USER;
  }

  isFromAI(): boolean {
    return this.senderType === SenderType.AI;
  }
  getChatId(): string | undefined {
    return this.chatId;
  }
}
