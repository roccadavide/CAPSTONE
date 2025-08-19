import "./App.css";
import AboutSection from "./components/AboutSection";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ProductSection />
      <Divider />
      <AboutSection />
      <Footer />
    </>
  );
}

export default App;
