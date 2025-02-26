import { Box, useTheme } from '@mui/material'
import React from 'react'
import { AppDrawer } from './Drawer/AppDrawer'

interface LayoutBaseProps {
  children: React.ReactNode,

}


export const LayoutBase: React.FC<LayoutBaseProps> = ({ children }: LayoutBaseProps) => {
  const theme = useTheme()
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <AppDrawer></AppDrawer>
      <Box height="100%vh" width="100%" display="flex" flexDirection="column" gap={1} bgcolor={theme.palette.background.default}>
          {children}
      </Box >
    </Box>
  )

}
