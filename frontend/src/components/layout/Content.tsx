import { Box, Typography, useTheme } from "@mui/material"
import { useDrawerContext } from "../../context/DrawerContext"
import { AlertComponent } from "./alert/Alert"

interface IContentProps {
  title: string
  children: React.ReactNode
}

export const Content: React.FC<IContentProps> = ({ children, title }) => {
  const { isDrawerOpen } = useDrawerContext();
  const theme = useTheme();

  const MARGIN_LEFT = 16;
  const drawerWidth = isDrawerOpen ? 250 + MARGIN_LEFT : 70 + MARGIN_LEFT;

  return (
    <Box
    sx={{
      // Torna o container flex, ocupando a tela inteira em altura
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",

      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create("margin-left", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }}
    >
      {/* Alerta (caso exista) */}
      <AlertComponent />

      {/* Título - Fixed at top */}
      <Box
        sx={{
          padding: theme.spacing(2),
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: 10
        }}
      >
        <Typography variant="h3" sx={{ marginLeft: "2.5%" }}>
          {title}
        </Typography>
      </Box>

      {/* Scrollable content container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Enable vertical scrolling
          overflowX: "hidden", // Prevent horizontal scrolling
          padding: theme.spacing(3),
          // Ensure the content area takes the remaining height
          height: "calc(100vh - 80px)", // Subtract header height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
