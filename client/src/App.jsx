import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Catalog from "./components/Catalog";
import CarDetailPage from "./components/CarDetail";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Contact from "./components/Contact";
import CarUploadForm from "./components/CarUploadForm";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";


function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/cars/add" element={<CarUploadForm />} />

        
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;
