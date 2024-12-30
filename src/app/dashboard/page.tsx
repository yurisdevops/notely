// src/app/dashboard/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardContent from "./components/dashboardContent"; // Importando o novo componente cliente
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard | Notely",
  description: "Gerencie suas tarefas na sua dashboard.",
};

export default async function Dashboard() {
  // Verificando a sessão do servidor
  const session = await auth();

  // Redirecionando se o usuário não estiver autenticado
  if (!session) {
    redirect("/");
  }
  const user = {
    email: session.user?.email ?? "",
    name: session.user?.name ?? "Usuário",
  };

  // Renderiza o conteúdo do Dashboard apenas se a sessão for válida
  return (
    <div>
      <DashboardContent user={user} />{" "}
    </div>
  );
}
