// src/app/task/[id]/page.tsx

import { useNavigation } from 'next/navigation';
import { Metadata } from "next";
import TaskContent from "./TaskContent"; // Verifique se o caminho do import está correto
import { auth } from "@/auth";

interface User {
  email: string;
  name: string;
}

const Task = ({ user }: { user: User }) => {
  const navigation = useNavigation();
  const { id } = navigation.query;

  // ... resto do seu código, utilizando o valor de id e user

  return (
    <div>
      <TaskContent params={{ id }} user={user} allComments={[]} />{" "}
      {/* Passing id and user */}
    </div>
  );
};

export default Task;
