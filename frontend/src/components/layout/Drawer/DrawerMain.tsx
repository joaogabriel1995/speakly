import { Box } from "@mui/material";
import { CustomList } from "./CustonListIcon";
import { Home } from "@mui/icons-material";

export const DrawerMain: React.FC = () => (
  <Box sx={{ height: "60%"}}>
    <CustomList icon={<Home />} text="Home"></CustomList>
  </Box>
);
