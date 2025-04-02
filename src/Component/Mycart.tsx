import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./User"; // สมมติว่า `useUser` คืนค่า `userEmail`
import ProductHeader from "./HeaderProductPage";
import axios from "axios";

const MyCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, userEmail } = useUser(); // ดึง email ของผู้ใช้
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<any[]>([]);  // เก็บที่อยู่
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);  // เก็บที่อยู่ที่เลือก
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");  // กรอก email เพื่อยืนยัน
  const [isEmailValid] = useState<boolean>(true);  // เช็คความถูกต้องของ email

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

        const response = await axios.get("https://backend-production-4db9.up.railway.app/auth/addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddress(response.data[0]._id);  // เลือกที่อยู่แรกเป็นค่าเริ่มต้น
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่:", err);
        setError("ไม่สามารถดึงข้อมูลที่อยู่ได้");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [userEmail]);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const goToProductsPage = () => {
    navigate("/products");
  };

  const goToCheckoutPage = async () => {
    if (cart.length === 0) {
      alert("กรุณาเลือกสินค้าก่อนดำเนินการต่อ");
      return;
    }
  
    if (!selectedAddress) {
      alert("กรุณาเลือกที่อยู่จัดส่งก่อนดำเนินการต่อ");
      return;
    }
  
    // ตรวจสอบว่า email ที่กรอกตรงกับ email ที่เก็บในระบบ
    if (!emailInput) {
      alert("กรุณากรอกอีเมล");
      return;
    }
  
    const shippingAddress = addresses.find((addr) => addr._id === selectedAddress);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาล็อกอินก่อนดำเนินการต่อ");
        return;
      }
  
      // ส่งข้อมูล email และ cart ไปยัง Backend
      const clearResponse = await axios.post(
        "https://backend-production-4db9.up.railway.app/auth/cart-clear",
        { 
          email: emailInput,  // ส่ง email ที่กรอกมาจากฟอร์ม
          cart: cart.map((item) => ({
            productId: item._id,  // ส่ง _id ที่ถูกต้องจาก cart
            quantity: item.quantity,
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (clearResponse.status === 200) {
        alert("สินค้าถูกลบออกจากตะกร้าเรียบร้อยแล้ว");
        await sendOrderConfirmationEmail(emailInput, cart, totalAmount, shippingAddress);
      } else {
        alert("เกิดข้อผิดพลาดในการลบสินค้าจากตะกร้า");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("ไม่สามารถลบสินค้าจากตะกร้าได้");
    }
  
    // ไปยังหน้าชำระเงิน
    navigate("/checkoutpage", { state: { totalAmount, shippingAddress } });
  };

  const sendOrderConfirmationEmail = async (
    email: string,
    cartItems: any[],
    total: number,
    shippingAddress: any
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("กรุณาล็อกอินก่อนดำเนินการต่อ");
        return;
      }

      await axios.post(
        "https://backend-production-4db9.up.railway.app/auth/send-order-email",
        {
          email,
          cartItems,
          total,
          shippingAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  return (
    <div style={containerStyle}>
      <ProductHeader />
      <div style={cartContainerStyle}>
        <h2 style={titleStyle}>ตะกร้าสินค้า</h2>

        {/* ช่องกรอก email สำหรับยืนยัน */}
        <div style={emailContainerStyle}>
          <input
            type="email"
            placeholder="กรุณากรอกอีเมลของคุณ"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            style={emailInputStyle}
          />
          {!isEmailValid && (
            <p style={errorMessageStyle}>อีเมลไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง</p>
          )}
        </div>

        {/* ตารางแสดงสินค้าภายในตะกร้า */}
        <table style={cartTableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>รูปสินค้า</th>
              <th style={thStyle}>รหัสสินค้า</th>
              <th style={thStyle}>ชื่อสินค้า</th>
              <th style={thStyle}>ราคา</th>
              <th style={thStyle}>ไซส์</th>
              <th style={thStyle}>จำนวน</th> 
              <th style={thStyle}>เงินรวม</th>
              <th style={thStyle}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={7} style={emptyCartStyle}>
                  ❌ ตะกร้าว่างเปล่า กรุณาเลือกสินค้า
                </td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item._id} style={rowStyle}>
                  <td style={tdStyle}>
                    <img
                      src={`https://backend-production-4db9.up.railway.app${item.image}`}
                      alt={item.name}
                      style={productImageStyle}
                    />
                  </td>
                  <td style={tdStyle}>{item._id}</td>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{Number(item.price).toLocaleString()} บาท</td>
                  <td style={tdStyle}>{item.size}</td>
                  <td style={tdStyle}>
                    <div style={quantityContainerStyle}>
                      <button
                        style={quantityButtonStyle}
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        - {/* ปุ่ม "ลบ" */}
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        style={quantityInputStyle}
                      />
                      <button
                        style={quantityButtonStyle}
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        + {/* ปุ่ม "+" */}
                      </button>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {Number(item.price * item.quantity).toLocaleString()} บาท
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={removeButtonStyle}
                      onClick={() => removeFromCart(item._id)}
                    >
                      ❌ ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* แสดงราคารวมทั้งหมด */}
        <div style={totalPriceContainerStyle}>
          <h3>ราคารวมทั้งหมด: {Number(totalAmount).toLocaleString()} บาท</h3>
        </div>

        {/* ส่วนเลือกที่อยู่จัดส่ง */}
        <div style={addressContainerStyle}>
          <h3 style={addressTitleStyle}>เลือกที่อยู่จัดส่ง</h3>
          {isLoading ? (
            <p>กำลังโหลดข้อมูลที่อยู่...</p>
          ) : error ? (
            <p style={errorStyle}>{error}</p>
          ) : addresses.length === 0 ? (
            <p style={emptyAddressStyle}>ไม่พบที่อยู่ กรุณาเพิ่มที่อยู่ใหม่</p>
          ) : (
            <div style={addressListStyle}>
              {addresses.map((address) => (
                <div
                  key={address._id}
                  style={{
                    ...addressCardStyle,
                    ...(selectedAddress === address._id
                      ? selectedAddressStyle
                      : {}),
                  }}
                  onClick={() => setSelectedAddress(address._id)}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress === address._id}
                    onChange={() => setSelectedAddress(address._id)}
                  />
                  <div style={addressInfoStyle}>
                    <p><strong>ชื่อ:</strong> {address.name}</p>
                    <p><strong>เบอร์โทร:</strong> {address.phone}</p>
                    <p><strong>ที่อยู่:</strong> {address.address}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ปุ่มสั่งซื้อและกลับไปหน้าสินค้า */}
        <div style={checkoutContainerStyle}>
          <button style={checkoutButtonStyle} onClick={goToCheckoutPage}>
            สั่งซื้อ
          </button>
          <button style={backButtonStyle} onClick={goToProductsPage}>
            กลับไปหน้าสินค้า
          </button>
        </div>
      </div>
    </div>
  );
};


// CSS Styles
const emailContainerStyle: React.CSSProperties = {
  marginBottom: "20px",
  textAlign: "center",
};

const emailInputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  maxWidth: "300px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const errorMessageStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFFFFF",
};

const cartContainerStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  flex: 1,
  overflowY: "auto",  // เพิ่มให้สามารถเลื่อน Scroll ได้
  maxHeight: "calc(100vh - 100px)",  // ให้ความสูงของ container ไม่เกินหน้าจอ
};

const titleStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
  color: "#000",
};

const cartTableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ddd",
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "left",
  borderBottom: "2px solid #000",
  backgroundColor: "#f9f9f9",
  color: "#000",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  color: "#000",
};

const emptyCartStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "18px",
  color: "red",
  padding: "20px",
};

const rowStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f5",
};

const productImageStyle: React.CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "5px",
};

const quantityButtonStyle: React.CSSProperties = {
  backgroundColor: "#ddd",
  border: "none",
  padding: "10px",
  fontSize: "16px",
  cursor: "pointer",
  height: "10px",
  width: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quantityInputStyle: React.CSSProperties = {
  backgroundColor: "#FFFF",
  border: "1px solid #ddd",
  width: "30px",
  textAlign: "center",
  fontSize: "16px",
  padding: "5px",
  color: "#000",
};

const removeButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "none",
  color: "red",
  fontSize: "16px",
  cursor: "pointer",
  marginLeft: "10px",
};

const quantityContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "5px",
};

const totalPriceContainerStyle: React.CSSProperties = {
  textAlign: "right",
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "20px",
  color: "#000",
};

const checkoutContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "right",
  marginTop: "20px",
  gap: "10px",
};

const checkoutButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const backButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const addressContainerStyle: React.CSSProperties = {
  marginTop: "30px",
  borderTop: "1px solid #ddd",
  paddingTop: "20px",
};

const addressTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#000",
};

const addressListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  color: "#000",
};

const addressCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const selectedAddressStyle: React.CSSProperties = {
  borderColor: "#312CCC",
  backgroundColor: "#f0f0ff",
};

const addressInfoStyle: React.CSSProperties = {
  marginLeft: "10px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontWeight: "bold",
};

const emptyAddressStyle: React.CSSProperties = {
  color: "orange",
  fontWeight: "bold",
  marginBottom: "15px",
};

export default MyCart;
