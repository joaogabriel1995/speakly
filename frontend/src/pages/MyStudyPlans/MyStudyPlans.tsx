import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import { Content } from "../../components/layout/Content";
import { LearningSettingsResponse, learningSettingsServices } from '../../services/learning.service';
import { LearningSettingCard } from './LearningSettingCard';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { pathRoutes } from '../../routes/paths';

export const MyStudyPlans = () => {
  const navigate = useNavigate();
  const [learningSettings, setLearningSettings] = useState<LearningSettingsResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = "ee062683-856d-452e-85e5-3cd0390f7d21";

  const handleClick = (navigate: NavigateFunction, to: string) => {
    navigate(to);
  };

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await learningSettingsServices.listFromUserId(userId);
        setLearningSettings(response);
      } catch (error) {
        setError("Erro ao carregar os planos de estudo. Tente novamente mais tarde.");
        console.error("Erro ao buscar os planos de estudo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <Content title="Meus Planos de Estudos">
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        py: 3,
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : learningSettings && learningSettings.length > 0 ? (
          learningSettings.map((learningSetting) => (
            <LearningSettingCard
              key={learningSetting.id}
              id={learningSetting.id}
              level={learningSetting.level}
              duration={learningSetting.duration}
              daysWeek={learningSetting.daysWeek}
              hourDay={learningSetting.hourDay}
              ctaText="Ver detalhes"
              onClick={() => handleClick(navigate, `${pathRoutes.STUDY_PLAN_LIST}/${learningSetting.id}`)}
              progress={50} // Exemplo de progresso, você pode calcular isso dinamicamente
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Nenhum plano de estudos encontrado.
          </Typography>
        )}
      </Box>
    </Content>
  );
};

export default MyStudyPlans;
