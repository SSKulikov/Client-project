import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import styles from "../shared/style/AuthForm.module.css";

function Registration({ registration }) {
  return (
    <div className={styles.wrapper}>
      <Form className={styles.card} onSubmit={registration}>
        <div>
          <h2 className={styles.title}>Регистрация</h2>
          <p className={styles.subtitle}>Создайте аккаунт и начните управлять недвижимостью.</p>
        </div>

        <FormGroup>
          <FormLabel className={styles.label}>Имя</FormLabel>
          <FormControl className={styles.input} type="text" placeholder="Введите имя" name="name" />
        </FormGroup>

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

        <div>
          <FormLabel className={styles.label}>Кем вы являетесь?</FormLabel>
          <FormCheck
            type="radio"
            id="role-locataire"
            name="type"
            value="locataire"
            label="Арендатор"
            defaultChecked
          />
          <FormCheck
            type="radio"
            id="role-landlord"
            name="type"
            value="landlord"
            label="Арендодатель"
          />
        </div>

        <Button className={styles.submit} type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
