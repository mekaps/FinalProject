import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Header";
import FashionSection from "./Component/FashionSection";
import Menubar from "./Component/Menubar";

const App: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false); // สถานะเปิด/ปิดเมนู

  const handleMenuClick = () => {
    setMenuOpen(true); // เปิดเมนู
  };

  const handleCloseMenu = () => {
    setMenuOpen(false); // ปิดเมนู
  };

  return (
    <div className="App" style={{ position: "relative", height: "100vh" }}>
      {/* Header Component */}
      <Header onMenuClick={handleMenuClick} />

      {/* Menubar Component */}
      <Menubar isOpen={isMenuOpen} onClose={handleCloseMenu} />

      {/* ข้อความ GHACA */}
      <div
        className="joan-regular"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 500,
          color: "#FFFFFF",
          fontSize: "64px",
          fontWeight: 200,
          textTransform: "uppercase",
          letterSpacing: "8px",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
        }}
      >
        GHACA
      </div>

      {/* FashionSection Component */}
      <main>
        <FashionSection />
      </main>
    </div>
  );
};

export default App;
