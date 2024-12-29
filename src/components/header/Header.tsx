import styles from "./header.module.css";
import { auth } from "@/auth";

import Link from "next/link";

import ButtonLogout from "../buttonLogout/ButtonLogout";
import ButtonLogin from "../buttonLogin/ButtonLogin";

export async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className={styles.header}>
        <section className={styles.content}>
          <nav className={styles.nav}>
            <Link href="/">
              <h1 className={styles.logo}>
                Tarefas<span>+</span>
              </h1>
            </Link>

            {user && (
              <Link href="/dashboard" className={styles.linkPainel}>
                Meu Painel
              </Link>
            )}
          </nav>
          {user ? (
            <>
              <ButtonLogout
                user={{
                  name: user?.name,
                }}
              />
            </>
          ) : (
            <>
              <ButtonLogin provider="google" />
            </>
          )}
        </section>
      </header>
    </>
  );
}
