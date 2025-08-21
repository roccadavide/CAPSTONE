import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const [prodotti, setProdotti] = useState([]);
  const [filtro, setFiltro] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log(data.products);
        setProdotti(data.products);
      })
      .catch(err => console.error("Errore fetch:", err));
  }, []);

  const prodottiFiltrati = filtro === "all" ? prodotti : prodotti.filter(p => p.categoria === filtro);

  return (
    <Container fluid className="products-container">
      <Row className="justify-content-center my-5">
        <Col xs={6} sm={3} className="text-center my-3">
          <Button className="prod-button" onClick={() => setFiltro("all")}>
            Tutti
          </Button>
        </Col>
        <Col xs={6} sm={3} className="text-center my-3">
          <Button className="prod-button" onClick={() => setFiltro("viso")}>
            Viso
          </Button>
        </Col>
        <Col xs={6} sm={3} className="text-center my-3">
          <Button className="prod-button" onClick={() => setFiltro("corpo")}>
            Corpo
          </Button>
        </Col>
        <Col xs={6} sm={3} className="text-center mt-3">
          <Button className="prod-button" onClick={() => setFiltro("makeup")}>
            Makeup
          </Button>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        {prodottiFiltrati.map(p => (
          <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center">
            <Card className="h-100 shadow-sm card" onClick={() => navigate(`/prodotti/${p.id}`)}>
              <Card.Img variant="top" src={p.thumbnail} alt={p.title} />
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <h2 className="prod_title">{p.title}</h2>
                <h3 className="prod_type">Tipo prodotto</h3>
                <h4 className="prod_desc">{p.description}</h4>
                <h5 className="prod_price">€{p.price}</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsPage;
