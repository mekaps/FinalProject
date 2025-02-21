import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser} from "./User";
import ProductHeader from "./HeaderProductPage";
import Footer from "./Footer";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useUser();

  // ✅ ดึงข้อมูลสินค้าจาก Backend
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("❌ Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>⏳ กำลังโหลดข้อมูลสินค้า...</p>;
  }

  const handleAddToCart = () => {
    addToCart();
    alert("✅ เพิ่มสินค้าในตะกร้าแล้ว!");
  };

  return (
    <div style={pageContainerStyle}>
      <ProductHeader />

      <div style={containerStyle}>
        <h1 style={{ marginLeft: "5px", color: "black" }}>รายละเอียดสินค้า</h1>
        <h1 style={titleStyle}>{product.name}</h1>

        <div style={contentStyle}>
          {/* ✅ แสดงรูปสินค้า */}
          <div style={imageContainerStyle}>
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              style={imageStyle}
              onError={(e) => e.currentTarget.src = "../src/assets/Front/women.jpeg"}
            />
          </div>

          {/* ✅ รายละเอียดสินค้า */}
          <div style={infoStyle}>
            <h2 style={priceStyle}>💰 {Number(product.price).toLocaleString()} บาท</h2>
            <p style={descStyle}>{product.description}</p>

            {/* ✅ ปุ่มสั่งซื้อ */}
            <button style={cartButtonStyle} onClick={handleAddToCart}>🛒 เพิ่มลงตะกร้า</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ✅ สไตล์ */
const pageContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflowY: "auto", // ✅ เพิ่ม Scroll ให้หน้า
  backgroundColor: "#FFFFFF",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "20px",
  flexGrow: 1, // ✅ ทำให้ Container เต็มหน้าจอ
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "50px",
  fontWeight: "bold",
  marginBottom: "30px",
  color: "#222",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "500px",
  flexWrap: "wrap", // ✅ ปรับให้อยู่ใน Layout ที่ Scroll ได้
};

const imageContainerStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  backgroundColor: "#f9f9f9",
};

const imageStyle: React.CSSProperties = {
  width: "200px",
  height: "auto",
  borderRadius: "5px",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "left",
};

const priceStyle: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#312CCC",
  marginBottom: "15px",
};

const descStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#333",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const buyButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontWeight: "bold",
  padding: "10px 20px",
};
const cartButtonStyle: React.CSSProperties = {
  backgroundColor: "#f04e30",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ProductDetailPage;
