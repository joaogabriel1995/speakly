import { Box, Drawer } from "@mui/material";
import React from "react";
import { DrawerFooter } from "./DrawerFooter";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerMain } from "./DrawerMain";
import { useDrawerContext } from "../../../context/DrawerContext";
export const AppDrawer: React.FC = () => {

  const { isDrawerOpen } = useDrawerContext()
  return (
    <Box sx={{ width: isDrawerOpen ? 250 : 70, height: "100vh" }}>
      <Drawer
        variant="persistent"
        open={true}
        sx={{
          "& .MuiDrawer-paper": {
            height: "100%",
            width: isDrawerOpen ? 250 : 70,
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
