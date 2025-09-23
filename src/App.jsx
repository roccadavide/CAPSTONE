import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutSection from "./components/AboutSection";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";
import ProductsPage from "./components/ProductsPage";
import ProductDetails from "./components/ProductDetails";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutDescription from "./components/AboutDescription";
import ServiceDetail from "./components/ServiceDetails";
import ServicePage from "./components/ServicePage";
import Register from "./components/Register";
import Login from "./components/Login";
import CartPage from "./components/CartPage";

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
        <Route path="/prodotti" element={<ProductsPage />} />
        <Route path="/prodotti/:productId" element={<ProductDetails />} />
        <Route path="/carrello" element={<CartPage />} />
        <Route
          path="/chisono"
          element={
            <>
              <AboutHeroSection />
              <AboutDescription />
            </>
          }
        />
        <Route path="/trattamenti" element={<ServicePage />} />
        <Route path="/trattamenti/:serviceId" element={<ServiceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
