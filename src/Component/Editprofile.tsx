import React, { useState, useEffect } from "react";
import ProductHeader from "./HeaderProductPage"; // นำเข้า Header
import AddAddressModal from "./Addaddress"; // นำเข้า Modal สำหรับเพิ่มที่อยู่
import axios from "axios"; // นำเข้า axios สำหรับการดึงข้อมูล

const EditProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState<any[]>([]); // สถานะเก็บที่อยู่
  const [selectedEmail, setSelectedEmail] = useState("");  // สำหรับเลือก email ที่ผู้ใช้กรอก
  const [newEmail, setNewEmail] = useState(""); // สำหรับเตรียมการเปลี่ยน email
  const [emailError, setEmailError] = useState(""); // สำหรับแสดงข้อความถ้า email ซ้ำ
  const [isLoading, setIsLoading] = useState(false); // สถานะการโหลดข้อมูล
  const [error, setError] = useState(""); // สำหรับเก็บข้อผิดพลาด

  const [showScrollToTopButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ฟังก์ชันเช็คว่า email เดิมมีในระบบหรือไม่
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch("http://localhost:5000/auth/check-email", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok && !data.exists) {
        setEmailError("อีเมลนี้ไม่มีในระบบ กรุณาตรวจสอบอีเมล");
        return false;
      } else {
        setEmailError(""); 
        return true;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("เกิดข้อผิดพลาดในการตรวจสอบอีเมล");
      return false;
    }
  };

  // ฟังก์ชันดึงข้อมูลที่อยู่
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("กรุณาล็อกอินก่อนดำเนินการต่อ");
          setIsLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/auth/addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddresses(response.data);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่:", err);
        setError("ไม่สามารถดึงข้อมูลที่อยู่ได้");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []); // ใช้ [] เพื่อดึงข้อมูลเมื่อ component โหลดครั้งแรก

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value); // เตรียมค่า email ใหม่
  };

  const handleSave = async () => {
    // ตรวจสอบ email เดิม
    const isEmailValid = await checkEmailExists(selectedEmail);
    if (!isEmailValid) {
      return; // ถ้า email ไม่ตรงในฐานข้อมูล ให้ไม่ทำการบันทึก
    }

    try {
      // ส่งข้อมูลไปที่ Backend
      const response = await fetch("http://localhost:5000/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedEmail,  // ส่ง email เดิมเพื่ออัปเดตข้อมูล
          newEmail: newEmail,    // ส่ง email ใหม่
          phone: userData.phone,
          name: userData.name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("ข้อมูลโปรไฟล์ของคุณถูกบันทึกแล้ว");
      } else {
        console.error(data.message);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={containerStyle}>
      <ProductHeader />
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>ประวัติส่วนตัว</h2>

        <div style={formStyle}>
          <label>ชื่อ-นามสกุล</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            style={inputStyle}
          />

          <label>อีเมล (อีเมลเดิม)</label>
          <input
            type="email"
            name="email"
            value={selectedEmail} // แสดง email เดิมที่ผู้ใช้กรอก
            onChange={(e) => setSelectedEmail(e.target.value)} // ให้กรอก email เดิม
            placeholder="กรุณากรอกอีเมลเดิม"
            style={inputStyle}
          />

          <label>อีเมลใหม่</label>
          <input
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={handleEmailChange}
            placeholder="กรุณากรอกอีเมลใหม่"
            style={inputStyle}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}

          <label>หมายเลขโทรศัพท์:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            style={inputStyle}
          />

          <button onClick={handleSave} style={saveButtonStyle}>
            บันทึกข้อมูล
          </button>
        </div>

        <h3 style={addressTitleStyle}>ที่อยู่ในการจัดส่ง</h3>
        {isLoading ? (
          <p>กำลังโหลดที่อยู่...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} style={addressCardStyle}>
              <div>
                <strong>ชื่อ:</strong> {address.name}
              </div>
              <div>
                <strong>หมายเลขโทรศัพท์:</strong> {address.phone}
              </div>
              <div>
                <strong>ที่อยู่:</strong> {address.address}
              </div>
              <button onClick={() => {}} style={deleteButtonStyle}>
                ลบ
              </button>
            </div>
          ))
        ) : (
          <p>ไม่มีที่อยู่ในการจัดส่ง</p>
        )}

        <button onClick={() => setIsModalOpen(true)} style={addAddressButtonStyle}>
          เพิ่มที่อยู่ในการจัดส่ง +
        </button>
      </div>

      {showScrollToTopButton && (
        <button onClick={scrollToTop} style={scrollToTopButtonStyle}>
          ⬆️ เลื่อนขึ้น
        </button>
      )}

      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {}}
        email={userData.email} // ส่ง email ของผู้ใช้ที่ล็อกอินไปยัง modal
      />
    </div>
  );
};


// Styles
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFFFFF",
  overflowY: "scroll",
  paddingRight: "10px",
};

const formContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  maxHeight: "calc(100vh - 150px)",
  color: "#000",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#000",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  fontSize: "16px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  color: "#000",
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "black",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "4px",
};

const addressTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "30px",
  marginBottom: "10px",
  color: "#000",
};

const addressCardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "10px",
  color: "#000",
};

const addAddressButtonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "black",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "4px",
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "8px 15px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "4px",
  marginTop: "10px",
};

const scrollToTopButtonStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#4CAF50",
  color: "black",
  padding: "10px 15px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 1000,
};

export default EditProfile;
