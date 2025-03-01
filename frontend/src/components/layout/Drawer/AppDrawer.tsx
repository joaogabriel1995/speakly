import { Box, Drawer } from "@mui/material";
import React from "react";
import { DrawerFooter } from "./DrawerFooter";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerMain } from "./DrawerMain";
import { useDrawerContext } from "../../../context/DrawerContext";
import { useTheme } from "@mui/material/styles";

export const AppDrawer: React.FC = () => {
  const { isDrawerOpen } = useDrawerContext();
  const theme = useTheme();

  // Constants for easy adjustments
  const DRAWER_WIDTH_OPEN = 250; // Width when open
  const DRAWER_WIDTH_CLOSED = 70; // Width when closed
  const MARGIN_TOP = 16; // Top margin in pixels
  const MARGIN_BOTTOM = 16; // Bottom margin in pixels
  const MARGIN_LEFT = 16; // Left margin in pixels
  const BORDER_RADIUS = 4; // Corner radius reduced from 12 to 4 for less rounded borders
  const SHADOW = "0px 4px 20px rgba(0, 0, 0, 0.5)"; // Shadow effect

  return (
    <Box
      sx={{
        width: isDrawerOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
        height: `calc(100vh - ${MARGIN_TOP + MARGIN_BOTTOM}px)`, // Adjusted height
        position: "fixed", // Fixed positioning
        top: MARGIN_TOP, // Top margin
        left: MARGIN_LEFT, // Left margin
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Drawer
        variant="persistent"
        open={true}
        sx={{
          "& .MuiDrawer-paper": {
            height: `calc(100vh - ${MARGIN_TOP + MARGIN_BOTTOM}px)`, // Adjusted height
            width: isDrawerOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
            backgroundColor: theme.palette.background.paper, // Theme-based background
            borderRight: "none", // Remove default border
            borderRadius: BORDER_RADIUS, // Updated to a smaller value for less rounded corners
            boxShadow: SHADOW, // Shadow
            overflowX: "hidden", // Prevent horizontal scroll
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DrawerHeader />
          <DrawerMain />
          <DrawerFooter />
        </Box>
      </Drawer>
    </Box>
  );
};
