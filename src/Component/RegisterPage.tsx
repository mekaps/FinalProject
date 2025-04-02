import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("❌ รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://backend-production-4db9.up.railway.app/auth/register", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage("✅ สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ เกิดข้อผิดพลาด กรุณาลองใหม่");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* 🔹 ด้านซ้าย (GHACA) */}
      <div style={leftPanelStyle}>
        <h1 style={brandStyle}>GHACA</h1>
      </div>

      {/* 🔹 ด้านขวา (ฟอร์ม Register) */}
      <div style={rightPanelStyle}>
        <div style={registerBoxStyle}>
          {/* ✅ ไอคอน User อยู่ตรงกลางแนวตั้ง */}
          <div style={userIconContainerStyle}>
            <img src="../public/assets/Front/usericon.png" alt="User" style={userIconStyle} />
          </div>

          {message && <p style={messageStyle}>{message}</p>}

          <form onSubmit={handleRegister}>
            {/* ✅ ๊Username */}
            <div style={inputContainerStyle}>
              <input 
                type="name" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                style={inputStyle} 
                required
              />
            </div>

            {/* ✅ Email */}
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

            {/* ✅ Password */}
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

            {/* ✅ Confirm Password */}
            <div style={inputContainerStyle}>
              <input 
                type="password" 
                placeholder="Password Confirm" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle} 
                required
              />
            </div>

            {/* ✅ Phone Number */}
            <div style={inputContainerStyle}>
              <input 
                type="text" 
                placeholder="Number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle} 
                required
              />
            </div>

            {/* ✅ Register Button */}
            <button type="submit" style={registerButtonStyle} disabled={loading}>
              {loading ? "⏳ Registering..." : "Register"}
            </button>
          </form>

          {/* ✅ ลิงก์เข้าสู่ระบบ */}
          <p style={bottomTextStyle}>
            Have already an account?{" "}
            <span style={linkStyle} onClick={() => navigate("/login")}>
              Login Here
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

const registerBoxStyle: React.CSSProperties = {
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

const registerButtonStyle: React.CSSProperties = {
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

const messageStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "10px",
};

const bottomTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#666",
  marginTop: "15px",
  fontSize: "14px",
};

const linkStyle: React.CSSProperties = {
  fontWeight: "bold",
  cursor: "pointer",
  color: "#000",
};

export default RegisterPage;
