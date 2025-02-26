import React from "react";
import { useUser } from "./User";
import ProductHeader from "./HeaderProductPage";
import Footer from "./Footer";

const MyCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useUser();

  // ✅ คำนวณราคารวมทั้งหมด
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={containerStyle}>
      <ProductHeader />

      {/* ✅ ทำให้ Container ของตะกร้าสามารถ Scroll ได้ */}
      <div style={cartContainerStyle}>
        <h2 style={titleStyle}>ตะกร้าสินค้า</h2>

        {/* ✅ ตารางตะกร้าสินค้า */}
        <table style={cartTableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>รูปสินค้า</th>
              <th style={thStyle}>รหัสสินค้า</th>
              <th style={thStyle}>ชื่อสินค้า</th>
              <th style={thStyle}>ราคา</th>
              <th style={thStyle}>จำนวน</th>
              <th style={thStyle}>เงินรวม</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={6} style={emptyCartStyle}>
                  ❌ ตะกร้าว่างเปล่า กรุณาเลือกสินค้า
                </td>
              </tr>
            ) : (
              cart.map((item, index) => (
                <tr key={item.productCode} style={rowStyle}>
                  {/* ✅ รูปสินค้า */}
                  <td style={tdStyle}>
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      style={productImageStyle}
                    />
                  </td>

                  {/* ✅ รหัสสินค้า */}
                  <td style={tdStyle}>{item.productCode}</td>

                  {/* ✅ ชื่อสินค้า */}
                  <td style={tdStyle}>{item.name}</td>

                  {/* ✅ ราคา */}
                  <td style={tdStyle}>{Number(item.price).toLocaleString()} บาท</td>

                  {/* ✅ จำนวนสินค้า */}
                  <td style={tdStyle}>
                    <button
                      style={quantityButtonStyle}
                      onClick={() => updateQuantity(item.productCode, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      style={quantityInputStyle}
                    />
                    <button
                      style={quantityButtonStyle}
                      onClick={() => updateQuantity(item.productCode, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>

                  {/* ✅ เงินรวม */}
                  <td style={tdStyle}>
                    {Number(item.price * item.quantity).toLocaleString()} บาท
                    <button style={removeButtonStyle} onClick={() => removeFromCart(item.productCode)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ✅ แสดงราคารวมทั้งหมด */}
        <div style={totalPriceContainerStyle}>
          <h3>ราคารวมทั้งหมด: {Number(totalAmount).toLocaleString()} บาท</h3>
        </div>

        {/* ✅ ปุ่มสั่งซื้อ */}
        <div style={checkoutContainerStyle}>
          <button style={checkoutButtonStyle}>สั่งซื้อ</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ✅ CSS Styles */
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
  overflowY: "auto", // ✅ ทำให้เลื่อน Scroll ได้
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
  padding: "5px 10px",
  fontSize: "16px",
  cursor: "pointer",
  margin: "0 5px",
};

const quantityInputStyle: React.CSSProperties = {
  width: "40px",
  textAlign: "center",
  border: "1px solid #ccc",
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

export default MyCart;
