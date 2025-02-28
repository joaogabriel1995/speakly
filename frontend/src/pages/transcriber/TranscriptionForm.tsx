import { useState } from "react";
import { transcriptionService } from "../../services/transcriptionService";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

const TranscriptionForm: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  const handleTranscribe = async () => {
    if (!url) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    setLoading(true);
    setError(null);
    setTranscription(null);

    try {
      // Exemplo de chamada ao serviço de transcrição
      const response = await transcriptionService.transcribeAudio(url);
      setTranscription(response.text); // Ajuste conforme a estrutura da resposta da API
    } catch (err) {
      setError('Erro ao processar a transcrição');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 500,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <TextField
        label="URL do áudio"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        disabled={loading}
        error={!!error}
        helperText={error}
        placeholder="https://exemplo.com/audio.mp3"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTranscribe}
        disabled={loading || !url}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Transcrevendo...' : 'Transcrever'}
      </Button>

      {/* Exibir resultado da transcrição, se houver */}
      {transcription && (
        <Box sx={{ mt: 2 }}>
          <strong>Transcrição:</strong>
          <p>{transcription}</p>
        </Box>
      )}
    </Box>
  );
};

export default TranscriptionForm;
