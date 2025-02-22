/** Representa uma requisição HTTP recebida */
export interface Request<T = unknown> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
    headers?: Record<string, any>;
    body: T;
  }

  /** Representa uma resposta HTTP retornada */
  export interface Response<T = unknown> {
    statusCode: number;
    body: T | null;
    error?: {
      message: string;
      code?: string;
    };
  }

  /** Define o contrato de um controlador */
  export interface Controller<TRequest = unknown, TResponse = unknown> {
    handle(request: Request<TRequest>): Promise<Response<TResponse>>;
  }
