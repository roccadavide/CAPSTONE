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
import AboutDescription from "./components/AboutDescription";
import ServiceDetail from "./components/ServiceDetails";
import ServicePage from "./components/ServicePage";
import Register from "./components/Register";
import Login from "./components/Login";
import CartPage from "./components/CartPage";
import OrderSuccessPage from "./components/OrderSuccessPage";
import AllOrders from "./components/AllOrders";
import MyProfile from "./components/MyProfile";
import BookingSuccessPage from "./components/BookingSuccessPage";
import AllBookings from "./components/AllBookings";
import MyBookings from "./components/MyBookings";
import MyOrders from "./components/MyOrders";
import ResultsPage from "./components/ResultsPage";

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
        <Route path="/ordini" element={<MyOrders />} />
        <Route path="/carrello" element={<CartPage />} />
        <Route path="/ordine-confermato" element={<OrderSuccessPage />} />
        <Route path="/ordini/tutti" element={<AllOrders />} />
        <Route path="/mioprofilo" element={<MyProfile />} />
        <Route path="/chisono" element={<AboutDescription />} />
        <Route path="/risultati" element={<ResultsPage />} />
        <Route path="/trattamenti" element={<ServicePage />} />
        <Route path="/trattamenti/:serviceId" element={<ServiceDetail />} />
        <Route path="/prenotazione-confermata" element={<BookingSuccessPage />} />
        <Route path="/prenotazioni" element={<MyBookings />} />
        <Route path="/prenotazioni/tutte" element={<AllBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
