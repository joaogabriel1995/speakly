import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
import { Content } from "../../components/layout/Content";

// Componente de Card Moderno com cores adaptadas para o tema escuro
const ModernCard = ({ title, description, ctaText, icon }) => {
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
        minHeight: 200,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          {icon && (
            <Box mr={1.5} sx={{
              color: '#4FC3F7',  // Azul claro do tema
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.9,
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}>
              {icon}
            </Box>
          )}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.01em',
              color: '#FFFFFF',  // Branco para o título
              fontFamily: '"Inter", "Segoe UI", sans-serif',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            color: '#B0BEC5',  // Cinza claro para texto secundário
            fontFamily: '"Inter", "Segoe UI", sans-serif',
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 24px',
            background: isHovered ? '#1565C0' : '#1E88E5',  // Tons do tema
            boxShadow: isHovered ? '0 4px 12px rgba(30, 136, 229, 0.3)' : 'none',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            '&:hover': {
              background: '#1565C0',
            }
          }}
        >
          {ctaText}
        </Button>
      </CardActions>
    </Card>
  );
};

// Exemplo de implementação na sua página
export const MyStudyPlans = () => {
  return (
    <Content title="Meus Planos de Estudos">
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        py: 3
      }}>
        <ModernCard
          title="Plano Personalizado"
          description="Um plano de estudos adaptado às suas necessidades, com conteúdos organizados por prioridade e tempo disponível."
          ctaText="Ver detalhes"
          icon={<span style={{ fontSize: '24px' }}>📚</span>}
        />

        <ModernCard
          title="Cronograma Semanal"
          description="Organize seus estudos com um cronograma semanal inteligente que otimiza seu tempo e maximiza seu aprendizado."
          ctaText="Acessar agora"
          icon={<span style={{ fontSize: '24px' }}>📅</span>}
        />

        <ModernCard
          title="Progresso e Metas"
          description="Acompanhe seu progresso e defina metas alcançáveis para manter-se motivado durante toda sua jornada de estudos."
          ctaText="Visualizar"
          icon={<span style={{ fontSize: '24px' }}>📈</span>}
        />
      </Box>
    </Content>
  );
};

export default MyStudyPlans;
