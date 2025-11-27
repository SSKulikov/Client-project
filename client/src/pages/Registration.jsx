import { Button, Container, Form, FormControl} from "react-bootstrap";

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
        <Form.Label className="mt-3">Кем вы являетесь?</Form.Label>
        <div>
          <Form.Check
            type="radio"
            id="role-locataire"
            name="type"
            value="locataire"
            label="Арендатор"
            defaultChecked
          />
          <Form.Check
            type="radio"
            id="role-landlord"
            name="type"
            value="landlord"
            label="Арендодатель"
          />
        </div>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </Container>
  );
}

export default Registration;
