import React from "react";
import leftImage from "../assets/Women.jpeg";
import rightImage from "../assets/men.jpeg";

const FashionSection: React.FC = () => {
  const handleLeftClick = () => {
    alert("คุณคลิกที่ภาพฝั่งซ้าย (แฟชั่นสำหรับผู้หญิง)");
    // หรือเพิ่มฟังก์ชันการทำงานอื่น เช่นการนำทาง
  };

  const handleRightClick = () => {
    alert("คุณคลิกที่ภาพฝั่งขวา (แฟชั่นสำหรับผู้ชาย)");
    // หรือเพิ่มฟังก์ชันการทำงานอื่น เช่นการนำทาง
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
      >
        <span
          style={{
            position: "absolute",
            bottom: "50px", // ขยับขึ้นมา
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          แฟชั่นสำหรับผู้หญิง
        </span>
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
      >
        <span
          style={{
            position: "absolute",
            bottom: "50px", // ขยับขึ้นมา
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          แฟชั่นสำหรับผู้ชาย
        </span>
      </div>
    </div>
  );
};

export default FashionSection;
