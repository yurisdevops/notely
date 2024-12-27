import { Metadata } from "next";
import TaskContent from "./TaskContent"; // O caminho deve ser correto

export const metadata: Metadata = {
  title: "Detalhes da tarefa | Notely",
  description: "Acesse os detalhes de sua tarefa.",
};

 import { PageProps } from 'next/app';

interface Params {
  id: string;
}

interface Props extends PageProps {
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
