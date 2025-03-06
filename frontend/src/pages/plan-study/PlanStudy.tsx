import React, { useEffect, useRef, useState } from "react";
import PlanStudyForm from "./PlanStudyForm";
import { Content } from "../../components/layout/Content";
import { useWebSocket } from "../../context/WebSocketContext";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
  Skeleton,
  Divider,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";

interface PlanItem {
  Objective: string;
  Activity: string;
  Week: number;
  Month: number;
  Theory: string;
}

interface PlanData {
  plan: PlanItem[];
  userId: string;
}

export const PlanStudyPage: React.FC = () => {
  const { lastMessages } = useWebSocket();
  const theme = useTheme();
  const queue = "ee062683-856d-452e-85e5-3cd0390f7d21/planStudy";

  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Group plan items by month for better organization
  const groupedByMonth = React.useMemo(() => {
    if (!planData?.plan) return null;

    const grouped: Record<number, PlanItem[]> = {};
    planData.plan.forEach(item => {
      if (!grouped[item.Month]) {
        grouped[item.Month] = [];
      }
      grouped[item.Month].push(item);
    });

    return grouped;
  }, [planData]);

  useEffect(() => {
    if (lastMessages[queue]) {
      setPlanData(null);
      setIsGenerating(true);

      // Simulate generation delay (1.5s)
      setTimeout(() => {
        setPlanData(lastMessages[queue] as PlanData);
        setIsGenerating(false);

        // Smooth scroll to results after a small delay to ensure rendering is complete
        setTimeout(() => {
          if (resultRef.current) {
            resultRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }, 100);
      }, 1500);
    }
  }, [lastMessages, queue]);

  return (
    <Content title="English Study Plan Generator">
      <Box ref={formRef} sx={{ mb: 6 }}>
        <PlanStudyForm />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Loading state */}
      {isGenerating && (
        <Fade in={isGenerating}>
          <Box sx={{ mt: 4, px: 2 }}>
            <Typography variant="h6" gutterBottom>
              Generating your personalized study plan...
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  variant="rectangular"
                  height={60}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      )}

      {/* Results section */}
      {planData && planData.plan && (
        <>

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{
                mb: 3,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Your Personalized Study Plan
            </Typography>

            {groupedByMonth ? (
              Object.entries(groupedByMonth).map(([month, items]) => (
                <Box key={month} sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2
                    }}
                  >
                    <Chip
                      label={`Month ${month}`}
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        px: 2
                      }}
                    />
                    <Divider
                      sx={{
                        flex: 1,
                        ml: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.3)
                      }}
                    />
                  </Box>

                  <TableContainer
                    component={Paper}
                    elevation={2}
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      overflow: "hidden"
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }}
                        >
                          <TableCell width="10%">Week</TableCell>
                          <TableCell width="40%">Objective</TableCell>
                          <TableCell width="50%">Activity</TableCell>
                          <TableCell width="50%">Theory</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:nth-of-type(odd)": {
                                bgcolor: alpha(theme.palette.action.hover, 0.2),
                              },
                              "&:hover": {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                              },
                              transition: "background-color 0.2s"
                            }}
                          >
                            <TableCell>{item.Week}</TableCell>
                            <TableCell>{item.Objective}</TableCell>
                            <TableCell>{item.Activity}</TableCell>
                            <TableCell>{item.Theory}</TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))
            ) : (
              <Typography>No plan data available</Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
              >
                Plan generated for your specific needs and schedule.
                Follow this plan consistently for optimal results.
              </Typography>
            </Box>
            </>

      )}
    </Content>
  );
};
