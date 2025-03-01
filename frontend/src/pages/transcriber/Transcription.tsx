import { Box } from "@mui/material";
import { Content } from "../../components/layout/Content";
import TranscriptionForm from "./TranscriptionForm";

export const Transcriber: React.FC = () => {


  return (
    <Content title="Conversor de YouTube para Texto">
      <Box display="flex" flexDirection="row" width="100%" position="relative">
        {/* Formulário à esquerda/esquerda-central */}
        <Box flex="1">
          <TranscriptionForm />
        </Box>

        <Box
          position="fixed"
          right={16}
          top={80} // Ajuste conforme o header ou layout
          zIndex={1300} // Acima de outros elementos
          width={300} // Largura fixa do alerta
        >
        </Box>
      </Box>
    </Content>
  );
};
