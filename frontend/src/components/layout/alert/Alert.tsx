import { Slide, Alert, AlertTitle  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";




export const AlertComponent: React.FC = () => {
    const { lastMessage } = useWebSocket();
    const [alertOpen, setAlertOpen] = useState(false);
    const [transcriptionText, setTranscriptionText] = useState<string | null>(null);



    useEffect(() => {
      if (lastMessage?.transcriptionData.status === 'completed') {
        setTranscriptionText(lastMessage.transcriptionData.as);
        setAlertOpen(true);

        const timer = setTimeout(() => {
          setAlertOpen(false);
        }, 5000);

        return () => clearTimeout(timer); }
    }, [lastMessage]);
  return (
    <Slide direction="left" in={alertOpen} mountOnEnter unmountOnExit>
      <Alert
        severity="success"
        onClose={() => setAlertOpen(false)}
        sx={{ mb: 2 }}
      >
        <AlertTitle
        >Transcrição Concluída</AlertTitle>
        {transcriptionText || 'Transcrição recebida com sucesso!'}
      </Alert>
    </Slide>

  )
}
