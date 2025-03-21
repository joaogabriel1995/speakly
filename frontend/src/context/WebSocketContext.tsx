import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  ws: WebSocket | null;
  lastMessages: Record<string, any>; // Armazena última mensagem por fila
  sendMessage: (queue: string, message: object) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessages, setLastMessages] = useState<Record<string, any>>({});

  useEffect(() => {
    const queues = [
      'ee062683-856d-452e-85e5-3cd0390f7d21/alert',
      'ee062683-856d-452e-85e5-3cd0390f7d21/transcription',
      'ee062683-856d-452e-85e5-3cd0390f7d21/planStudy',

    ];
    const websocket = new WebSocket('ws://localhost:8091');

    websocket.onopen = () => {
      queues.forEach((queue) => {
        websocket.send(JSON.stringify({ queue }));
      });
    };

    websocket.onmessage = (event) => {
      console.log("aqui")
      const data = JSON.parse(event.data);

      if (data.queue && data.content) {
        setLastMessages((prev) => ({
          ...prev,
          [data.queue]: data.content, // Atualiza a mensagem apenas da fila correspondente
        }));
      }
    };

    websocket.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    websocket.onclose = () => {
      setWs(null);
      setLastMessages({});
    };

    setWs(websocket);

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const sendMessage = (queue: string, message: object) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ queue, content: message }));
    } else {
      console.warn('WebSocket não está conectado');
    }
  };

  return (
    <WebSocketContext.Provider value={{ ws, lastMessages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};
