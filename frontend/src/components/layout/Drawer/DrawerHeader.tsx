import { Box, IconButton } from "@mui/material";
import { useDrawerContext } from "../../../context/DrawerContext";
import MenuIcon from "@mui/icons-material/Menu";
import logoSvg from "../../../assets/images/logoipsum-288.svg";

export const DrawerHeader: React.FC = () => {
  const { toggleDrawerOpen, isDrawerOpen } = useDrawerContext();

  return (
    <Box
      sx={{
        height: "20%",
        display: "flex",
        justifyContent: "center", // Centraliza o conteúdo horizontalmente
        alignItems: "start",    // Centraliza verticalmente
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",         // Ocupa toda a largura disponível
          justifyContent: isDrawerOpen ? "space-between" : "center", // Ajusta o layout
          padding: 1,           // Espaçamento interno
        }}
      >
        {isDrawerOpen && (
          <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
            <img src={logoSvg} alt="Logo" style={{ width: "100px", height: "40px" }} />
          </Box>
        )}
        <Box
          sx={{
            width: isDrawerOpen ? "20%" : "100%", // 20% aberto, 100% fechado
            display: "flex",
            justifyContent: "center",             // Centraliza o botão
            alignItems: "center",                // Centraliza verticalmente
          }}
        >
          <IconButton color="inherit" onClick={toggleDrawerOpen}>
            <MenuIcon sx={{ width: "24px" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
