import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutSection from "./components/AboutSection";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";
import ProductsPage from "./components/ProductsPage";
import ProductsHeroSection from "./components/ProductsHeroSection";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutDescription from "./components/AboutDescription";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductSection />
              <Divider />
              <AboutSection />
            </>
          }
        />
        <Route
          path="/prodotti"
          element={
            <>
              <ProductsHeroSection />
              <ProductsPage />
            </>
          }
        />
        <Route
          path="/chisono"
          element={
            <>
              <AboutDescription />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
