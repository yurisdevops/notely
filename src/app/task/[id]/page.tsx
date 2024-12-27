import { Metadata } from "next";
import TaskContainer from "./taskContainer"; // O caminho deve ser correto

export const metadata: Metadata = {
  title: "Detalhes da tarefa | Notely",
  description: "Acesse os detalhes de sua tarefa.",
};

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Task({ params }: Props) {
  console.log("Params recebidos:", params.id);
  return (
    <div>
      <TaskContainer params={params} />{" "}
    </div>
  );
}
