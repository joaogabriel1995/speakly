import { Slide, Alert, AlertTitle, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const AlertComponent: React.FC = () => {
  const { lastMessages } = useWebSocket();
  const [alertOpen, setAlertOpen] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const queue = "ee062683-856d-452e-85e5-3cd0390f7d21/alert";

  const [to, setTo] = useState<string>("");

  const navigate = useNavigate();

  const handleClick = (navigate: NavigateFunction, to: string) => {
    onClose(); // Fecha o alerta antes de navegar
    navigate(to);
  };

  const onClose = () => {
    setAlertOpen(false);
    setTranscriptionText(null);
  };

  useEffect(() => {
    if (lastMessages[queue]) {
      setTranscriptionText(lastMessages[queue]["text"]);
      setTo(lastMessages[queue]["path"]);
      setAlertOpen(true);
    }
  }, [lastMessages]);

  return (
    <Box
      position="fixed"
      right={16}
      top={80}
      zIndex={1300}
      width={300}
      onClick={() => handleClick(navigate, to)}
      sx={{ cursor: "pointer" }} // Adiciona cursor de clique
    >
      <Slide direction="left" in={alertOpen} mountOnEnter unmountOnExit>
        <Alert severity="success" onClose={onClose} sx={{ mb: 2 }}>
          <AlertTitle>Transcrição Concluída</AlertTitle>
          {transcriptionText || "Transcrição recebida com sucesso!"}
        </Alert>
      </Slide>
    </Box>
  );
};
