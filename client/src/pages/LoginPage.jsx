import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import styles from "../shared/style/AuthForm.module.css";

function LoginPage({ login }) {
  return (
    <div className={styles.wrapper}>
      <Form className={styles.card} onSubmit={login}>
        <div>
          <h2 className={styles.title}>Вход</h2>
          <p className={styles.subtitle}>Продолжайте бронирования и следите за избранным.</p>
        </div>
        <FormGroup>
          <FormLabel className={styles.label}>E-mail</FormLabel>
          <FormControl className={styles.input} type="email" placeholder="Введите E-mail" name="email" />
        </FormGroup>
        <FormGroup>
          <FormLabel className={styles.label}>Пароль</FormLabel>
          <FormControl
            className={styles.input}
            type="password"
            placeholder="Введите пароль"
            name="password"
          />
        </FormGroup>
        <Button className={styles.submit} type="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
