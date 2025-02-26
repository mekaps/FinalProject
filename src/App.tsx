import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import FashionSection from "./Component/FashionSection";
import Menubar from "./Component/MenuBar";
import ProductPage from "./Component/ProductPage";
import Footer from "./Component/Footer";
import LoginPage from "./Component/LoginPage";
import RegisterPage from "./Component/RegisterPage";
import { UserProvider } from "./Component/User"; 
import ProductDetailPage from "./Component/ProductDetailPage";
import MyCart from "./Component/Mycart";



const AppContent: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="App" style={appStyle}>
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Menubar isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ flex: 1, paddingBottom: "320px" }}> {/* ป้องกัน Footer ถูกบัง */}
        <Routes>
          <Route path="/" element={<FashionSection />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<MyCart/>}/>

        </Routes>
      </div>

      {/* แสดง Footer ทุกหน้า ยกเว้น FashionSection */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

const appStyle: React.CSSProperties = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

export default App;
