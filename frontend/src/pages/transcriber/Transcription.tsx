import { Box } from "@mui/material"
import { Content } from "../../components/layout/Content"
import TranscriptionForm from "./TranscriptionForm"





export const Transcriber: React.FC = () => {
  return (
    <Content title="Conversor de YouTube para Texto">
      <Box>
        <TranscriptionForm />
      </Box>
    </Content>)
}
