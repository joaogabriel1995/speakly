import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  ws: WebSocket | null;
  lastMessage: any;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const userId = 'ee062683-856d-452e-85e5-3cd0390f7d21';
    console.log('Iniciando conexão WebSocket...');
    const websocket = new WebSocket('ws://localhost:8091');

    websocket.onopen = () => {
      console.log('Conexão WebSocket aberta com sucesso!');
      websocket.send(JSON.stringify({ userId }));
      console.log('Mensagem com userId enviada:', userId);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Mensagem recebida do servidor:', data);
      setLastMessage(data);
    };

    websocket.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    websocket.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

    setWs(websocket);
    console.log('WebSocket configurado, aguardando conexão...');

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
        console.log('Conexão WebSocket encerrada pelo cleanup');
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};
