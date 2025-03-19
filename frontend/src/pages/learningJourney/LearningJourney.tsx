import { useEffect, useState } from 'react';
import { Content } from '../../components/layout/Content';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  useTheme,
  IconButton,
  Stack,
  Tooltip,
  Button
} from '@mui/material';
import { useParams } from "react-router-dom";
import { learningJourneyServices, ListFromSettingsResponse } from '../../services/learning-journey.service';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';

export const JourneyDetails = () => {
  const { learningJourneyId } = useParams();
  const [journey, setJourney] = useState<ListFromSettingsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Set<number>>(new Set());
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (!learningJourneyId) return;
      setLoading(true);
      try {
        const data = await learningJourneyServices.listFromSettingId(learningJourneyId);
        setJourney(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [learningJourneyId]);

  const getMonthLabel = (month: number) => `Mês ${month}`;

  const toggleMonth = (month: number) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(month)) {
        newSet.delete(month);
      } else {
        newSet.add(month);
      }
      return newSet;
    });
  };

  const handleClickButton = (id: string, objective: string, activity: string, theory: string ) => {
    console.log(id,objective, activity, theory, learningJourneyId)
  }


  // Agrupar dados por mês
  const groupByMonth = () => {
    const groups = new Map();
    journey.forEach(item => {
      if (!groups.has(item.month)) {
        groups.set(item.month, []);
      }
      groups.get(item.month).push(item);
    });
    return groups;
  };

  const monthGroups = groupByMonth();
  const months = [...monthGroups.keys()].sort((a, b) => a - b);

  if (loading) {
    return (
      <Content title="Meus Planos de Estudos">
        <Box mb={3}>
          <Skeleton variant="rectangular" height={100} />
        </Box>
        <Skeleton variant="rectangular" height={400} />
      </Content>
    );
  }

  return (
    <Content title="Meus Planos de Estudos">
      <Box mb={3}>
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom color="primary">
                  Plano de Estudos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Este é seu plano personalizado com {journey.length} atividades distribuídas em {months.length} meses.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Compartilhar">
                    <IconButton color="primary">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Imprimir">
                    <IconButton color="primary">
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Baixar PDF">
                    <IconButton color="primary">
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {months.map(month => (
        <Card key={month} elevation={3} sx={{ mb: 3 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              cursor: 'pointer'
            }}
            onClick={() => toggleMonth(month)}
          >
            <Box display="flex" alignItems="center">
              <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                {getMonthLabel(month)}
              </Typography>
              <Chip
                label={`${monthGroups.get(month).length} Semanas`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 2 }}
              />
            </Box>
            <IconButton
              sx={{
                transform: expandedMonths.has(month) ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          {expandedMonths.has(month) && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="15%">Semana</TableCell>
                    <TableCell width="25%">Objetivo</TableCell>
                    <TableCell width="30%">Atividade</TableCell>
                    <TableCell width="30%">Teoria</TableCell>
                    <TableCell width="30%">Options</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthGroups.get(month).map((item: ListFromSettingsResponse) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Chip
                          label={`Semana ${item.week}`}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 'medium' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="flex-start">
                          <FlagIcon fontSize="small" color="primary" sx={{ mt: 0.5, mr: 1, opacity: 0.7 }} />
                          <Typography variant="body2">{item.objective}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="flex-start">
                          <SchoolIcon fontSize="small" color="primary" sx={{ mt: 0.5, mr: 1, opacity: 0.7 }} />
                          <Typography variant="body2">{item.activity}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="flex-start">
                          <DescriptionIcon fontSize="small" color="primary" sx={{ mt: 0.5, mr: 1, opacity: 0.7 }} />
                          <Typography variant="body2">{item.theory}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="flex-start">
                          <Button onClick={() => handleClickButton(item.objective, item.activity, item.theory)}> Gerar Plano </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      ))}

      {journey.length === 0 && !loading && (
        <Card elevation={3}>
          <CardContent>
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Nenhum plano de estudos encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                O plano de estudos solicitado não está disponível ou não existe.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Content>
  );
};
