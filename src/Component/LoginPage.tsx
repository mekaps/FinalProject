import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./User"; 
import userIcon from "../assets/Front/usericon.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("https://backend-production-4db9.up.railway.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      login(email);
      navigate("/products");
    } else {
      setError(data.message || "❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div style={containerStyle}>
      {/* 🔹 ด้านซ้าย (GHACA) */}
      <div style={leftPanelStyle}>
        <h1 style={brandStyle}>GHACA</h1>
      </div>

      {/* 🔹 ด้านขวา (ฟอร์ม Login) */}
      <div style={rightPanelStyle}>
        <div style={loginBoxStyle}>
          
          {/* ✅ ไอคอน User อยู่ตรงกลางแนวตั้ง */}
          <div style={userIconContainerStyle}>
            <img src={userIcon} alt="User" style={userIconStyle} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleLogin}>
            {/* ✅ กล่อง Email */}
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

            {/* ✅ กล่อง Password */}
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

            <p style={{ textAlign: "right", cursor: "pointer", color: "#666" }}>Forgot your password?</p>

            {/* ✅ ปุ่มเข้าสู่ระบบ */}
            <button type="submit" style={signInButtonStyle}>SIGN IN</button>
          </form>

          {/* ✅ ลิงก์สมัครสมาชิกตรงกลาง */}
          <p style={registerTextStyle}>
            Create an account?{" "}
            <span style={{ fontWeight: "bold", cursor: "pointer", color: "#000" }} onClick={() => navigate("/register")}>
              Click Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ✅ Styles */
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

const brandStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "40px",
  fontWeight: "bold",
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
  width: "350px",
};

/* ✅ ปรับให้ไอคอน User อยู่ตรงกลางแนวตั้ง */
const userIconContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const userIconStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
};

const inputContainerStyle: React.CSSProperties = {
  backgroundColor: "#D9D9D9",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const inputStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "14px",
  backgroundColor: "transparent",
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

const registerTextStyle: React.CSSProperties = {
  marginTop: "15px",
  textAlign: "center",
  fontSize: "14px",
  color: "#000",
};

export default LoginPage;
