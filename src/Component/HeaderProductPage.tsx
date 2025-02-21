import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./User";
import Menubar from "./MenuBar";
import UserMenu from "./UserMenu";

const ProductHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user,cartCount } = useUser();

  return (
    <div style={headerStyle}>
      {/* Menu Section */}
      <div style={menuStyle} onClick={() => setIsMenuOpen(true)}>
        <img src="../src/assets/Front/menu.png" alt="Menu Icon" style={menuIconStyle} />
        <span style={menuTextStyle}>MENU</span>
      </div>

      {/* Title Section (GHACA) */}
      <div style={titleStyle}>GHACA</div>

      {/* Right Section */}
      <div style={rightSectionStyle}>
        {/* Search Bar */}
        <div style={searchContainerStyle}>
          <input type="text" placeholder="ค้นหา..." style={searchInputStyle} />
          <img src="../src/assets/Front/search.png" alt="Search Icon" style={searchIconStyle} />
        </div>

        {/* ถ้าล็อคอินแล้ว ให้แสดงไอคอนตะกร้าและไอคอน User */}
        {user && (
          <>
            {/* ไอคอนตะกร้าสินค้า */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src="../src/assets/Front/cart.png"
                alt="Cart Icon"
                style={cartIconStyle}
                onClick={() => navigate("/cart")}
              />
              {cartCount > 0 && (
                <span style={cartBadgeStyle}>{cartCount}</span>
              )}
            </div>

            {/* ไอคอน User (คลิกเพื่อเปิดเมนู) */}
            <img
              src="../src/assets/Front/usericon.png"
              alt="User Icon"
              style={userIconStyle}
              onClick={() => setIsUserMenuOpen(true)}
            />
          </>
        )}

        {/* ปุ่มเข้าสู่ระบบ (แสดงเมื่อยังไม่ล็อคอิน) */}
        {!user && (
          <button onClick={() => navigate("/login")} style={loginButtonStyle}>
            เข้าสู่ระบบ
          </button>
        )}
      </div>

      {/* Menubar Component */}
      <Menubar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* User Menu Component */}
      <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
    </div>
  );
};

/* Styles */
const cartBadgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-5px",
  right: "-10px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  padding: "3px 8px",
  fontSize: "12px",
  fontWeight: "bold",
};
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  borderBottom: "2px solid #000",
  backgroundColor: "#FFFFFF",
  fontFamily: "'Arial', sans-serif",
  position: "relative",
  zIndex: 1000,
};

const menuStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const menuIconStyle: React.CSSProperties = {
  width: "24px",
  height: "15px",
};

const menuTextStyle: React.CSSProperties = {
  fontSize: "20px",
  color: "#000",
};

const titleStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "2px",
  color: "#000",
};

/* ✅ เพิ่ม rightSectionStyle */
const rightSectionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const searchContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #000",
  paddingBottom: "3px",
};

const searchInputStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontFamily: "'Arial', sans-serif",
  color: "#000",
};

const searchIconStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  marginLeft: "5px",
  cursor: "pointer",
};

/* ไอคอนตะกร้าสินค้า */
const cartIconStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  cursor: "pointer",
};

/* ไอคอน User */
const userIconStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: "2px solid #000",
  cursor: "pointer",
};

/* ✅ เพิ่ม loginButtonStyle */
const loginButtonStyle: React.CSSProperties = {
  padding: "5px 15px",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "3px",
};

export default ProductHeader;
