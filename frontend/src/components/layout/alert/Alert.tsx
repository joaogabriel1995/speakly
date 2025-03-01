import { Slide, Alert, AlertTitle, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";




export const AlertComponent: React.FC = () => {
  const { lastMessages } = useWebSocket();
  const [alertOpen, setAlertOpen] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const queue ="ee062683-856d-452e-85e5-3cd0390f7d21/alert"

  useEffect(() => {
    if (lastMessages[queue]) {
        setTranscriptionText(lastMessages[queue]["text"]); // Exibe o texto após o delay
        setAlertOpen(true)
      }

  }, [lastMessages]);

  return (

    <Box
      position="fixed"
      right={16}
      top={80} // Ajuste conforme o header ou layout
      zIndex={1300} // Acima de outros elementos
      width={300} // Largura fixa do alerta
    >

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

    </Box>
  )
}
