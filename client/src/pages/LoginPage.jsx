import { Button, Container, Form, FormControl } from "react-bootstrap";

function LoginPage({ login }) {
  return (
    <Form onSubmit={login}>
      <FormControl type="email" placeholder="Введите E-mail" name="email" />
      <FormControl
        type="password"
        placeholder="Введите пароль"
        name="password"
      />
      <Button type="submit">Войти</Button>
    </Form>
  );
}

export default LoginPage;
