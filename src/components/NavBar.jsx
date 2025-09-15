import { useEffect, useState } from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { BagHeart, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

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
              <Link className="nav-link text-black" to="/prenotazioni">
                Prenotazioni
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
          <NavDropdown title={<PersonCircle size={24} color="black" />} id="navbarScrollingDropdown">
            <NavDropdown.Item href="/login">Accedi</NavDropdown.Item>
            <NavDropdown.Item href="/register">Registrati</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={<BagHeart size={24} color="black" />} id="navbarScrollingDropdown">
            <NavDropdown.Item href="#">Carrello vuoto</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
