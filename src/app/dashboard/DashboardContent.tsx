"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Textarea } from "../components/textarea/TextArea";

import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

import styles from "./dashboard.module.css";

import { db } from "@/services/firebaseConnection";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

interface DashboardContentProps {
  user: {
    email: string;
    name: string;
  };
}

interface TaskProps {
  id: string;
  tarefa: string;
  createAt: Date;
  user: string;
  public: boolean;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user }) => {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
    console.log(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (!input) return;

    try {
      await addDoc(collection(db, "tasks"), {
        tarefa: input,
        createAt: new Date(),
        user: user?.email,
        public: publicTask,
      });
      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      const taskRef = collection(db, "tasks");
      const q = query(
        taskRef,
        orderBy("createAt", "desc"),
        where("user", "==", user?.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let docTasks = [] as TaskProps[];
        snapshot.forEach((doc) => {
          docTasks.push({
            id: doc.id,
            ...doc.data(),
            createAt: doc.data().createAt.toDate(),
          } as TaskProps);
        });
        setTasks(docTasks);
      });

      // Limpa o listener quando o componente é desmontado
      return () => unsubscribe();
    }
    loadTasks();
  }, [user?.email]);

  async function handleDeleteTask(id: string) {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual é a sua tarefa?</h1>
            <form action="" onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite sua tarefa"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label htmlFor="">Deixar tarefa pública?</label>
              </div>
              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          {tasks.length === 0 ? (
            <p>Não há tarefas registradas.</p>
          ) : (
            tasks.map((task) => (
              <article key={task.id} className={styles.task}>
                <div className={styles.tagContainer}>
                  {task.public ? (
                    <>
                      <label className={styles.tag}>PÚBLICO</label>
                      <button className={styles.shareButton}>
                        <FiShare2
                          size={22}
                          color="#3183ff"
                          onClick={() => handleShare(task.id)}
                        />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.taskContent}>
                  {task.public ? (
                    <Link href={`/task/${task.id}`}>
                      <p>{task.tarefa}</p>
                    </Link>
                  ) : (
                    <p>{task.tarefa}</p>
                  )}
                  <button
                    className={styles.trashButton}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <FaTrash size={24} color="#ea3140" />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardContent;
