import { Metadata } from "next";
import TaskContent from "./TaskContent"; // Verifique se o caminho do import está correto
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Detalhes da tarefa | Notely",
  description: "Acesse os detalhes de sua tarefa.",
};

interface Params {
  id: string;
}

export default async function Task({ params }: { params: Params }) {
  const session = await auth();

  // Redirecionando se o usuário não estiver autenticado
  if (!session) {
    // Pode usar o redirect do Next.js se necessário
    return <div>Você não está autenticado</div>;
  }

  const user = {
    email: session.user?.email ?? "",
    name: session.user?.name ?? "Usuário",
  };

  return (
    <div>
      <TaskContent params={{ id: params.id }} user={user} allComments={[]} />{" "}
    </div>
  );
}
