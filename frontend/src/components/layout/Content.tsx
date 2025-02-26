import { Box, Typography, useTheme } from "@mui/material"


interface IContentProps {
  title: string
  children: React.ReactNode
}


export const Content: React.FC<IContentProps> = ({ children, title }: IContentProps) => {
  const theme = useTheme()

  return (
  <Box height="100%" display="flex" flexDirection="column" gap={1} bgcolor={theme.palette.background.default}>
    <Box padding={theme.spacing(2)} height={theme.spacing(8)} textAlign={"center"} display={"flex"} alignItems={"center"}>
      <Typography variant="h3" sx={{ marginLeft: '2.5%' }}>
        {title}
      </Typography>
    </Box >
    <Box padding={theme.spacing(2)}   flex={1} overflow="auto">
      {children}
    </Box>
  </Box>)
}
