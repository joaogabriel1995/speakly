import { Box, Button, Card, CardActions, CardContent, Typography, LinearProgress } from "@mui/material";
import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';

interface ModernCardProps {
  id: string;
  level: string;
  duration: number; // em semanas ou meses, dependendo do contexto
  daysWeek: number;
  hourDay: number;
  ctaText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  progress?: number; // progresso do plano (0 a 100, opcional)
}

const levelColors: Record<string, string> = {
  beginner: '#4CAF50', // Verde para iniciante
  intermediate: '#FFCA28', // Amarelo para intermediário
  advanced: '#F44336', // Vermelho para avançado
};

export const LearningSettingCard = ({
  id,
  level,
  duration,
  daysWeek,
  hourDay,
  ctaText,
  onClick,
  progress,
}: ModernCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: isHovered
          ? '0 10px 30px rgba(0, 0, 0, 0.4)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        background: 'linear-gradient(145deg, #1E232F, #1A1F2A)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        maxWidth: 340,
        minHeight: 300, // Aumentar para caber mais informações
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Título com ID e nível */}
        <Box display="flex" alignItems="center" mb={2}>
          <SchoolIcon
            sx={{
              color: levelColors[level.toLowerCase()] || '#4FC3F7',
              mr: 1.5,
              fontSize: '24px',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.01em',
              color: '#FFFFFF',
              fontFamily: '"Inter", "Segoe UI", sans-serif',
            }}
          >
            {`Plano #${id.slice(0, 8)}`}
          </Typography>
        </Box>

        {/* Informações do plano */}
        <Box mb={2}>
          <Typography
            variant="body2"
            sx={{
              color: '#B0BEC5',
              fontFamily: '"Inter", "Segoe UI", sans-serif',
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <SchoolIcon sx={{ mr: 1, fontSize: '18px', color: levelColors[level.toLowerCase()] }} />
            Nível: {level}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0BEC5',
              fontFamily: '"Inter", "Segoe UI", sans-serif',
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <AccessTimeIcon sx={{ mr: 1, fontSize: '18px', color: '#4FC3F7' }} />
            Duração: {duration} semanas
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0BEC5',
              fontFamily: '"Inter", "Segoe UI", sans-serif',
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <CalendarTodayIcon sx={{ mr: 1, fontSize: '18px', color: '#4FC3F7' }} />
            {daysWeek} dias/semana, {hourDay}h/dia
          </Typography>
        </Box>

        {/* Progresso (se disponível) */}
        {progress !== undefined && (
          <Box mb={2}>
            <Typography
              variant="body2"
              sx={{
                color: '#B0BEC5',
                fontFamily: '"Inter", "Segoe UI", sans-serif',
                mb: 1,
              }}
            >
              Progresso:
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#2A2F3A',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: levelColors[level.toLowerCase()] || '#4FC3F7',
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#B0BEC5',
                fontFamily: '"Inter", "Segoe UI", sans-serif',
                textAlign: 'right',
                mt: 0.5,
              }}
            >
              {progress}%
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 24px',
            background: isHovered ? '#1565C0' : '#1E88E5',
            boxShadow: isHovered ? '0 4px 12px rgba(30, 136, 229, 0.3)' : 'none',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            '&:hover': {
              background: '#1565C0',
            },
          }}
        >
          {ctaText}
        </Button>
      </CardActions>
    </Card>
  );
};
