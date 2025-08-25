import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Image } from "react-bootstrap";
import { SERVICES } from "../data/services";
import BookingModal from "./BookingModal";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = useMemo(() => SERVICES.find(s => s.id === serviceId), [serviceId]);
  const [open, setOpen] = useState(false);

  if (!service)
    return (
      <Container style={{ marginTop: "7rem" }}>
        <p>Servizio non trovato.</p>
      </Container>
    );

  return (
    <Container fluid className="py-5" style={{ marginTop: "7rem" }}>
      <Row className="align-items-center g-4">
        <Col md={6}>
          <Image src={service.images?.[0]} alt={service.title} fluid rounded />
        </Col>
        <Col md={6}>
          <h1 className="mb-2">{service.title}</h1>
          <div className="d-flex align-items-center gap-2 mb-3">
            <Badge bg="secondary" className="text-uppercase">
              {service.category}
            </Badge>
            <small className="text-muted">{service.durationMin} min</small>
          </div>
          <p className="mb-3">{service.description}</p>
          <h4 className="mb-4">€ {service.price}</h4>
          <Button variant="dark" className="rounded-pill px-4" onClick={() => setOpen(true)}>
            Prenota ora
          </Button>
        </Col>
      </Row>

      <BookingModal show={open} onHide={() => setOpen(false)} service={service} />
    </Container>
  );
};

export default ServiceDetail;
