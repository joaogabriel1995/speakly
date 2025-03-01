import { Box, Typography } from "@mui/material";
import { Content } from "../../components/layout/Content";
import TranscriptionForm from "./TranscriptionForm";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/WebSocketContext";

export const Transcriber: React.FC = () => {
  const { lastMessages } = useWebSocket();
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const queue = "ee062683-856d-452e-85e5-3cd0390f7d21/transcription"

  useEffect(() => {
    if (lastMessages[queue]) {
      setTranscriptionText(null); // Limpa o texto atual
      console.log(lastMessages[queue])
      setIsTyping(true); // Ativa o efeito de digitação
      setTimeout(() => {
        setTranscriptionText(lastMessages[queue]["text"]); // Exibe o texto após o delay
        setIsTyping(false); // Desativa o efeito
      }, 1500); // Delay de 1.5 segundos para simular digitação

    }
  }, [lastMessages]);


  return (
    <Content title="Conversor de YouTube para Texto">
      <Box
        display="flex"
        flexDirection="column"
        width="100"
        maxWidth="900px" // Largura máxima para centralizar
        minHeight="80vh" // Altura mínima para ocupar a tela
        margin="0 auto"
        marginBottom={10}
        padding={3}
        sx={{
          bgcolor: "transparent", // Fundo transparente para usar o fundo do <Content>
          color: "#ffffff", // Texto branco
        }}
      >
        <Box mb={3} display="flex" justifyContent="center">
          <Box width="100%" maxWidth="600px">
            <TranscriptionForm />
          </Box>
        </Box>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          gap={2}
          mb={4}
          sx={{
            margin: "20px",        // Define a margem
            maxHeight: "500px",     // Altura máxima para exibir a rolagem
            overflowY: "auto",      // Ativa o scroll vertical
            padding: 2,
            borderRadius: "8px",
            bgcolor: "#1e1e1e",
          }}
        >
          {isTyping || transcriptionText ? (
            <Box
              sx={{
                bgcolor: "#2a2a2a",
                borderRadius: "12px",
                padding: 2,
                maxWidth: "80%",
                alignSelf: "flex-start",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
                animation: isTyping
                  ? "typing 1.5s steps(20, end)"
                  : "fadeIn 0.5s ease-in",
                "@keyframes typing": {
                  from: { width: 0, opacity: 0.5 },
                  to: { width: "100%", opacity: 1 },
                },
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(10px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#d1d1d1",
                  whiteSpace: "pre-wrap",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {isTyping ? (
                  <span>
                    Digitando
                    <span className="dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </span>
                ) : (
                  transcriptionText
                )}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "#666666",
                textAlign: "center",
                mt: 4,
              }}
            >
              Aguardando transcrição...
            </Typography>
          )}
        </Box>

      </Box>
    </Content>
  );
};
