/** Representa uma requisição HTTP recebida */
export interface IRequest<T = unknown> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
    headers?: Record<string, any>;
    body: T;
  }

  /** Representa uma resposta HTTP retornada */
  export interface IResponse<T = unknown> {
    statusCode: number;
    body: T | null;
    error?: {
      message: string;
      code?: string;
    };
  }

  /** Define o contrato de um controlador */
  export interface IController<TRequest = unknown, TResponse = unknown> {
    handle(request: IRequest<TRequest>): Promise<IResponse<TResponse>>;
  }
