import React from "react";
import searchIcon from "../assets/Front/search.png";
import menuIcon from "../assets/Front/menu.png";

type HeaderProps = {
  onMenuClick: () => void; // ฟังก์ชันเปิดเมนู
};

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80px",
        zIndex: 1000,
      }}
    >
      {/* Search Icon */}
      <img
        src={searchIcon}
        alt="Search"
        style={{
          width: "24px",
          cursor: "pointer",
          transition: "transform 0.3s ease, filter 0.3s ease",
          filter: "invert(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.filter = "invert(0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "invert(1)";
        }}
      />

      {/* Menu Icon */}
      <img
        src={menuIcon}
        alt="Menu"
        onClick={onMenuClick} // เรียกฟังก์ชันเปิดเมนู
        style={{
          width: "24px",
          cursor: "pointer",
          transition: "transform 0.3s ease, filter 0.3s ease",
          filter: "invert(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.filter = "invert(0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "invert(1)";
        }}
      />
    </div>
  );
};

export default Header;
