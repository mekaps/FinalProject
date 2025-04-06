import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./User"; 
import closeIcon from "../assets/Front/close-icon.png"; // ไอคอนปิด
import userIcon from "../assets/Front/usericon.png"; // ไอคอน User
import editIcon from "../assets/Front/editbutton.png"; // ไอคอน Edit

type UserMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      {/* เมนูด้านขวา */}
      <div style={menuStyle}>
        {/* ปุ่มปิดเมนู */}
        <button style={closeButtonStyle} onClick={onClose}>
          <img src={closeIcon} alt="Close" style={{ width: "24px", height: "24px" }} />
        </button>

        {/* ส่วนของไอคอนผู้ใช้และปุ่มแก้ไข */}
        <div style={userSectionStyle}>
          <img src={userIcon} alt="User Icon" style={userIconStyle} />
          <div style={accountSectionStyle}>
            <p style={accountTextStyle}>{user ? `บัญชีของฉัน: ${user}` : "ผู้ใช้ไม่ได้ล็อกอิน"}</p>
            {/* ลิงค์ไปยังหน้า Editprofile */}
            <Link to="/Editprofile" style={editButtonStyle} onClick={onClose}>
              <img src={editIcon} alt="Edit" style={{ width: "30px", height: "25px" }} />
            </Link>
          </div>
        </div>

        {/* รายการเมนู */}
        <ul style={menuListStyle}>
          <li>
            <Link to="/Purchase" style={menuItemStyle} onClick={onClose}>ประวัติการสั่งซื้อ</Link>
          </li>
          <li>
            <Link to="https://th.kex-express.com/th/track/" style={menuItemStyle} onClick={onClose}>สถานะการจัดส่ง</Link>
          </li>
          <li>
            <Link to="/cart" style={cartItemStyle} onClick={onClose}>ตะกร้าของฉัน</Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/ghaca.officials/" style={menuItemStyle} onClick={onClose}>ช่วยเหลือ</Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/ghaca.officials/" style={menuItemStyle} onClick={onClose}>ข่าวสาร</Link>
          </li>
        </ul>

        {/* ขยายพื้นที่ว่างให้ "ออกจากระบบ" ไปอยู่ด้านล่างสุด */}
        <div style={{ flexGrow: 1 }}></div>

        {/* ลิงก์ออกจากระบบ */}
        <Link to="/login" style={logoutTextStyle} onClick={onClose}>ออกจากระบบ</Link>
      </div>
    </div>
  );
};

/* Styles */
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)", // พื้นหลังเบลอ
  backdropFilter: "blur(5px)",
  zIndex: 1500,
  display: "flex",
  justifyContent: "flex-end",
};

const menuStyle: React.CSSProperties = {
  width: "300px",
  height: "100%",
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  zIndex: 1501,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const userSectionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const userIconStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
};

const accountSectionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "calc(100% - 80px)", // ความกว้างที่เหลือจากไอคอน
};

const accountTextStyle: React.CSSProperties = {
  color: "black",
  fontSize: "12px",
  fontWeight: "bold",
};

const editButtonStyle: React.CSSProperties = {
  marginLeft: "10px",
  marginTop: "20px" ,
  cursor: "pointer" ,
};

const menuListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontSize: "16px",
  lineHeight: "2.5",
};

const menuItemStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#000",
  display: "block",
};

const cartItemStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#000", // สีดำ
  display: "block",
};

/* สไตล์สำหรับ "ออกจากระบบ" */
const logoutTextStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#000", // สีดำ
  fontSize: "16px",
  textAlign: "center",
  marginBottom: "20px",
  cursor: "pointer",
};

export default UserMenu;
