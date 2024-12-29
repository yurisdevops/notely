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
import { Textarea } from "@/components/textarea/TextArea";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify"; // Importando o toast

// Tipos para as props do componente
interface TaskContainerProps {
  params: {
    id: string;
  };
  user: User | null;

  allComments: CommentsProps[];
}

interface User {
  email: string;
  name: string;
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
  const [comments, setComments] = useState<CommentsProps[]>(allComments);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("ID da tarefa não está definido");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "tasks", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const taskData: TaskProps = {
            task: snapshot.data()?.tarefa,
            public: snapshot.data()?.public,
            createAt: new Date(
              snapshot.data()?.createAt?.seconds * 1000
            ).toLocaleDateString(),
            user: snapshot.data()?.user,
            taskId: id,
          };

          setTask(taskData);
          await fetchComments(id);
        } else {
          console.error("Tarefa não encontrada!");
          toast.error("Tarefa não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        toast.error("Erro ao buscar tarefa.");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async (taskId: string) => {
      const q = query(
        collection(db, "comments"),
        where("taskId", "==", taskId)
      );
      const commentsSnapshot = await getDocs(q);
      const allComments: CommentsProps[] = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data()?.name,
        comment: doc.data()?.comment,
        user: doc.data()?.user,
        taskId: doc.data()?.taskId,
        createAt: new Date(
          doc.data()?.createAt?.seconds * 1000
        ).toLocaleDateString(),
      }));
      setComments(allComments);
    };

    fetchData();
  }, [id]);

  const handleComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!input || !user) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        createAt: new Date(),
        user: user.email,
        name: user.name,
        taskId: id,
      });

      const newComment: CommentsProps = {
        id: docRef.id,
        comment: input,
        user: user.email,
        name: user.name,
        taskId: id,
        createAt: new Date().toLocaleDateString(),
      };
      setComments((oldItems) => [...oldItems, newComment]);
      setInput("");
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      toast.error("Erro ao adicionar comentário.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      setComments((oldItems) =>
        oldItems.filter((item) => item.id !== commentId)
      );
      toast.success("Comentário deletado com sucesso!"); // Notificação de sucesso
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      toast.error("Erro ao deletar comentário."); // Notificação de erro
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!task) {
    return <p>Tarefa não encontrada!</p>;
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
        {comments.length === 0 && <span>Nenhum comentário!</span>}
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
