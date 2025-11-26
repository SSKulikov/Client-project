import { Button, Container, Form, FormControl } from "react-bootstrap";

function Registration({ registration }) {
  return (
    <Container>
      <Form onSubmit={registration}>
        <FormControl type="text" placeholder="Введите логин" name="name" />
        <FormControl type="email" placeholder="Введите E-mail" name="email" />
        <FormControl
          type="password"
          placeholder="Введите пароль"
          name="password"
        />
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </Container>
  );
}

export default Registration;
