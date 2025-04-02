import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string, phone: string, name: string, email: string) => void;
  email: string; // รับ email จาก props
}

const AddAddressModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, email }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [inputEmail, setInputEmail] = useState(email); // ตั้งค่าของ email จาก props ให้กรอกได้
  const [error, setError] = useState("");  // ใช้เพื่อแสดงข้อความ error

  // ใช้ useEffect เพื่อให้ email ที่ส่งมาจาก props ถูกตั้งค่าใน state
  useEffect(() => {
    setInputEmail(email); // ตั้งค่า inputEmail จาก props.email
  }, [email]); // เมื่อ props.email เปลี่ยนแปลง ให้ update inputEmail

  const handleSubmit = async () => {
    if (!name || !phone || !address || !inputEmail) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch("https://backend-production-4db9.up.railway.app/auth/add-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail, // ส่ง email ที่กรอก
          name,
          phone,
          address,
        }),
      });

      if (response.ok) {
        alert("เพิ่มที่อยู่สำเร็จ");
        onSave(address, phone, name, inputEmail); // ส่งข้อมูลไปยัง parent component
        onClose(); // ปิด modal
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <h2>เพิ่มที่อยู่</h2>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={inputGroupStyle}>
          <label>อีเมล:</label>
          <input
            type="email"
            value={inputEmail} // ให้ email ที่กรอกแสดงที่ input
            onChange={(e) => setInputEmail(e.target.value)} // เปลี่ยนค่า inputEmail เมื่อผู้ใช้กรอก
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>ชื่อ:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>หมายเลขโทรศัพท์:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>ที่อยู่:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={buttonGroupStyle}>
          <button onClick={handleSubmit} style={submitButtonStyle}>
            ยืนยัน
          </button>
          <button onClick={onClose} style={cancelButtonStyle}>
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  color: "#000",
  maxHeight: "80vh", // กำหนดขนาดสูงสุดของ modal
  overflowY: "auto", // เปิดการเลื่อน
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: "15px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  height: "100px",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#f44336",
  color: "#ffffff",
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
  marginBottom: "15px",
};

export default AddAddressModal;
