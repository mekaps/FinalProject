import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "./User";
import ProductHeader from "./HeaderProductPage";
import Footer from "./Footer";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const { addToCart, user } = useUser();


  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("❌ Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>⏳ กำลังโหลดข้อมูลสินค้า...</p>;
  }

  // ✅ เพิ่มสินค้าในตะกร้าและเปลี่ยนเส้นทางไปยังหน้าตะกร้า
  const handleAddToCart = () => {
    if (!user) {
      alert("❌ กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าในตะกร้า!");
      navigate("/login");
      return;
    }
  
    addToCart(product);
    alert("✅ เพิ่มสินค้าในตะกร้าแล้ว!");
    navigate("/cart");
  };

  // ✅ ไปที่หน้าชำระเงิน
  const handleBuyNow = () => {
    if (!user) {
      alert("❌ กรุณาเข้าสู่ระบบก่อนทำการซื้อสินค้า!");
      navigate("/login");
      return;
    }
  
    if (product.stock <= 0) {
      alert("❌ สินค้าหมดสต็อก!");
      return;
    }
  
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div style={pageContainerStyle}>
      <ProductHeader />

      <div style={containerStyle}>
        {/* ✅ หัวข้อรายละเอียดสินค้า */}
        <h1 style={titleStyle}>รายละเอียดสินค้า</h1>

        <div style={contentStyle}>
          {/* ✅ ภาพสินค้า */}
          <div style={imageContainerStyle}>
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              style={imageStyle}
              onError={(e) => (e.currentTarget.src = "../src/assets/Front/women.jpeg")}
            />
          </div>

          {/* ✅ ข้อมูลสินค้า */}
          <div style={infoStyle}>
            <h2 style={productNameStyle}>{product.name}</h2>
            <p style={descStyle}>{product.description}</p>

            {/* ✅ ราคา */}
            <div style={priceContainerStyle}>
              <span style={priceStyle}>{Number(product.price).toLocaleString()} บาท</span>
              <span style={stockStyle}>{product.stock > 0 ? "✔ มีสินค้า" : "❌ หมดสต็อก"}</span>
            </div>

            {/* ✅ ปุ่มเพิ่มลงตะกร้า */}
            <button style={cartButtonStyle} onClick={handleAddToCart}>
              🛒 เพิ่มใส่ตะกร้า
            </button>

            {/* ✅ ปุ่มซื้อเลย */}
            <button style={buyNowButtonStyle} onClick={handleBuyNow}>
              🛍 ซื้อเลย
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ✅ สไตล์ที่ปรับใหม่ */
const pageContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFFFFF",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "30px",
  flexGrow: 1,
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "30px",
  color: "#222",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "50px",
};

const imageContainerStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  backgroundColor: "#f9f9f9",
  width: "320px",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "5px",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
};

const productNameStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "15px",
  color: "#000",
};

const descStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#333",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const priceContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const priceStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#000",
};

const stockStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#27ae60",
};

const cartButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  width: "100%",
  textAlign: "center",
  marginBottom: "10px",
};

const buyNowButtonStyle: React.CSSProperties = {
  backgroundColor: "#f04e30",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  width: "100%",
  textAlign: "center",
};

export default ProductDetailPage;
