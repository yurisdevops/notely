"use client";

import styles from "./task.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "@/services/firebaseConnection";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Textarea } from "@/app/components/textarea/TextArea";
import { FaTrash } from "react-icons/fa";

interface TaskContainerProps {
  params: {
    id: string;
  };
  user: {
    email: string;
    name: string;
  };
  allComments: CommentsProps[];
}

interface TaskProps {
  task: string;
  public: boolean;
  createAt: string;
  user: string;
  taskId: string;
}

interface CommentsProps {
  id: string;
  name: string;
  comment: string;
  user: string;
  taskId: string;
  createAt: string;
}

const TaskContent: React.FC<TaskContainerProps> = ({
  params,
  user,
  allComments,
}) => {
  const { id } = params;
  const [task, setTask] = useState<TaskProps | null>(null);
  const [comments, setComments] = useState<CommentsProps[]>(allComments || []);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("ID da tarefa não está definido");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "tasks", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const miliseconds = snapshot.data()?.createAt?.seconds * 1000;
          const taskData: TaskProps = {
            task: snapshot.data()?.tarefa,
            public: snapshot.data()?.public,
            createAt: new Date(miliseconds).toLocaleDateString(),
            user: snapshot.data()?.user,
            taskId: id,
          };

          setTask(taskData);

          const q = query(
            collection(db, "comments"),
            where("taskId", "==", id)
          );
          const commentsSnapshot = await getDocs(q);

          let allComments: CommentsProps[] = [];

          commentsSnapshot.forEach((doc) => {
            allComments.push({
              id: doc.id,
              name: doc.data()?.name,
              comment: doc.data()?.comment,
              user: doc.data()?.user,
              taskId: doc.data()?.taskId,
              createAt: new Date(
                doc.data()?.createAt?.seconds * 1000
              ).toLocaleDateString(),
            });
          });

          setComments(allComments);
        } else {
          console.error("Tarefa não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
      } finally {
        setLoading(false); // Garanta que você define loading como false
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!task) {
    return <p>Tarefa não encontrada!</p>;
  }

  async function handleComment(event: FormEvent) {
    event.preventDefault();
    if (!input) return;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        createAt: new Date(),
        user: user?.email,
        name: user?.name,
        taskId: params.id,
      });

      const data = {
        id: docRef.id,
        comment: input,
        user: user?.email,
        name: user?.name,
        taskId: params?.id,
        createAt: new Date().toLocaleDateString(),
      };
      setComments((oldItems) => [...oldItems, data]);
      setInput("");
    } catch (error) {}
  }

  async function handleDeleteComment(id: string) {
    try {
      await deleteDoc(doc(db, "comments", id));
      setComments((oldItems) => oldItems.filter((i) => i.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.task}</p>
        </article>
      </main>
      <section className={styles.commentsContainer}>
        <h2>Deixar Comentário</h2>
        <form onSubmit={handleComment}>
          <Textarea
            placeholder="Deixe o seu comentário..."
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
          />
          <button disabled={!user} className={styles.button}>
            Enviar Comentário
          </button>
        </form>
      </section>
      <section className={styles.commentsContainer}>
        <h2>Todos Comentários</h2>
        {comments.length === 0 && (
          <>
            <span>Nenhum comentário!</span>
          </>
        )}
        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === user?.email && (
                <button
                  onClick={() => handleDeleteComment(item.id)}
                  className={styles.buttonTrash}
                >
                  <FaTrash size={18} color="#ea3140" />
                </button>
              )}
            </div>
            <div className={styles.infoComment}>
              <p>{item.comment}</p>
              <time>{item.createAt}</time>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default TaskContent;
