// src/app/task/[id]/page.tsx
import { Metadata } from "next";
import TaskContent from "./TaskContent"; // Verifique se o caminho do import está correto
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Detalhes da tarefa | Notely",
  description: "Acesse os detalhes de sua tarefa.",
};

export default async function Task({ params }: { params: { id: string } }) {
  // Autenticação do usuário
  const session = await auth();

  // Defina o usuário
  const user = {
    email: session?.user?.email ?? "",
    name: session?.user?.name ?? "Usuário",
  };

  return (
    <div>
      <TaskContent params={{ id: params.id }} user={user} allComments={[]} />
    </div>
  );
}
