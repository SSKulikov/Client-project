import { Card, ListGroup } from "react-bootstrap";

function PropertyCard({ property }) {
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Card.Img variant="top" src={property.image} />
      <Card.Body>
        <Card.Title>{property.type}</Card.Title>
        <Card.Text>{property.descriptions}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> Цена: {property.price} руб</ListGroup.Item>
        <ListGroup.Item>Адрес: {property.addres}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Написать</Card.Link>
        <Card.Link href="#">Избранное</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
