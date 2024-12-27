// src/app/task/[id]/page.tsx
import { Metadata } from "next";
import TaskContent from "./TaskContent"; // Certifique-se de que o caminho do import está correto
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Detalhes da tarefa | Notely",
  description: "Acesse os detalhes de sua tarefa.",
};

interface Params {
  id: string;
}

interface User {
  email: string;
  name: string;
}

export default async function Task({ params }: { params: Params }) {
  const session = await auth();

  const user: User = {
    email: session?.user?.email ?? "",
    name: session?.user?.name ?? "Usuário",
  };

  return (
    <div>
      <TaskContent params={{ id: params.id }} user={user} allComments={[]} />
    </div>
  );
}
