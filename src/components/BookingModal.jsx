import { useMemo, useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateTimeSlots } from "../utils/schedules";

const BookingModal = ({ show, onHide, service }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", notes: "" });

  const slots = useMemo(() => {
    return generateTimeSlots(date, {
      open: "09:00",
      close: "19:00",
      durationMin: service?.durationMin || 30,
      breaks: [["13:00", "14:00"]],
    });
  }, [date, service]);

  const reset = () => {
    setStep(1);
    setSlot(null);
    setCustomer({ name: "", email: "", phone: "", notes: "" });
  };

  const confirm = () => {
    const booking = {
      serviceId: service.id,
      title: service.title,
      date: date.toDateString(),
      slot,
      customer,
      price: service.price,
    };
    console.log("PRENOTAZIONE:", booking);
    // TODO: POST al backend /bookings
    onHide();
    reset();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        reset();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Prenotazione — {service?.title}{" "}
          <Badge bg="secondary" className="ms-2">
            {service?.durationMin} min
          </Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 1 && (
          <>
            <h5 className="mb-3">1/4 — Seleziona la data</h5>
            <DatePicker selected={date} onChange={setDate} dateFormat="dd/MM/yyyy" minDate={new Date()} inline />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="dark" onClick={() => setStep(2)}>
                Avanti
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h5 className="mb-3">2/4 — Seleziona l’orario</h5>
            <div className="d-flex flex-wrap gap-2">
              {slots.map(s => (
                <Button key={s.start} variant={slot?.start === s.start ? "dark" : "outline-dark"} className="rounded-pill" onClick={() => setSlot(s)}>
                  {s.start}
                </Button>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-dark" onClick={() => setStep(1)}>
                Indietro
              </Button>
              <Button variant="dark" onClick={() => setStep(3)} disabled={!slot}>
                Avanti
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h5 className="mb-3">3/4 — I tuoi dati</h5>
            <Form className="row g-3">
              <div className="col-md-6">
                <Form.Label>Nome e Cognome</Form.Label>
                <Form.Control value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
              </div>
              <div className="col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
              </div>
              <div className="col-md-6">
                <Form.Label>Telefono</Form.Label>
                <Form.Control value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
              </div>
              <div className="col-md-12">
                <Form.Label>Note (opzionale)</Form.Label>
                <Form.Control as="textarea" rows={3} value={customer.notes} onChange={e => setCustomer({ ...customer, notes: e.target.value })} />
              </div>
            </Form>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-dark" onClick={() => setStep(2)}>
                Indietro
              </Button>
              <Button variant="dark" onClick={() => setStep(4)} disabled={!customer.name || !customer.email || !customer.phone}>
                Avanti
              </Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h5 className="mb-3">4/4 — Riepilogo</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Servizio:</strong> {service.title}
              </li>
              <li>
                <strong>Durata:</strong> {service.durationMin} min
              </li>
              <li>
                <strong>Prezzo:</strong> € {service.price}
              </li>
              <li>
                <strong>Data:</strong> {date.toLocaleDateString()}
              </li>
              <li>
                <strong>Orario:</strong> {slot?.start}
              </li>
              <li>
                <strong>Cliente:</strong> {customer.name} — {customer.phone}
              </li>
              <li>
                <strong>Email:</strong> {customer.email}
              </li>
              {customer.notes && (
                <li>
                  <strong>Note:</strong> {customer.notes}
                </li>
              )}
            </ul>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-dark" onClick={() => setStep(3)}>
                Indietro
              </Button>
              <Button variant="dark" onClick={confirm}>
                Conferma prenotazione
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
