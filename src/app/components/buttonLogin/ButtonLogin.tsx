import { signIn } from "@/auth"; // Substitua pelo caminho correto da sua função de signOut
import styles from "./buttonLogin.module.css"; // Ajuste o caminho para seu CSS
import { toast, ToastContainer } from "react-toastify";

interface LoginButtonProps {
  provider: string; // Aqui, usamos o providerName para o nome do provedor, como "Google"
}
const LogoutButton = ({ provider }: LoginButtonProps) => {
  return (
    <>
      <ToastContainer />
      <form
        action={async () => {
          "use server";
          await signIn(provider);
        }}
      >
        <button type="submit" className={styles.loginButton}>
          Acessar com {provider}
        </button>
      </form>
    </>
  );
};

export default LogoutButton;
