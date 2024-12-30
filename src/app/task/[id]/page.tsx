import { Metadata } from "next";
import TaskContent from "./components/taskContent"; // Verifique se o caminho do import está correto
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

export default async function Task({ params }: { params: Promise<Params> }) {
  const session = await auth();
  let user: User | null = null;

  if (session) {
    user = {
      email: session.user?.email ?? "",
      name: session.user?.name ?? "Usuário",
    };
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div>
      <TaskContent params={{ id }} user={user} allComments={[]} />
    </div>
  );
}
