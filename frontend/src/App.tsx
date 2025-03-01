import { Box } from "@mui/material"
import { LayoutBase } from "./components/layout/LayoutBase"
import { DrawerProvider } from "./context/DrawerContext"
import { AppThemeProvider } from "./context/ThemeContext"
import './assets/styles/global.css'; // Import global CSS
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { WebSocketProvider } from './context/WebSocketContext';

export const App = () => {

  return (
    <Box height={"100vh"} display={"flex"} flexDirection={"column"}>

      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <WebSocketProvider>
              <LayoutBase >
                <AppRoutes />
              </LayoutBase>
            </WebSocketProvider>
          </BrowserRouter>
        </DrawerProvider>

      </AppThemeProvider>
    </Box>
  )
}

export default App
