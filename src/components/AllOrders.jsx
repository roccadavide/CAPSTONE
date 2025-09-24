import { useEffect, useState } from "react";
import { fetchOrders } from "../api/api";
import { Container, Spinner, Card, Badge, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useSelector(state => state.auth);

  // ---------- FETCH ----------
  useEffect(() => {
    const loadData = async () => {
      try {
        const orders = await fetchOrders(token);
        setAllOrders(orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  // ---------- UI ----------
  if (loading) {
    return (
      <Container className="text-center container-base">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="container-base">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: "7rem" }}>
      <h2 className="mb-4">📦 Tutti gli ordini</h2>

      {allOrders.map(order => (
        <Card key={order.orderId} className="mb-4 order-card shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                {order.customerName} {order.customerSurname} <Badge bg="secondary">{order.orderStatus}</Badge>
              </h5>
              <small className="text-muted">{new Date(order.createdAt).toLocaleString()}</small>
            </div>

            <p className="mb-1">
              <strong>Email:</strong> {order.customerEmail}
            </p>
            <p className="mb-1">
              <strong>Telefono:</strong> {order.customerPhone}
            </p>
            <p className="mb-1">
              <strong>Indirizzo:</strong> {order.shippingAddress}, {order.shippingCity} ({order.shippingZip}), {order.shippingCountry}
            </p>

            <h6 className="mt-3">🛒 Prodotti:</h6>
            <ListGroup variant="flush">
              {order.orderItems.map(item => (
                <ListGroup.Item key={item.orderItemId} className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Prodotto:</strong> {item.productId} <br />
                    <small>Quantità: {item.quantity}</small>
                  </span>
                  <span>€ {(item.price * item.quantity).toFixed(2)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AllOrders;
