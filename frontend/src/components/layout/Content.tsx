import { Box, Typography, useTheme } from "@mui/material"
import { useDrawerContext } from "../../context/DrawerContext"
import { AlertComponent } from "./alert/Alert"


interface IContentProps {
  title: string
  children: React.ReactNode
}

export const Content: React.FC<IContentProps> = ({ children, title }: IContentProps) => {
  const { isDrawerOpen } = useDrawerContext();
  const theme = useTheme();
  const MARGIN_LEFT = 16;
  const drawerWidth = isDrawerOpen ? 250 + MARGIN_LEFT : 70 + MARGIN_LEFT;


  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        padding: 3,
        transition: theme.transitions.create("margin-left", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <AlertComponent />
      <Box padding={theme.spacing(2)} height={theme.spacing(8)} textAlign={"center"} display={"flex"} alignItems={"center"}>
        <Typography variant="h3" sx={{ marginLeft: '2.5%' }}>
          {title}
        </Typography>
      </Box >
      <Box padding={theme.spacing(2)} flex={1} overflow="auto">
        {children}
      </Box>
    </Box>)
}
