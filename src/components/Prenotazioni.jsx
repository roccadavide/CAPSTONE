import { Container } from "react-bootstrap";

const Prenotazioni = () => {
  return (
    <Container fluid className="prenotazioni-section">
      <h1>Prenota il tuo trattamento</h1>
      <p>Seleziona il servizio e prenota subito online:</p>

      <iframe src="https://www.sumupbookings.com/beauty-room-6" width="100%" height="800" style={{ border: "none", borderRadius: "8px" }} />
    </Container>
  );
};

export default Prenotazioni;
