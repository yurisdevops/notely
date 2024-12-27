import styles from "./header.module.css";
import { auth, signIn, signOut } from "@/auth";

import Link from "next/link";

export async function Header() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <>
      <header className={styles.header}>
        <section className={styles.content}>
          <nav className={styles.nav}>
            <Link href="/">
              <h1 className={styles.logo}>
                Tarefas<span>+</span>
              </h1>
            </Link>

            <Link href="/dashboard" className={styles.linkPainel}>
              Meu Painel
            </Link>
          </nav>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className={styles.loginButton}>Olá, {user.name} </button>
          </form>
        </section>
      </header>
    </>
  ) : (
    <>
      {" "}
      <header className={styles.header}>
        <section className={styles.content}>
          <nav className={styles.nav}>
            <Link href="/">
              <h1 className={styles.logo}>
                Tarefas<span>+</span>
              </h1>
            </Link>
          </nav>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit" className={styles.loginButton}>
              Acessar
            </button>
          </form>
        </section>
      </header>
    </>
  );
}
