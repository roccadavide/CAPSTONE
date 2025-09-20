import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchCategories, fetchServices } from "../api/api";
import { useSelector } from "react-redux";
import ServiceModal from "./ServiceModal";

const BookingsPage = () => {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        const services = await fetchServices();
        setAllServices(services);

        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categoriesMap = useMemo(() => {
    const map = {};
    categories.forEach(c => {
      map[c.categoryId] = c.label;
    });
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    return allServices
      .filter(s => (cat === "all" ? true : s.categoryName === cat))
      .filter(s => s.title.toLowerCase().includes(q.toLowerCase()) || s.shortDescription.toLowerCase().includes(q.toLowerCase()));
  }, [allServices, cat, q]);

  if (loading) {
    return (
      <Container style={{ marginTop: "7rem" }}>
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: "7rem" }}>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-5" style={{ marginTop: "7rem" }}>
      <h1 className="text-center mb-3">Prenota un servizio</h1>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <Button key="all" variant={cat === "all" ? "dark" : "outline-dark"} onClick={() => setCat("all")} className="rounded-pill px-3">
          Tutti
        </Button>

        {categories.map(c => (
          <Button
            key={c.categoryId}
            variant={cat === c.categoryId ? "dark" : "outline-dark"}
            onClick={() => setCat(c.categoryId)}
            className="rounded-pill px-3"
          >
            {c.label}
          </Button>
        ))}
      </div>

      <Container className="mb-4">
        <Form.Control placeholder="Cerca un servizio..." value={q} onChange={e => setQ(e.target.value)} />
      </Container>

      {user?.role === "ADMIN" && (
        <div className="text-center mb-4">
          <Button variant="success" className="rounded-circle" onClick={() => setOpen(true)}>
            +
          </Button>
        </div>
      )}

      <Container>
        <Row className="g-4 justify-content-center">
          {filtered.map(s => (
            <Col key={s.serviceId} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img src={s.images?.[0]} alt={s.title} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">{s.title}</Card.Title>
                  <div className="mb-2 d-flex align-items-center gap-2">
                    <Badge bg="secondary" className="text-uppercase">
                      {categoriesMap[s.categoryName] || "Senza categoria"}
                    </Badge>
                    <small className="text-muted">{s.durationMin} min</small>
                  </div>
                  <Card.Text className="flex-grow-1">{s.shortDescription}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <strong>€ {s.price}</strong>
                    <Link to={`/prenotazioni/${s.serviceId}`} className="btn btn-dark btn-sm rounded-pill">
                      Dettagli
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {user?.role === "ADMIN" && (
        <ServiceModal
          show={open}
          onHide={() => setOpen(false)}
          categories={categories}
          onServiceCreated={service => setAllServices(prev => [...prev, service])}
        />
      )}
    </Container>
  );
};

export default BookingsPage;
