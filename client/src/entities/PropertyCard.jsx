import { Card, ListGroup, Button } from "react-bootstrap";

function PropertyCard({ property, addToFavorites, removeFromFavorites, isFavorite, user}) {
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };
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
        {user?.type === "locataire" ? (
          <Button 
            variant={isFavorite ? "danger" : "outline-primary"}
            size="sm"
            onClick={handleFavoriteClick}
            style={{
              marginLeft: '10px',
              backgroundColor: isFavorite ? '#dc3545' : 'transparent',
              borderColor: isFavorite ? '#dc3545' : '#007bff',
              color: isFavorite ? 'white' : '#007bff'
            }}
          >{!isFavorite ? 'Добавить в избранное' : 'Удалить из избранного'}</Button>  ) : (
          <Card.Link 
            href="#" 
            style={{ color: '#6c757d', cursor: 'not-allowed' }}
            onClick={(e) => e.preventDefault()}
          >
            Избранное
          </Card.Link>
        )}
        {/* // <Card.Link href="#" onClick={() => addToFavorites(property.id)}>Избранное</Card.Link> */}
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
