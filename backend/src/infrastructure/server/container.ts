// src/infrastructure/server/container.ts
import { PrismaClient } from '@prisma/client';
import { RabbitMQBrokerAdvanced } from '../messaging/rabbitmq-broker';
import { WhatsAppAdapter } from '../adapters/evolution-app.adapter';
import { EvolutionMediaMessageService } from '../services/evolution-media-message.service';
import { TranscriptionRepoPrisma } from '../repository/transcriber.prisma';
import { HandleChatInputUseCase } from '../../application/useCases/chat/handle-chat-input.use-case';
import { HandleVoiceInputUseCase } from '../../application/useCases/voice/handle-voice-input.use-case';
import { AppConversationOrchestratorUseCase } from '../../application/useCases/chat/app-conversation-orchestrator.use-case';
import { EvolutionController } from '../../application/controllers/evolution.controller';
import { TranscriberUseCase } from '../../application/useCases/transcriber/transcriber.use-case';
import { TranscriberController } from '../../application/controllers/transcriber.controller';
import { PlanStudyUseCase } from '../../application/useCases/plan-study/study-plan.use-case';
import { PlanStudyController } from '../../application/controllers/plan-study.controller';

/**
 * Container de injeção de dependências.
 * Centraliza a criação e configuração de todas as dependências do sistema.
 */
export class Container {
  private static _instance: Container;
  private _prismaClient: PrismaClient;
  private _rabbitMQBroker: RabbitMQBrokerAdvanced;
  private _evolutionMediaMessageService: EvolutionMediaMessageService;
  private _whatsAppAdapter: WhatsAppAdapter;
  private _transcriptionRepo: TranscriptionRepoPrisma;
  private _handleChatInputUseCase: HandleChatInputUseCase;
  private _handleVoiceInputUseCase: HandleVoiceInputUseCase;
  private _appConversationOrchestratorUseCase: AppConversationOrchestratorUseCase;
  private _evolutionController: EvolutionController;
  private _transcriberUseCase: TranscriberUseCase;
  private _transcriberController: TranscriberController;
  private _planStudyUseCase: PlanStudyUseCase;
  private _planStudyController: PlanStudyController;

  private constructor() {
    // Inicializa dependências comuns
    this._prismaClient = new PrismaClient();
    this._rabbitMQBroker = RabbitMQBrokerAdvanced.getInstance('amqp://localhost:5672');
    this._evolutionMediaMessageService = new EvolutionMediaMessageService();
    this._whatsAppAdapter = new WhatsAppAdapter();
    this._transcriptionRepo = new TranscriptionRepoPrisma(this._prismaClient);

    // Inicializa casos de uso e controllers
    this._handleChatInputUseCase = new HandleChatInputUseCase();
    this._handleVoiceInputUseCase = new HandleVoiceInputUseCase(
      this._evolutionMediaMessageService,
      this._rabbitMQBroker,
    );
    this._appConversationOrchestratorUseCase = new AppConversationOrchestratorUseCase(
      this._handleChatInputUseCase,
      this._handleVoiceInputUseCase,
      this._whatsAppAdapter,
    );
    this._evolutionController = new EvolutionController(this._appConversationOrchestratorUseCase);
    this._transcriberUseCase = new TranscriberUseCase(this._rabbitMQBroker, this._transcriptionRepo);
    this._transcriberController = new TranscriberController(this._transcriberUseCase);
    this._planStudyUseCase = new PlanStudyUseCase(this._rabbitMQBroker);
    this._planStudyController = new PlanStudyController(this._planStudyUseCase);
  }

  /**
   * Singleton para garantir uma única instância do container.
   */
  public static getInstance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();
    }
    return Container._instance;
  }

  /**
   * Inicializa dependências assíncronas, como o RabbitMQ.
   */
  public async init(): Promise<void> {
    await this._rabbitMQBroker.init();
  }

  // Getters para acessar as instâncias
  public get evolutionController(): EvolutionController {
    return this._evolutionController;
  }

  public get transcriberController(): TranscriberController {
    return this._transcriberController;
  }

  public get planStudyController(): PlanStudyController {
    return this._planStudyController;
  }

  // Método para limpeza (útil em testes)
  public async dispose(): Promise<void> {
    await this._prismaClient.$disconnect();
    // Adicione aqui outras limpezas, se necessário (ex.: fechar conexão com RabbitMQ)
  }
}

export const container = Container.getInstance();
