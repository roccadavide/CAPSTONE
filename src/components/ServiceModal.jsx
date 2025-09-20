import { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { createService } from "../api/api";
import { useSelector } from "react-redux";

const ServiceModal = ({ show, onHide, categories, onServiceCreated }) => {
  const { token } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    durationMin: "",
    categoryId: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.title || !form.shortDescription || !form.description || !form.price || !form.durationMin || !form.categoryId) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }

    if (isNaN(form.price) || form.price <= 0) {
      setError("Il prezzo deve essere un numero positivo.");
      return;
    }

    if (isNaN(form.durationMin) || form.durationMin <= 0) {
      setError("La durata deve essere un numero positivo.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        price: form.price,
        durationMin: form.durationMin,
        categoryId: form.categoryId,
      };

      console.log("Invio serviceData:", payload);

      const newService = await createService(payload, file, token);

      onServiceCreated(newService);
      onHide();
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        price: "",
        durationMin: "",
        categoryId: "",
      });
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Servizio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Titolo *</Form.Label>
            <Form.Control type="text" value={form.title} onChange={e => handleChange("title", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Breve descrizione *</Form.Label>
            <Form.Control type="text" value={form.shortDescription} onChange={e => handleChange("shortDescription", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione dettagliata *</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.description} onChange={e => handleChange("description", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prezzo (€) *</Form.Label>
            <Form.Control type="number" value={form.price} onChange={e => handleChange("price", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Durata (min) *</Form.Label>
            <Form.Control type="number" value={form.durationMin} onChange={e => handleChange("durationMin", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoria *</Form.Label>
            <Form.Select value={form.categoryId} onChange={e => handleChange("categoryId", e.target.value)}>
              <option value="">-- Seleziona una categoria --</option>
              {categories.map(c => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Immagine</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Salva"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
