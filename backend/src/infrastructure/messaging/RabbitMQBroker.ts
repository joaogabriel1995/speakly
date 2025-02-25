// src/infrastructure/messageBroker/RabbitMQBrokerAdvanced.ts
import amqp, { Connection, Channel, Message } from 'amqplib';
import { IMessageBroker } from './IMessageBroker';

export class RabbitMQBrokerAdvanced implements IMessageBroker {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private replyQueue: string | null = null;

  constructor(private readonly uri: string) { }

  public async init(): Promise<void> {
    this.connection = await amqp.connect(this.uri);
    this.channel = await this.connection.createChannel();

    // Cria uma fila exclusiva para receber respostas RPC
    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    this.replyQueue = queue;
  }

  // Publica mensagem em uma fila simples
  public async publish(queue: string, message: object): Promise<void> {
    if (this.channel === null) {
      throw new Error('Channel not initialized');
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  // Consome mensagens de uma fila simples
  public async subscribe(queue: string, onMessage: (message: object) => Promise<void>): Promise<void> {
    if (this.channel === null) {
      throw new Error('Channel not initialized');
    }
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.consume(queue, async (msg: Message | null) => {
      if (msg) {
        if (this.channel === null) {
          throw new Error('Channel not initialized');
        }
        try {
          const content = JSON.parse(msg.content.toString());
          await onMessage(content);
          this.channel.ack(msg);
        } catch (error) {
          this.channel.nack(msg, false, false);
        }
      }
    });
  }
  // // Publica mensagem em uma exchange (tipo padrão: direct)
  // public async publishToExchange(
  //   exchange: string,
  //   routingKey: string,
  //   message: object,
  //   exchangeType: string = 'direct'
  // ): Promise<void> {
  //   await this.channel.assertExchange(exchange, exchangeType, { durable: true });
  //   this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
  // }


  // // Consome mensagens vinculadas a uma exchange por meio de routing key
  // public async subscribeToExchange(
  //   exchange: string,
  //   queue: string,
  //   routingKey: string,
  //   onMessage: (message: object) => Promise<void>,
  //   exchangeType: string = 'direct'
  // ): Promise<void> {
  //   await this.channel.assertExchange(exchange, exchangeType, { durable: true });
  //   const q = await this.channel.assertQueue(queue, { durable: true });
  //   await this.channel.bindQueue(q.queue, exchange, routingKey);
  //   await this.channel.consume(q.queue, async (msg: Message | null) => {
  //     if (msg) {
  //       try {
  //         const content = JSON.parse(msg.content.toString());
  //         await onMessage(content);
  //         this.channel.ack(msg);
  //       } catch (error) {
  //         this.channel.nack(msg, false, false);
  //       }
  //     }
  //   });
  // }

  // // Implementação do padrão RPC: envia a mensagem e aguarda a resposta
  // public async rpcCall(queue: string, message: object, timeout: number = 5000): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     const correlationId = this.generateUuid();

  //     // Consome a fila de resposta filtrando pela correlação
  //     const consumer = await this.channel.consume(
  //       this.replyQueue,
  //       (msg: Message | null) => {
  //         if (msg && msg.properties.correlationId === correlationId) {
  //           const response = JSON.parse(msg.content.toString());
  //           this.channel.ack(msg);
  //           resolve(response);
  //         }
  //       },
  //       { noAck: false }
  //     );

  //     await this.channel.assertQueue(queue, { durable: true });
  //     this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
  //       correlationId,
  //       replyTo: this.replyQueue,
  //     });

  //     // Timeout para evitar espera indefinida
  //     setTimeout(() => {
  //       this.channel.cancel(consumer.consumerTag);
  //       reject(new Error('RPC timeout'));
  //     }, timeout);
  //   });
  // }


  // Geração simples de UUID para identificar chamadas RPC
  private generateUuid(): string {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
  }
}
