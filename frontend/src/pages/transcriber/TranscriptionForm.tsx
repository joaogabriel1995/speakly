import { useState } from "react";
import { transcriptionService } from "../../services/transcription.service";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  Fade,
  Alert,
  Tooltip,
  IconButton
} from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import MicIcon from '@mui/icons-material/Mic';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const TranscriptionForm: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleTranscribe = async () => {
    if (!url) {
      setError('Por favor, insira uma URL válida do YouTube');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Exemplo de chamada ao serviço de transcrição
      await transcriptionService.transcribeAudio(url);
      setSuccess(true);
      // Não precisamos armazenar a transcrição aqui, pois o componente Transcriber
      // a buscará via WebSocket e exibirá automaticamente
    } catch (err) {
      setError('Erro ao processar a transcrição. Verifique a URL e tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setUrl(clipboardText);
        setError(null);
      }
    } catch (err) {
      setError('Falha ao acessar a área de transferência');
      console.error(err);
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    setSuccess(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        padding: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #1E88E5 0%, #8E24AA 100%)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <YouTubeIcon color="error" fontSize="large" sx={{ mr: 1.5 }} />
        <Typography variant="h5" fontWeight="500" color="primary.light">
          Transcrição de Vídeo
        </Typography>
        <Tooltip title="Cole a URL de um vídeo do YouTube para transcrever o conteúdo de áudio para texto." arrow>
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlinedIcon fontSize="small" color="info" />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        label="URL do vídeo do YouTube"
        variant="outlined"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          if (error) setError(null);
          if (success) setSuccess(false);
        }}
        fullWidth
        disabled={loading}
        error={!!error}
        helperText={error}
        placeholder="https://www.youtube.com/watch?v=..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MicIcon color="secondary" />
            </InputAdornment>
          ),
          endAdornment: url && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 1.5,
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(79, 195, 247, 0.2)',
            }
          }
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Tooltip title="Colar da área de transferência" arrow>
          <Button
            variant="outlined"
            startIcon={<ContentPasteIcon />}
            onClick={handlePaste}
            disabled={loading}
            sx={{
              flex: 1,
              maxWidth: 200,
              height: 48
            }}
          >
            Colar URL
          </Button>
        </Tooltip>

        <Button
          variant="contained"
          color="primary"
          onClick={handleTranscribe}
          disabled={loading || !url}
          sx={{
            flex: 2,
            height: 48,
            fontWeight: 600,
            position: 'relative',
            overflow: 'hidden',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
              transform: 'translateX(-100%)',
              transition: 'transform 1s',
            },
            '&:hover:after': {
              transform: 'translateX(100%)',
            }
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Transcrevendo...
            </>
          ) : (
            "Transcrever Vídeo"
          )}
        </Button>
      </Box>

      {success && (
        <Fade in={success}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ mt: 1 }}
          >
            Transcrição iniciada! O resultado aparecerá abaixo em instantes.
          </Alert>
        </Fade>
      )}
    </Paper>
  );
};

export default TranscriptionForm;
