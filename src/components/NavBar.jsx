import { useEffect, useState } from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { BagHeart, PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/action/authActions";
import CartIcon from "./CartIcon";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-solid" : "navbar-gradient"}`}>
      <Container fluid>
        <Link className="navbar-brand" to="/">
          <img src="/BEAUTY ROOM IMMAGINE.png" className="logo" alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-5">
            <li className="nav-item">
              <Link className="nav-link text-black" to="/prodotti">
                Prodotti
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/trattamenti">
                Trattamenti
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/risultati">
                Risultati
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/chisono">
                Chi sono
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center gap-5 me-5">
          {user ? (
            user.role === "ADMIN" ? (
              <>
                <NavDropdown title={<PersonCircle size={24} color="black" />} id="navbarScrollingDropdown">
                  <NavDropdown.Header className="text-black" style={{ fontSize: "1.5rem" }}>
                    Ciao, {user.name}!
                  </NavDropdown.Header>
                  <NavDropdown.Item onClick={() => navigate("/mioprofilo")}>Il mio profilo</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/prenotazioni/tutte")}>Visualizza prenotazioni</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/ordini/tutti")}>Visualizza ordini</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                </NavDropdown>
                <CartIcon />
              </>
            ) : (
              <>
                <NavDropdown title={<PersonCircle size={24} color="black" />} id="navbarScrollingDropdown">
                  <NavDropdown.Header className="text-black" style={{ fontSize: "1.5rem" }}>
                    Ciao, {user.name}!
                  </NavDropdown.Header>
                  <NavDropdown.Item onClick={() => navigate("/mioprofilo")}>Il mio profilo</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/prenotazioni")}>Le mie prenotazioni</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/ordini")}>I miei ordini</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                </NavDropdown>
                <CartIcon />
              </>
            )
          ) : (
            <>
              <NavDropdown title={<PersonCircle size={24} color="black" />} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Accedi</NavDropdown.Item>
                <NavDropdown.Item href="/register">Registrati</NavDropdown.Item>
              </NavDropdown>
              <CartIcon />
            </>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
