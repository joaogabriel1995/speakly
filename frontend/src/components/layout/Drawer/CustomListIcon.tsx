import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useDrawerContext } from '../../../context/DrawerContext';

export interface ICustomListProps {
  icon?: React.ReactNode;
  text?: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const CustomList: React.FC<ICustomListProps> = ({ icon = <PrecisionManufacturingIcon />, text = "", onClick, disabled = false }) => {
  const theme = useTheme();
  const { isDrawerOpen } = useDrawerContext();

  return (
    <List
      sx={{
        padding: theme.spacing(0.5),
        margin: theme.spacing(0, 0),
        // Prevent scrolling by setting a max height and hiding overflow
        maxHeight: '100%', // Or a specific height like 'calc(100vh - 64px)' to account for header/app bar
        overflowY: 'hidden', // Hide vertical scrolling
        overflowX: 'hidden', // Hide horizontal scrolling
      }}
    >
      <ListItem
        sx={{
          padding: theme.spacing(0.5),
          margin: theme.spacing(0, 0),
          borderRadius: theme.spacing(1),
          display: 'flex',
          alignItems: 'center', // Ensure the entire ListItem is vertically centered
        }}
      >
        <ListItemButton
          onClick={onClick}
          disabled={disabled ? true : false}
          sx={{
            minHeight: '48px',
            padding: theme.spacing(0, 1),
            display: 'flex',
            alignItems: 'center', // Center content vertically in the button
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '40px',
            }}
          >
            {icon}
          </ListItemIcon>
          {isDrawerOpen ? (
            <ListItemText>
              <Typography variant="h6" sx={{ margin: 0, padding: 0 }}>
                {text}
              </Typography>
            </ListItemText>
          ) : null}
        </ListItemButton>
      </ListItem>
    </List>
  );
};
