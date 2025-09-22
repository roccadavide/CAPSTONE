import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { createProduct, updateProduct } from "../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProductModal = ({ show, onHide, categories, onProductSaved, product }) => {
  const { token } = useSelector(state => state.auth);

  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || "",
        categoryId: product.category?.categoryId || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        categoryId: "",
      });
      setFile(null);
    }
  }, [product, isEdit]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.name || !form.price || !form.description || !form.stock || !form.categoryId) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }

    if (isNaN(form.price) || form.price <= 0) {
      setError("Il prezzo deve essere un numero positivo.");
      return;
    }

    if (isNaN(form.stock) || form.stock <= 0) {
      setError("Lo stock deve essere un numero positivo.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        stock: parseInt(form.stock, 10),
        categoryId: form.categoryId,
      };

      let savedProduct;

      if (isEdit) {
        // PUT
        savedProduct = await updateProduct(product.productId, payload, file, token);
      } else {
        // POST
        savedProduct = await createProduct(payload, file, token);
      }

      onProductSaved(savedProduct);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Modifica Prodotto" : "Aggiungi Prodotto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome *</Form.Label>
            <Form.Control type="text" value={form.name} onChange={e => handleChange("name", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prezzo (€) *</Form.Label>
            <Form.Control type="text" value={form.price} onChange={e => handleChange("price", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione *</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.description} onChange={e => handleChange("description", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock *</Form.Label>
            <Form.Control type="number" value={form.stock} onChange={e => handleChange("stock", e.target.value)} />
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
          {loading ? <Spinner size="sm" animation="border" /> : isEdit ? "Salva modifiche" : "Crea"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
