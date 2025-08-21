import { Card, Container, Row, Col } from "react-bootstrap";

const ProductSection = () => {
  return (
    <Container fluid className="container-prod py-5">
      <h1 className="text-center mt-4 mb-5">PRODOTTI</h1>
      <Row className="g-4 justify-content-center align-items-center">
        <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
          <Card className="h-100 shadow-sm card">
            <Card.Img variant="top" src="/crema_sample.avif" />
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
          <Card className="h-100 shadow-sm card">
            <Card.Img variant="top" src="/crema_sample.avif" />
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
          <Card className="h-100 shadow-sm card">
            <Card.Img variant="top" src="/crema_sample.avif" />
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
          <Card className="h-100 shadow-sm card">
            <Card.Img variant="top" src="/crema_sample.avif" />
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <h2 className="prod_title">Nome prodotto</h2>
              <h3 className="prod_type">Tipo prodotto</h3>
              <h4 className="prod_desc">Some quick example text to build on the card title and make up the bulk of the card's content.</h4>
              <h5 className="prod_price">€ 55,00</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSection;
