import React, { useRef } from "react";
import PlanStudyForm from "./PlanStudyForm";
import { Content } from "../../components/layout/Content";
import {
  Box,
} from "@mui/material";

// interface PlanItem {
//   objective: string;
//   activity: string;
//   week: number;
//   month: number;
//   theory: string;
// }

// interface PlanData {
//   plan: PlanItem[];
//   userId: string;
// }

export const PlanStudyPage: React.FC = () => {

  const formRef = useRef<HTMLDivElement>(null);



  // useEffect(() => {
  //   if (lastMessages[queue]) {
  //     setPlanData(null);
  //     setIsGenerating(true);

  //     // Simulate generation delay (1.5s)
  //     setTimeout(() => {
  //       setPlanData(lastMessages[queue] as PlanData);
  //       setIsGenerating(false);

  //       // Smooth scroll to results after a small delay to ensure rendering is complete
  //       setTimeout(() => {
  //         if (resultRef.current) {
  //           resultRef.current.scrollIntoView({
  //             behavior: "smooth",
  //             block: "start"
  //           });
  //         }
  //       }, 100);
  //     }, 1500);
  //   }
  // }, [lastMessages, queue]);

  return (
    <Content title="Criação do Plano de Estudos">
      <Box ref={formRef} sx={{ mb: 6 }}>
        <PlanStudyForm />
      </Box>
    </Content>
  );
};
