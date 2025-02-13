import React from "react";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#000", // พื้นหลังสีดำ
        color: "#fff", // สีตัวอักษรสีขาว
        padding: "10px ", // ระยะห่างด้านใน
        display: "flex",
        flexDirection: "column", // จัดเลย์เอาต์ในแนวตั้ง
        alignItems: "center",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "2px",
          marginBottom: "20px", // เว้นระยะห่างด้านล่าง
        }}
      >
        GHACA
      </div>

      {/* Links Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%", // ให้ครอบคลุมเต็มความกว้าง
          maxWidth: "1200px", // กำหนดความกว้างสูงสุด
          marginBottom: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>GHACA</div>
          <p>- สินค้า</p>
          <p>- ข่าวสาร</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>ติดต่อสอบถาม</div>
          <p>ติดต่อเรา</p>
          <p>+66 98-000-0000</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>บริการลูกค้า</div>
          <p>- วิธีการชำระเงิน</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>ช่องทางการชำระเงิน</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <img
              src="../src/assets/Front/Prompay.png" // แก้ไขเส้นทางรูปภาพ
              style={{ width: "110px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
