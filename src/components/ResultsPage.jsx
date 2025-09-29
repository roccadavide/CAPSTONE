import { useState, useEffect, useMemo, useRef } from "react";
import { Badge, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { fetchCategories } from "../api/api";

//Qui, essendo stata l'ultima pagina che ho sviluppato, mi sono accorto all'ultimo
// che era meglio gestire la creazione di card con il back-end, piuttosto che mettere
// delle immagini statiche e descrizioni statiche messe così. Quindi per ora uso questo
// array statico e implementerò nel back-end anche quello.
const STATIC_RESULTS = [
  {
    id: "r1",
    title: "Trattamento Viso Glow",
    description: "Pelle luminosa e idratata dopo il trattamento.",
    categoryId: "f39e37ff-1210-4446-8968-610d2d1d6563",
    image: "/Labbra.jpeg",
    date: "2025-08-10",
  },
  {
    id: "r2",
    title: "Soft Glam",
    description: "Trucco naturale e luminoso per un evento serale.",
    categoryId: "036f8d73-0d71-415f-b4cb-db4711c4c586",
    image: "/RisultatoTruccoPermanente.jpeg",
    date: "2025-08-22",
  },
  {
    id: "r3",
    title: "Nude Manicure",
    description: "Manicure nude con finitura elegante.",
    categoryId: "89bbe501-6470-46a6-9187-1e19f9241bf4",
    image: "/Laminazione.jpeg",
    date: "2025-09-01",
  },
];

function ResultsPage() {
  const [cat, setCat] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardsRef = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleMap(prev => ({ ...prev, [e.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.25 }
    );
    cardsRef.current.forEach(el => el && obs.observe(el));
    return () => cardsRef.current.forEach(el => el && obs.unobserve(el));
  }, [cat]);

  const categoriesMap = useMemo(() => {
    const map = {};
    categories.forEach(c => (map[c.categoryId] = c.label));
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    return STATIC_RESULTS.filter(r => (cat === "all" ? true : r.categoryId === cat));
  }, [cat]);

  if (loading) {
    return (
      <Container className="container-base">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="container-base">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-5 results-root" style={{ marginTop: "7rem" }}>
      <h1 className="text-center mb-3">I miei risultati</h1>
      <p className="text-center lead mb-5">Una raccolta di esempi reali dei miei trattamenti: viso, mani, make-up e altro.</p>

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

      <Container>
        <Row className="g-4 justify-content-center">
          {filtered.map((res, idx) => (
            <Col key={res.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <Card
                data-id={res.id}
                ref={el => (cardsRef.current[idx] = el)}
                className={`results-card border-0 rounded-4 shadow-sm ${visibleMap[res.id] ? "visible" : ""}`}
              >
                <Card.Img src={res.image} alt={res.title} className="results-img rounded-top-4" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">{res.title}</Card.Title>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <Badge bg="results-badge">{categoriesMap[res.categoryId] || "Altro"}</Badge>
                    {res.date && <small className="text-muted">{new Date(res.date).toLocaleDateString()}</small>}
                  </div>
                  <Card.Text className="flex-grow-1 small text-muted">{res.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {filtered.length === 0 && <p className="text-center text-muted mt-4">Nessun risultato in questa categoria.</p>}
      </Container>
    </Container>
  );
}

export default ResultsPage;
