import React from "react";
import closeIcon from "../assets/close-icon.png"; // ไอคอนปิด
import instagramIcon from "../assets/IG icon.png"; // โลโก้ Instagram    
import facebookIcon from "../assets/FB-icon.png"; // โลโก้ Facebook

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
        justifyContent: "space-between", // กระจายตำแหน่งด้านบนและล่าง
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
          src={closeIcon} // ใช้รูปภาพปุ่มปิด
          alt="Close"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </div>

      {/* รายการในเมนู */}
      <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: "#000", // ฟอนต์สีดำ
          }}
        >
          <li style={{ margin: "20px 0", fontSize: "18px" }}>ผู้ชาย</li>
          <li style={{ margin: "20px 0", fontSize: "18px" }}>ผู้หญิง</li>
          <li style={{ margin: "20px 0", fontSize: "18px" }}>สำหรับเด็ก</li>
          <li style={{ margin: "20px 0", fontSize: "18px" }}>เกี่ยวกับ GHACA</li>
        </ul>
      </div>

      {/* ส่วน "ติดต่อเรา" และไอคอน */}
      <div
        style={{
          padding: "20px",
          textAlign: "center", // จัดกึ่งกลางข้อความ
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#000",
            marginBottom: "20px", // เว้นระยะด้านล่าง
          }}
        >
          ติดต่อเรา
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // จัดไอคอนให้อยู่กึ่งกลาง
            gap: "20px", // ระยะห่างระหว่างไอคอน
          }}
        >
          <img
            src={instagramIcon} // โลโก้ Instagram
            alt="Instagram"
            style={{
              width: "50px", // ขนาดโลโก้
              height: "40px",
            }}
          />
          <img
            src={facebookIcon} // โลโก้ Facebook
            alt="Facebook"
            style={{
              width: "46px", // ขนาดโลโก้
              height: "47px",
              marginTop: "-2px", // ขยับสูงขึ้น
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
