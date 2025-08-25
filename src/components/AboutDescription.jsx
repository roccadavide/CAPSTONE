import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

const AboutDescription = () => {
  const topLeftRef = useRef();
  const bottomRightRef = useRef();
  const [showTopLeft, setShowTopLeft] = useState(false);
  const [showBottomRight, setShowBottomRight] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === topLeftRef.current) setShowTopLeft(true);
          else if (entry.target === bottomRightRef.current) setShowBottomRight(true);
        }
      },
      { threshold: 0.3 }
    );
    if (topLeftRef.current) observer.observe(topLeftRef.current);
    if (bottomRightRef.current) observer.observe(bottomRightRef.current);
    return () => {
      if (topLeftRef.current) observer.unobserve(topLeftRef.current);
      if (bottomRightRef.current) observer.unobserve(bottomRightRef.current);
    };
  }, []);

  return (
    <Container fluid className="about-desc-section">
      <div ref={topLeftRef} className={`about-box-2 top-left ${showTopLeft ? "visible" : ""}`}>
        <h2>Benvenuti</h2>
        <p>Vieni a scoprire il mondo Beauty Room, dove estetica e benessere si incontrano.</p>
      </div>

      <div className="about-wrapper">
        <img src="/chisono-michela.jpeg" alt="Michela" className="about-image" />

        <div ref={bottomRightRef} className={`about-box-2 bottom-right ${showBottomRight ? "visible" : ""}`}>
          <h2>Il Negozio di Michela</h2>
          <p>Michela ti guiderà con professionalità e passione verso il tuo percorso di bellezza e relax.</p>
        </div>
      </div>
    </Container>
  );
};

export default AboutDescription;
