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
        justifyContent: "center",
        alignItems: "center", // Centraliza verticalmente
        padding: 2,           // Aumenta o espaçamento interno
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: isDrawerOpen ? "space-between" : "center", // Ajusta o layout dinamicamente
        }}
      >
        {isDrawerOpen && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logoSvg} alt="Logo" style={{ width: "100px", height: "40px" }} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
