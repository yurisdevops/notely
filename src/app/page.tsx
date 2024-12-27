// app/page.tsx
import styles from "@/app/styles/page.module.css";
import Image from "next/image";
import heroImg from "../../public/assets/hero.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

async function getData() {
  const commentRef = collection(db, "comments");
  const tasksRef = collection(db, "tasks");

  const commentSnapshot = await getDocs(commentRef);
  const tasksSnapshot = await getDocs(tasksRef);

  return {
    tasks: tasksSnapshot.size || 0,
    comments: commentSnapshot.size || 0,
  };
}

export default async function Home() {
  const { tasks, comments } = await getData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tarefas+"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{tasks} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const revalidate = 3600; // Revalida a cada 1 hora para manter os dados atualizados
