import { Box } from "@mui/material";
import { CustomList, ICustomListProps } from "./CustonListIcon";
import { Home, LibraryBooks, PostAdd, Transcribe } from "@mui/icons-material";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const DrawerMain: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = (navigate: NavigateFunction, to: string) => {
    navigate(to);
  };
  const CustomListItens: ICustomListProps[] = [
    { icon: <Home />, text: 'Início', onClick: () => handleClick(navigate, '/home') },
    { icon: <Transcribe />, text: 'Transcrição', onClick: () => handleClick(navigate, '/transcription') },
    { icon: <PostAdd />, text: 'Plano de Estudos', onClick: () => handleClick(navigate, '/study-plan/generate') },
    { icon: <LibraryBooks />, text: 'Meus Planos de Estudos', onClick: () => handleClick(navigate, '/study-plan/list') },
  ];


  return (
    <Box sx={{ height: "60%" }}>

      {CustomListItens.map((Item, index) => (
        <CustomList
          key={index}
          icon={Item.icon}
          text={Item.text}
          onClick={Item.onClick}
        />
      ))}

    </Box>
  )
}
