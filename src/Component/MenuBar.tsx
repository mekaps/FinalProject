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
           {/* เพิ่มลิงก์ในแต่ละรายการ */}
           <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <a
              href="/men"
              style={{ textDecoration: "none", color: "#000" }} // ลิงก์คำว่าผู้ชาย
            >
              ผู้ชาย
            </a>
          </li>

          <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <a
              href="/women"
              style={{ textDecoration: "none", color: "#000" }} // ลิงก์คำว่าผู้หญิง
            >
              ผู้หญิง
            </a>
          </li>

           <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <a
              href="/kids"
              style={{ textDecoration: "none", color: "#000" }} // ลิงก์คำว่าสำหรับเด็ก
            >
              สำหรับเด็ก
            </a>
          </li>

           <li style={{ margin: "20px 0", fontSize: "18px" }}>
            <a
              href="/about-ghaca"
              style={{ textDecoration: "none", color: "#000" }} // ลิงก์คำว่าเกี่ยวกับ GHACA
            >
              เกี่ยวกับ GHACA
            </a>
          </li>
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
            {/* โลโก้ IG */}
          <a
            href="https://www.instagram.com/ghaca.officials/" // URL Instagram
            target="_blank" // เปิดในแท็บใหม่
            rel="noopener noreferrer"
            >
            <img
                src={instagramIcon}
                alt="Instagram"
                style={{
                width: "50px",
                height: "40px",
                }}
            />
            </a>

          {/* โลโก้ Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100007160436739&locale=th_TH" // ลิงก์ไปยัง Facebook Page
            target="_blank" // เปิดในแท็บใหม่
            rel="noopener noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{
                width: "46px", // ขนาดโลโก้
                height: "45px",
                marginTop: "-3px", // ขยับสูงขึ้น
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
