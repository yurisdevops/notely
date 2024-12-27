import { useNavigation } from 'next/navigation';
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

interface User {
  email: string;
  name: string;
}

export default async function Task({ user }: { user: User }) {
  const navigation = useNavigation();
  const { id } = navigation.query;

  const session = await auth();

  // Redirecionando se o usuário não estiver autenticado
  if (session) {
    user = {
      email: session.user?.email ?? "",
      name: session.user?.name ?? "Usuário",
    };
  }

  return (
    <div>
      <TaskContent params={{ id }} user={user} allComments={[]} />{" "}
      {/* Passing id and user */}
    </div>
  );
}
