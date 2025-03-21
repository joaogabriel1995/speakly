import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  useTheme
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RepeatIcon from "@mui/icons-material/Repeat";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useState } from "react";

interface TaskCardProps {
  id: string;
  task: string;
  resource: string;
  skill: string;
  duration: number;
  repetitions: number;
  status: string;
  content?: string | null;
  day: number;
  onClick?: () => void;
}

const skillColors: Record<string, string> = {
  listening: "#4FC3F7",
  speaking: "#81C784",
  vocabulary: "#FFD54F",
  grammar: "#BA68C8",
  pronunciation: "#FF8A65",
  reading: "#64B5F6",
  writing: "#F06292"
};

const statusColors: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  NOT_STARTED: "default",
  IN_PROGRESS: "warning",
  COMPLETED: "success"
};

export const TaskCard = ({
  task,
  resource,
  skill,
  duration,
  repetitions,
  status,
  content,
  day,
  onClick
}: TaskCardProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        boxShadow: hovered ? "0 10px 30px rgba(0,0,0,0.35)" : "0 4px 12px rgba(0,0,0,0.25)",
        background: theme.palette.mode === "dark" ? "#1E232F" : "#F9FAFB",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : "#1E1E1E",
        maxWidth: 360,
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {task}
        </Typography>

        <Chip
          label={skill}
          size="small"
          sx={{
            backgroundColor: skillColors[skill.toLowerCase()] || "#E0E0E0",
            color: "#000",
            mb: 1
          }}
        />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {resource}
        </Typography>

        {content && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <DescriptionIcon sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }} />
            {content.length > 60 ? content.slice(0, 60) + "..." : content}
          </Typography>
        )}

        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2" display="flex" alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />
            Duração: {duration} min
          </Typography>
          <Typography variant="body2" display="flex" alignItems="center">
            <RepeatIcon sx={{ fontSize: 18, mr: 1 }} />
            Repetições: {repetitions}
          </Typography>
          <Typography variant="body2" display="flex" alignItems="center">
            <CalendarTodayIcon sx={{ fontSize: 18, mr: 1 }} />
            Dia: {day}
          </Typography>
        </Box>

        <Box mt={2}>
          <Chip
            label={status.replace("_", " ")}
            size="small"
            color={statusColors[status as keyof typeof statusColors]}
          />
        </Box>
      </CardContent>

      {onClick && (
        <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onClick}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              background: hovered ? "#1565C0" : "#1E88E5",
              '&:hover': {
                background: "#1565C0"
              }
            }}
          >
            Ver Detalhes
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
