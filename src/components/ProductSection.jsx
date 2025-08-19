import { Button, Card, Container } from "react-bootstrap";

const ProductSection = () => {
  return (
    <Container fluid className="container-prod">
      <h1 className="text-center mt-4 mb-3">PRODOTTI</h1>
      <div className="d-flex justify-content-center gap-4">
        <Card className="card">
          <Card.Img variant="top" src="/crema_sample.avif" />
          <Card.Body>
            <div className="d-flex flex-column align-items-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </div>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Img variant="top" src="/crema_sample.avif" />
          <Card.Body>
            <div className="d-flex flex-column align-items-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </div>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Img variant="top" src="/crema_sample.avif" />
          <Card.Body>
            <div className="d-flex flex-column align-items-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </div>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Img variant="top" src="/crema_sample.avif" />
          <Card.Body>
            <div className="d-flex flex-column align-items-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ProductSection;
