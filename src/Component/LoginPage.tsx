import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./User"; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  
  // ✅ ฟังก์ชัน Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token); // 🔹 บันทึก Token
      login(email); // บันทึกชื่อผู้ใช้
      navigate("/products"); // 🔹 Redirect ไปหน้า Product
    } else {
      setError(data.message || "❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div style={containerStyle}>
      {/* 🔹 ด้านซ้าย - โลโก้ */}
      <div style={leftPanelStyle}>
        <h1 style={{ color: "#fff", fontSize: "36px" }}>GHACA</h1>
      </div>

      {/* 🔹 ด้านขวา - ฟอร์ม Login */}
      <div style={rightPanelStyle}>
        <div style={loginBoxStyle}>
          <h2 style={{ marginBottom: "20px" }}>เข้าสู่ระบบ</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleLogin}>
            <div style={inputContainerStyle}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle} 
                required
              />
            </div>

            <div style={inputContainerStyle}>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle} 
                required
              />
            </div>

            <p style={{ textAlign: "right", cursor: "pointer", color: "#666" }}>ลืมรหัสผ่าน?</p>

            <button type="submit" style={signInButtonStyle}>เข้าสู่ระบบ</button>
          </form>

          <p style={{ marginTop: "10px" }}>
            ยังไม่มีบัญชี? <span style={{ color: "#000", cursor: "pointer", fontWeight: "bold" }}>สร้างบัญชี</span>
          </p>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Styles */
const containerStyle: React.CSSProperties = {
  display: "flex",
  height: "100vh",
};

const leftPanelStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const rightPanelStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const loginBoxStyle: React.CSSProperties = {
  textAlign: "center",
  width: "300px",
};

const inputContainerStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const inputStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "14px",
};

const signInButtonStyle: React.CSSProperties = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
};

export default LoginPage;
