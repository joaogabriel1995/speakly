import { v4 as uuid } from "uuid";

interface UserEntityProps {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  chats: Set<string>;
}

export class UserEntity {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private cellphone: string;
  private chats: Set<string>;
  constructor(props: UserEntityProps, id?: string) {
    this.id = id ?? uuid();
    this.name = props.name;
    this.password = props.password;
    this.email = props.email;
    this.cellphone = props.cellphone;
    this.chats = new Set(props.chats);
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
  getPhone() {
    return this.cellphone;
  }
  getChats() {
    return this.chats;
  }
}
