import { signOut } from "@/auth";
import styles from "./buttonLogout.module.css";
import { toast, ToastContainer } from "react-toastify";

const LogoutButton = ({
  user,
}: {
  user: { name: string | null | undefined };
}) => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
          toast.success("Sessão encerrada com sucesso!");
        }}
      >
        <ToastContainer />
        <button type="submit" className={styles.logoutButton}>
          Olá, {user?.name}
        </button>
      </form>
    </>
  );
};

export default LogoutButton;
