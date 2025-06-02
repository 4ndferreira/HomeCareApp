import { useState, type HTMLProps } from 'react';
import styles from './loginPage.module.scss';
import type { FirebaseError } from 'firebase/app';
import { login } from '../../../services/firebaseAuth';

type LoginPageProps = {
  //tipagem das props a serem definidas
} & HTMLProps<HTMLDivElement>;

export default function LoginPage({ ...prop }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //Show loading response
  const [submittingAuth, setSubmittingAuth] = useState(false)

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmittingAuth(true);
    await login(email, password).then(() => {
      setEmail(' ');
      setPassword(' ')
    }).catch((err: FirebaseError) => {
      console.error(err)
    }).finally(() => {
      setSubmittingAuth(false);
    })
  };
  return (
    <div className={styles.Root} {...prop}>
      <button onClick={handleLogin}>{submittingAuth ? 'Carregando..' : 'Entrar'}</button>
    </div>
  );
}