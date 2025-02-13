import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      setMessage("❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
      <div style={formStyle}>
        <h2 style={{ fontSize: "20px", color: "black", marginTop: "10px", fontWeight: "bold" }}>สมัครสมาชิก</h2>

        {message && <p style={messageStyle}>{message}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="ชื่อของคุณ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="รหัสผ่าน (6 ตัวขึ้นไป)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "⏳ กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p style={bottomTextStyle}>
          มีบัญชีแล้ว?{" "}
          <span style={linkStyle} onClick={() => navigate("/login")}>
            เข้าสู่ระบบ
          </span>
        </p>

        <button style={backButtonStyle} onClick={() => navigate("/")}>🔙 กลับหน้าหลัก</button>
      </div>
    </div>
  );
};

// ✅ **สไตล์ปรับปรุงใหม่**
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
};

const formStyle: React.CSSProperties = {
  width: "350px",
  padding: "25px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
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
  color: "red",
  marginBottom: "10px",
};

const bottomTextStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "10px",
};

const linkStyle: React.CSSProperties = {
  color: "#007bff",
  cursor: "pointer",
  fontWeight: "bold",
};

const backButtonStyle: React.CSSProperties = {
  marginTop: "15px",
  padding: "8px",
  width: "100%",
  backgroundColor: "#ccc",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default RegisterPage;
