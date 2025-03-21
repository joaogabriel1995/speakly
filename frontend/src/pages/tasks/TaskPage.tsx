import React, { useEffect, useState } from "react";
import { Content } from "../../components/layout/Content";
import { TaskCard } from "./TaskCards";
import { useParams } from "react-router-dom";
import { taskService, TasksResponse } from "../../services/tasks.service";
import { Box } from "@mui/material";




export const TaskPage: React.FC = () => {

  const { learningDetailId } = useParams()
  const [tasks, setTasks] = useState<TasksResponse[] | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      if (learningDetailId) {
        try {
          const task = await taskService.getById(learningDetailId);
          setTasks(task)
          console.log(task); // Faça algo com a resposta
        } catch (error) {
          console.error("Erro ao buscar a tarefa:", error);
        }
      }
    };

    fetchTask();
  }, [learningDetailId]); // Adicione learningDetailId como dependência


  const handleClick = (id: string) => {
    console.log(id)
  }

  return (
    <Content title="Minhas Tarefas">
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={5}>

        {tasks && tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            task={task.task}
            resource={task.resource}
            skill={task.skill}
            duration={task.duration}
            repetitions={task.repetitions}
            status={task.status}
            day={task.day}
            onClick={() => handleClick(task.id)}
          />
        ))}
      </Box>
    </Content>
  );
}
