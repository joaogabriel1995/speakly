import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Fade,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
  Skeleton
} from "@mui/material";
import { Content } from "../../components/layout/Content";
import TranscriptionForm from "./TranscriptionForm";
import { useWebSocket } from "../../context/WebSocketContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export const Transcriber: React.FC = () => {
  const { lastMessages } = useWebSocket();
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const queue = "ee062683-856d-452e-85e5-3cd0390f7d21/transcription";

  useEffect(() => {
    if (lastMessages[queue]) {
      setTranscriptionStarted(true);
      setTranscriptionText(null); // Limpa o texto atual
      setIsTyping(true); // Ativa o efeito de digitação

      setTimeout(() => {
        setTranscriptionText(lastMessages[queue]["text"]); // Exibe o texto após o delay
        setIsTyping(false); // Desativa o efeito

        // Rolagem suave para os resultados
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500); // Delay de 1.5 segundos para simular digitação
    }
  }, [lastMessages]);

  const copyToClipboard = () => {
    if (transcriptionText) {
      navigator.clipboard.writeText(transcriptionText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Erro ao copiar: ', err));
    }
  };

  const downloadTranscription = () => {
    if (transcriptionText) {
      const element = document.createElement("a");
      const file = new Blob([transcriptionText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "transcricao.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const speakTranscription = () => {
    if (transcriptionText && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(transcriptionText);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Content title="Conversor de YouTube para Texto">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth="800px"
        minHeight="80vh"
        margin="0 auto"
        marginBottom={5}
        padding={3}
        gap={4}
        sx={{ position: 'relative' }} // Adicionado para estabelecer um contexto de posicionamento
      >
        <Fade in={true} timeout={800}>
          <Box mb={3} sx={{ position: 'relative', zIndex: 2 }}> {/* Garantindo que este elemento esteja acima */}
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                mb: 1,
                backgroundImage: 'linear-gradient(90deg, #4FC3F7, #BA68C8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              Transcrição Inteligente
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
            >
              Converta qualquer vídeo do YouTube em texto de forma rápida e precisa. Ideal para estudos, pesquisas e acessibilidade.
            </Typography>

            <TranscriptionForm />
          </Box>
        </Fade>

        <Fade in={transcriptionStarted} timeout={1000}>
          <Box ref={resultRef} sx={{ zIndex: 1, position: 'relative' }}> {/* Definindo posição relativa e z-index menor */}
            {transcriptionStarted && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.light',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <AutoFixHighIcon />
                  Resultado da Transcrição
                </Typography>

                {transcriptionText && !isTyping && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Copiar texto" arrow>
                      <Button
                        startIcon={<ContentCopyIcon />}
                        variant="outlined"
                        size="small"
                        color={copied ? "success" : "primary"}
                        onClick={copyToClipboard}
                      >
                        {copied ? "Copiado!" : "Copiar"}
                      </Button>
                    </Tooltip>
                    <Tooltip title="Baixar como TXT" arrow>
                      <IconButton onClick={downloadTranscription} color="primary" size="small">
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ouvir texto" arrow>
                      <IconButton onClick={speakTranscription} color="secondary" size="small">
                        <VolumeUpIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            )}

            <Paper
              elevation={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                minHeight: '300px',
                maxHeight: '500px',
                overflowY: 'auto',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(79, 195, 247, 0.6)',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 195, 247, 0.8)',
                  },
                },
              }}
            >
              {isTyping ? (
                <Box sx={{ p: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.6 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.6 }
                    }
                  }}>
                    <CircularProgress size={20} color="primary" />
                    <Typography color="primary.light">
                      Processando transcrição...
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Skeleton animation="wave" height={20} width="90%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                    <Skeleton animation="wave" height={20} width="75%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                    <Skeleton animation="wave" height={20} width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                    <Skeleton animation="wave" height={20} width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                    <Skeleton animation="wave" height={20} width="70%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                  </Box>
                </Box>
              ) : transcriptionText ? (
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      whiteSpace: 'pre-wrap',
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: 1.8,
                      letterSpacing: '0.015em',
                      textAlign: 'justify',
                      animation: 'fadeIn 0.5s ease-in',
                      '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translateY(10px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    {transcriptionText}
                  </Typography>
                </Box>
              ) : transcriptionStarted ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '200px',
                  }}
                >
                  <CircularProgress size={40} color="secondary" sx={{ mb: 2 }} />
                  <Typography color="text.secondary" variant="body2">
                    Iniciando transcrição...
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '200px',
                    gap: 2,
                  }}
                >
                  <SentimentSatisfiedAltIcon
                    sx={{
                      fontSize: 60,
                      opacity: 0.7,
                      color: 'secondary.light'
                    }}
                  />
                  <Typography
                    color="text.secondary"
                    variant="body1"
                    align="center"
                    sx={{ maxWidth: '80%' }}
                  >
                    Cole o link de um vídeo do YouTube acima e clique em "Transcrever Vídeo" para obter a transcrição do áudio.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Box>
    </Content>
  );
};
