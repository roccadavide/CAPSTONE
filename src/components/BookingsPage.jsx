import { useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVICES, CATEGORIES } from "../data/services";

const BookingsPage = () => {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return SERVICES.filter(s => (cat === "all" ? true : s.category === cat)).filter(
      s => s.title.toLowerCase().includes(q.toLowerCase()) || s.short.toLowerCase().includes(q.toLowerCase())
    );
  }, [cat, q]);

  return (
    <Container fluid className="py-5" style={{ marginTop: "7rem" }}>
      <h1 className="text-center mb-3">Prenota un servizio</h1>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {CATEGORIES.map(c => (
          <Button key={c.key} variant={cat === c.key ? "dark" : "outline-dark"} onClick={() => setCat(c.key)} className="rounded-pill px-3">
            {c.label}
          </Button>
        ))}
      </div>

      <Container className="mb-4">
        <Form.Control placeholder="Cerca un servizio..." value={q} onChange={e => setQ(e.target.value)} />
      </Container>

      <Container>
        <Row className="g-4 justify-content-center">
          {filtered.map(s => (
            <Col key={s.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img src={s.images?.[0]} alt={s.title} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">{s.title}</Card.Title>
                  <div className="mb-2 d-flex align-items-center gap-2">
                    <Badge bg="secondary" className="text-uppercase">
                      {s.category}
                    </Badge>
                    <small className="text-muted">{s.durationMin} min</small>
                  </div>
                  <Card.Text className="flex-grow-1">{s.short}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <strong>€ {s.price}</strong>
                    <Link to={`/prenotazioni/${s.id}`} className="btn btn-dark btn-sm rounded-pill">
                      Dettagli
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default BookingsPage;
