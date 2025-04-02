import React from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import leftImage from "../public/Front/Women.jpeg";
import rightImage from "../public/Front/men.jpeg";

const FashionSection: React.FC = () => {
  const navigate = useNavigate(); // ใช้ navigate สำหรับการนำทาง

  // ฟังก์ชันสำหรับการคลิกทั้งสองฝั่ง
  const handleLeftClick = () => {
    navigate("products"); // นำทางไปยังหน้า ProductPage โดยไม่ส่งพารามิเตอร์
  };

  const handleRightClick = () => {
    navigate("products"); // นำทางไปยังหน้า ProductPage โดยไม่ส่งพารามิเตอร์
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section */}
      <div
        onClick={handleLeftClick} // จัดการคลิก
        style={{
          flex: 1,
          backgroundImage: `url(${leftImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer", // เปลี่ยนเคอร์เซอร์เมื่อชี้
          transition: "transform 0.3s ease", // สำหรับการขยับภาพ
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} // ซูมเข้าเมื่อชี้
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // กลับสู่ขนาดเดิม
      ></div>

      {/* Middle Section for GHACA */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // จัดข้อความให้อยู่ตรงกลางของหน้าจอ
          color: "#fff",
          fontSize: "48px",
          fontWeight: "400",
          textAlign: "center",
          zIndex: 10, // ให้อยู่บนสุด
          fontFamily: "'Joan', sans-serif",
        }}
      >
        GHACA
      </div>

      {/* Right Section */}
      <div
        onClick={handleRightClick} // จัดการคลิก
        style={{
          flex: 1,
          backgroundImage: `url(${rightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer", // เปลี่ยนเคอร์เซอร์เมื่อชี้
          transition: "transform 0.3s ease", // สำหรับการขยับภาพ
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} // ซูมเข้าเมื่อชี้
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // กลับสู่ขนาดเดิม
      ></div>
    </div>
  );
};

export default FashionSection;
