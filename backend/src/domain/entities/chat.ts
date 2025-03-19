import { v4 as uuid } from "uuid";

interface ChatProps {
  userId: string;
}

export class ChatEntity {
  readonly id: string;
  private readonly userId: string;

  constructor(props: ChatProps, id?: string) {
    this.id = id ?? uuid();
    this.userId = props.userId;
  }

  getUserId(): string {
    return this.userId;
  }

  getID(): string {
    return this.id;
  }
}
