import React from "react";
import { Link } from "react-router-dom";
import closeIcon from "../assets/Front/close-icon.png"; // ไอคอนปิด
import instagramIcon from "../assets/Front/IG.png"; // โลโก้ Instagram    
import facebookIcon from "../assets/Front/FB.png"; // โลโก้ Facebook

type MenubarProps = {
  isOpen: boolean; // สถานะเปิด/ปิดเมนู
  onClose: () => void; // ฟังก์ชันปิดเมนู
};

const Menubar: React.FC<MenubarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ปุ่มปิดเมนู */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <img
          src={closeIcon}
          alt="Close Menu"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </div>

      {/* รายการเมนู */}
      <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: "#000",
          }}
        >
          <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <Link
              to="/"
              onClick={onClose}
              style={{ textDecoration: "none", color: "#000" }}
            >
              หน้าแรก
            </Link>
          </li>
          <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <Link
              to="/products"
              onClick={onClose}
              style={{ textDecoration: "none", color: "#000" }}
            >
              สินค้า
            </Link>
          </li>
          <li style={{ margin: "20px 0", fontSize: "18px" }}>
  
          </li>
        </ul>
      </div>

      {/* ส่วนติดต่อเรา */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#000",
            marginBottom: "20px",
          }}
        >
          ติดต่อเรา
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* โลโก้ Instagram */}
          <a
            href="https://www.instagram.com/ghaca.officials/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              style={{
                width: "45px",
                height: "45px",
              }}
            />
          </a>

          {/* โลโก้ Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100007160436739&locale=th_TH"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{
                width: "50px",
                height: "50px",
                marginTop: "-3px",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menubar;