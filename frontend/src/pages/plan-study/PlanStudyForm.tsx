import { useState } from "react";
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
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MicIcon from "@mui/icons-material/Mic";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { planStudyService } from "../../services/plan-study.service";

const PlanStudyForm: React.FC = () => {
  // Estado para os inputs do formulário
  const [formData, setFormData] = useState({
    level: "",
    duration: "",
    daysWeek: "",
    hourDay: "",
    userId: ""
  });

  // Estados para controle de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Função para lidar com mudanças nos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para limpar um campo específico
  const handleClear = (field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const userId = "ee062683-856d-452e-85e5-3cd0390f7d21"
    try {
      // Ajuste conforme a implementação real do transcriptionService
      const response = await planStudyService.plan(
        formData.level,
        Number(formData.duration),
        Number(formData.daysWeek),
        Number(formData.hourDay),
        userId
      );

      console.log("Plano gerado:", response);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao gerar o plano. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Criar Plano de Estudo de Inglês
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Preencha os campos abaixo para gerar seu plano personalizado.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="level-label">Nível Atual</InputLabel>
            <Select
              labelId="level-label"
              name="level"
              value={formData.level}
              onChange={handleChange}
              label="Nível Atual"
              endAdornment={
                formData.level && (
                  <InputAdornment position="end" sx={{ mr: 3 }}>
                    <IconButton onClick={() => handleClear("level")} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              <MenuItem value="iniciante">Iniciante</MenuItem>
              <MenuItem value="intermediário">Intermediário</MenuItem>
              <MenuItem value="avançado">Avançado</MenuItem>
            </Select>
            <Tooltip title="Selecione seu nível atual de inglês">
              <InfoOutlinedIcon sx={{ position: "absolute", right: 10, top: 20, color: "action.active" }} />
            </Tooltip>
          </FormControl>

          {/* Campo Duração (Select) */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="duration-label">Duração (Meses)</InputLabel>
            <Select
              labelId="duration-label"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              label="Duração (Meses)"
              endAdornment={
                formData.duration && (
                  <InputAdornment position="end" sx={{ mr: 3 }}>
                    <IconButton onClick={() => handleClear("duration")} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "mês" : "meses"}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title="Selecione a duração do plano em meses">
              <InfoOutlinedIcon sx={{ position: "absolute", right: 10, top: 20, color: "action.active" }} />
            </Tooltip>
          </FormControl>

          {/* Campo Dias por Semana */}
          <TextField
            label="Dias por Semana"
            name="daysWeek"
            value={formData.daysWeek}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            inputProps={{ min: 1, max: 7 }}
            placeholder="Ex.: 5"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Quantos dias por semana você pode estudar">
                    <InfoOutlinedIcon sx={{ color: "action.active", mr: 1 }} />
                  </Tooltip>
                  {formData.daysWeek && (
                    <IconButton onClick={() => handleClear("daysWeek")} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />

          {/* Campo Horas por Dia */}
          <TextField
            label="Horas por Dia"
            name="hourDay"
            value={formData.hourDay}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="number"
            inputProps={{ min: 1, max: 24 }}
            placeholder="Ex.: 1"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Quantas horas por dia você pode dedicar">
                    <InfoOutlinedIcon sx={{ color: "action.active", mr: 1 }} />
                  </Tooltip>
                  {formData.hourDay && (
                    <IconButton onClick={() => handleClear("hourDay")} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />

          {/* Feedback de erro ou sucesso */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Plano gerado com sucesso!
            </Alert>
          )}

          {/* Botão de envio */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Gerando..." : "Gerar Plano"}
          </Button>
        </Box>

        {/* Ícones decorativos */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Tooltip title="Vídeo do YouTube (futuro)">
            <YouTubeIcon color="disabled" />
          </Tooltip>
          <Tooltip title="Colar transcrição (futuro)">
            <ContentPasteIcon color="disabled" />
          </Tooltip>
          <Tooltip title="Gravar áudio (futuro)">
            <MicIcon color="disabled" />
          </Tooltip>
        </Box>
      </Paper>
    </Fade>
  );
};

export default PlanStudyForm;
